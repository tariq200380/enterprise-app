import { query } from "./db";
import {
  EmailDepartmentProfile,
  DEFAULT_EMAIL_PROFILES,
} from "./email-types";

export * from "./email-types";

/**
 * Retrieve all configured email department profiles.
 * Initializes with defaults if not yet stored in DB.
 */
export async function getEmailProfiles(): Promise<EmailDepartmentProfile[]> {
  try {
    const res = await query(
      "SELECT value FROM website_settings WHERE key = 'email_department_profiles' LIMIT 1"
    );
    if (res.rows.length > 0 && res.rows[0].value) {
      const stored = res.rows[0].value;
      if (Array.isArray(stored) && stored.length > 0) {
        const seenEmails = new Set<string>();
        const seenIds = new Set<string>();
        const unique: EmailDepartmentProfile[] = [];
        for (const p of stored) {
          const em = (p.email || "").trim().toLowerCase();
          if (p.id && em && !seenEmails.has(em) && !seenIds.has(p.id)) {
            seenEmails.add(em);
            seenIds.add(p.id);
            unique.push(p);
          }
        }
        // Ensure default Format 2 profile (executive-desk) is available
        const defaultDesk2 = DEFAULT_EMAIL_PROFILES.find((p) => p.id === "executive-desk");
        if (defaultDesk2 && !seenIds.has(defaultDesk2.id) && !seenEmails.has((defaultDesk2.email || "").toLowerCase())) {
          unique.push(defaultDesk2);
        }
        return unique.length > 0 ? unique : stored;
      }
    }
  } catch {
    // Fallback to defaults if DB read fails
  }

  // Seed defaults into DB if not present
  try {
    await saveEmailProfiles(DEFAULT_EMAIL_PROFILES);
  } catch {}

  return DEFAULT_EMAIL_PROFILES;
}

/**
 * Save / Update the list of email department profiles.
 */
export async function saveEmailProfiles(profiles: EmailDepartmentProfile[]): Promise<void> {
  await query(
    `INSERT INTO website_settings (key, value, updated_at)
     VALUES ('email_department_profiles', $1, NOW())
     ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
    [JSON.stringify(profiles)]
  );
}
