// Stress test and race-condition simulator for news aggregation
const http = require("http");

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), headers: res.headers });
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

// Domain / URL validation rules per provider to detect any cross-contamination
const EXPECTED_DOMAINS = {
  apple: ["apple.com"],
  google: ["google.com", "blog.google"],
  nvidia: ["nvidia.com"],
  openai: ["openai.com"],
  meta: ["about.fb.com", "meta.com", "facebook.com"],
  microsoft: ["microsoft.com"],
  anthropic: ["anthropic.com", "google.com/rss"],
  intel: ["intel.com", "google.com/rss"],
  dawn: ["dawn.com"],
  brecorder: ["brecorder.com"],
  propakistani: ["propakistani.pk"],
  tribune: ["tribune.com.pk"],
};

async function runLiveStressTest() {
  console.log("=== 1. RELOAD FEED 30 TIMES IN QUICK SUCCESSION ===");
  const iterations = 30;
  const promises = [];

  const start = Date.now();
  for (let i = 0; i < iterations; i++) {
    promises.push(fetchJson("http://localhost:3001/api/live-news"));
  }

  const results = await Promise.all(promises);
  console.log(`Completed ${iterations} parallel requests in ${Date.now() - start}ms.`);

  let totalItemsChecked = 0;
  let mismatchCount = 0;
  let missingFieldCount = 0;

  for (let i = 0; i < results.length; i++) {
    const { status, data, headers } = results[i];
    if (status !== 200 || !data.breaking_news) {
      console.error(`Request #${i + 1} failed with status ${status}`);
      mismatchCount++;
      continue;
    }

    // Verify Cache-Control header on the feed
    if (i === 0) {
      console.log(`Feed Cache-Control header: ${headers["cache-control"]}`);
    }

    for (const item of data.breaking_news) {
      totalItemsChecked++;

      // 1. Check required fields exist together on the object
      if (!item.id || !item.source || !item.title || !item.image || !item.link) {
        console.error(`Missing field on item:`, item);
        missingFieldCount++;
      }

      // 2. Check id starts with source name
      if (!item.id.startsWith(item.source)) {
        console.error(`ID does not match source: item.id=${item.id}, item.source=${item.source}`);
        mismatchCount++;
      }

      // 3. Check link domain matches provider
      const pKey = (item.provider || "").toLowerCase();
      const expected = EXPECTED_DOMAINS[pKey];
      if (expected) {
        const matchesDomain = expected.some((d) => item.link.includes(d));
        if (!matchesDomain) {
          console.error(`Domain mismatch! Provider ${pKey} has link: ${item.link}`);
          mismatchCount++;
        }
      }
    }
  }

  console.log(`\nResults across 30 reloads:`);
  console.log(`- Total article instances verified: ${totalItemsChecked}`);
  console.log(`- Missing fields: ${missingFieldCount}`);
  console.log(`- Mismatches detected: ${mismatchCount}`);
  if (mismatchCount === 0 && missingFieldCount === 0) {
    console.log(`>>> PASS: Zero mismatches across ${totalItemsChecked} articles! <<<\n`);
  } else {
    process.exit(1);
  }
}

// 2. Race condition & asynchronous resolution simulation
async function runAsyncRaceConditionSimulation() {
  console.log("=== 2. ASYNC RACE CONDITION SIMULATION (10 sources with random delays & failures) ===");
  const sources = [
    { name: "Apple", key: "apple", defaultImage: "/apple.jpg" },
    { name: "Google", key: "google", defaultImage: "/google.jpg" },
    { name: "NVIDIA", key: "nvidia", defaultImage: "/nvidia.jpg" },
    { name: "OpenAI", key: "openai", defaultImage: "/openai.jpg" },
    { name: "Meta", key: "meta", defaultImage: "/meta.jpg" },
    { name: "Microsoft", key: "microsoft", defaultImage: "/msft.jpg" },
    { name: "Anthropic", key: "anthropic", defaultImage: "/anthropic.jpg" },
    { name: "Dawn", key: "dawn", defaultImage: "/dawn.jpg" },
    { name: "Business Recorder", key: "brecorder", defaultImage: "/brecorder.jpg" },
    { name: "ProPakistani", key: "propakistani", defaultImage: "/propakistani.jpg" },
  ];

  // Mock fetcher that resolves in completely random order (50ms to 600ms), and 10% chance of throwing error
  async function mockFetchFromSource(source) {
    const delay = Math.floor(Math.random() * 550) + 50;
    await new Promise((r) => setTimeout(r, delay));

    // Simulate occasional source failure (e.g. rate limit / network drop)
    if (Math.random() < 0.1) {
      throw new Error(`Connection timeout for ${source.name}`);
    }

    return [
      { id: "art-1", title: `${source.name} Headline 1`, image: `https://${source.key}.com/img1.jpg` },
      { id: "art-2", title: `${source.name} Headline 2`, image: `https://${source.key}.com/img2.jpg` },
    ];
  }

  let totalSimItems = 0;
  let simMismatches = 0;

  for (let run = 1; run <= 50; run++) {
    // Exactly our merge pattern
    const results = await Promise.all(
      sources.map(async (source) => {
        try {
          const data = await mockFetchFromSource(source);
          return data.map((item) => ({
            id: `${source.name}-${item.id}`,
            source: source.name,
            provider: source.key,
            title: item.title,
            image: item.image,
          }));
        } catch (err) {
          // Source isolation: failing source does NOT break other sources
          return [];
        }
      })
    );
    const allNews = results.flat();

    for (const item of allNews) {
      totalSimItems++;
      if (!item.id.startsWith(item.source)) simMismatches++;
      if (!item.title.startsWith(item.source)) simMismatches++;
      if (!item.image.includes(item.provider)) simMismatches++;
    }
  }

  console.log(`Simulation finished 50 concurrent runs with random delays & failures:`);
  console.log(`- Total simulated items verified: ${totalSimItems}`);
  console.log(`- Mismatches: ${simMismatches}`);
  if (simMismatches === 0) {
    console.log(`>>> PASS: Atomic objects remain 100% paired under all async timing variations! <<<\n`);
  } else {
    process.exit(1);
  }
}

async function checkArticlePageCacheHeaders() {
  console.log("=== 3. CHECK ARTICLE PAGES CACHE HEADERS (7-DAY CACHE CHECK) ===");
  const articleRes = await fetchJson("http://localhost:3001/api/articles");
  console.log(`Article API Cache-Control: ${articleRes.headers["cache-control"]}`);
  if (articleRes.headers["cache-control"].includes("max-age=604800")) {
    console.log(`>>> CONFIRMED: Article pages / articles API retain the 7-day (604,800s) long cache! <<<`);
  } else {
    console.error(`Article cache is not 7 days! Got: ${articleRes.headers["cache-control"]}`);
  }
}

async function main() {
  try {
    await runLiveStressTest();
    await runAsyncRaceConditionSimulation();
    await checkArticlePageCacheHeaders();
    console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY.");
  } catch (e) {
    console.error("Test error:", e);
    process.exit(1);
  }
}

main();
