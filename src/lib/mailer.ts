import tls from "node:tls";
import net from "node:net";
import { query } from "./db";

export interface SmtpConfig {
  host: string;
  port: number;
  secure?: boolean;
  user: string;
  pass: string;
  from_email: string;
  from_name: string;
}

export async function getSmtpConfig(): Promise<SmtpConfig> {
  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'smtp_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val = res.rows[0].value;
      return {
        host: val.host || process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(val.port || process.env.SMTP_PORT || "465", 10),
        secure: val.secure !== undefined ? Boolean(val.secure) : true,
        user: val.user || process.env.SMTP_USER || "",
        pass: val.pass || process.env.SMTP_PASS || "",
        from_email: val.from_email || process.env.SMTP_FROM || "contact@creed-tech.com",
        from_name: val.from_name || "Creed Tech Enterprise",
      };
    }
  } catch {
    // Fallback to env vars
  }

  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from_email: process.env.SMTP_FROM || "contact@creed-tech.com",
    from_name: "Creed Tech Enterprise",
  };
}

export async function saveSmtpConfig(config: Partial<SmtpConfig>): Promise<void> {
  const current = await getSmtpConfig();
  const merged: SmtpConfig = {
    host: config.host || current.host,
    port: config.port ? parseInt(String(config.port), 10) : current.port,
    secure: config.secure !== undefined ? Boolean(config.secure) : current.secure,
    user: config.user !== undefined ? config.user : current.user,
    pass: config.pass !== undefined && config.pass !== "••••••••" ? config.pass : current.pass,
    from_email: config.from_email || current.from_email,
    from_name: config.from_name || current.from_name,
  };

  await query(
    `INSERT INTO website_settings (key, value, updated_at)
     VALUES ('smtp_config', $1, NOW())
     ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
    [JSON.stringify(merged)]
  );
}

/**
 * Sends an email using native Node.js TLS/TCP socket directly to SMTP server.
 * Supports port 465 (Direct SSL) and port 587 (STARTTLS).
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ success: boolean; message: string; needConfig?: boolean }> {
  const config = await getSmtpConfig();

  if (!config.user || !config.pass) {
    return {
      success: false,
      needConfig: true,
      message:
        "SMTP credentials are not configured yet. Please configure your email in Email Settings or use 1-Click Gmail Web Compose.",
    };
  }

  return new Promise((resolve) => {
    const isSsl = config.port === 465 || config.secure;

    const establishConnection = () => {
      if (isSsl) {
        return tls.connect({
          host: config.host,
          port: config.port,
          rejectUnauthorized: false,
        });
      } else {
        return net.connect({
          host: config.host,
          port: config.port,
        });
      }
    };

    let socket: any;
    try {
      socket = establishConnection();
    } catch (err: any) {
      return resolve({
        success: false,
        message: `Connection failed to ${config.host}:${config.port}: ${err.message}`,
      });
    }

    let buffer = "";
    let step = 0;
    const timeout = setTimeout(() => {
      try {
        socket.destroy();
      } catch {}
      resolve({ success: false, message: "SMTP connection timed out after 15 seconds." });
    }, 15000);

    const cleanup = (res: { success: boolean; message: string }) => {
      clearTimeout(timeout);
      try {
        socket.end();
      } catch {}
      resolve(res);
    };

    socket.on("error", (err: any) => {
      cleanup({ success: false, message: `SMTP Socket Error: ${err.message}` });
    });

    socket.on("data", (chunk: Buffer) => {
      buffer += chunk.toString();
      const lines = buffer.split("\r\n");

      while (lines.length > 1) {
        const line = lines.shift() || "";
        const code = parseInt(line.substring(0, 3), 10);

        if (isNaN(code)) continue;

        // Check if multiline response (e.g., '250-SIZE' vs '250 OK')
        if (line.charAt(3) === "-") continue;

        // Step 0: Initial banner 220
        if (step === 0 && code === 220) {
          step = 1;
          socket.write("EHLO localhost\r\n");
        }
        // Step 1: EHLO response 250
        else if (step === 1 && code === 250) {
          step = 2;
          socket.write("AUTH LOGIN\r\n");
        }
        // Step 2: AUTH LOGIN 334 (Username prompt)
        else if (step === 2 && code === 334) {
          step = 3;
          socket.write(Buffer.from(config.user).toString("base64") + "\r\n");
        }
        // Step 3: Password prompt 334
        else if (step === 3 && code === 334) {
          step = 4;
          socket.write(Buffer.from(config.pass).toString("base64") + "\r\n");
        }
        // Step 4: Auth Success 235
        else if (step === 4 && code === 235) {
          step = 5;
          socket.write(`MAIL FROM:<${config.from_email || config.user}>\r\n`);
        }
        // Step 5: MAIL FROM OK 250
        else if (step === 5 && code === 250) {
          step = 6;
          socket.write(`RCPT TO:<${to}>\r\n`);
        }
        // Step 6: RCPT TO OK 250
        else if (step === 6 && code === 250) {
          step = 7;
          socket.write("DATA\r\n");
        }
        // Step 7: Ready for DATA 354
        else if (step === 7 && code === 354) {
          step = 8;
          const dateStr = new Date().toUTCString();
          const fromHeader = `"${config.from_name || 'Creed Tech'}" <${config.from_email || config.user}>`;
          const emailData = [
            `From: ${fromHeader}`,
            `To: <${to}>`,
            `Subject: ${subject}`,
            `Date: ${dateStr}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=utf-8`,
            ``,
            html || text || "",
            `.`,
            ``,
          ].join("\r\n");

          socket.write(emailData);
        }
        // Step 8: Data Accepted 250
        else if (step === 8 && code === 250) {
          socket.write("QUIT\r\n");
          cleanup({
            success: true,
            message: `✓ Email successfully delivered to ${to} via ${config.host}!`,
          });
        }
        // Errors
        else if (code >= 400) {
          cleanup({
            success: false,
            message: `SMTP Error (${code}): ${line}`,
          });
        }
      }
    });
  });
}
