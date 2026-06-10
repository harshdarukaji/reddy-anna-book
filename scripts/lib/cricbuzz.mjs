/** Cricbuzz page scraper — extracts match data from embedded Next.js flight payloads. */

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function unescapeChunk(s) {
  return s
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\u0026/g, "&");
}

export function parseBalancedJson(text, startIdx) {
  const open = text[startIdx];
  if (open !== "{" && open !== "[") return null;
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = startIdx; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(startIdx, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

export async function fetchPageText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  const html = await res.text();
  return [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)]
    .map((m) => unescapeChunk(m[1]))
    .join("\n");
}

export function extractAllMatchBlocks(text) {
  const results = [];
  let pos = 0;
  while (true) {
    const mi = text.indexOf('"matchInfo":', pos);
    if (mi === -1) break;
    const infoStart = mi + '"matchInfo":'.length;
    const info = parseBalancedJson(text, infoStart);
    if (!info?.matchId) {
      pos = mi + 12;
      continue;
    }
    let score = null;
    const ms = text.indexOf('"matchScore":', infoStart);
    if (ms !== -1 && ms < infoStart + 8000) {
      score = parseBalancedJson(text, ms + '"matchScore":'.length);
    }
    results.push({ matchInfo: info, matchScore: score });
    pos = mi + 12;
  }
  return results;
}

export function dedupeMatches(blocks) {
  const map = new Map();
  for (const b of blocks) {
    map.set(b.matchInfo.matchId, b);
  }
  return [...map.values()];
}

function flattenSchedule(scheduleData) {
  const out = [];
  for (const day of scheduleData?.matchScheduleMap ?? []) {
    const dateLabel = day.scheduleAdWrapper?.date ?? "";
    for (const entry of day.scheduleAdWrapper?.matchScheduleList ?? []) {
      for (const m of entry.matchInfo ?? []) {
        out.push({
          ...m,
          scheduleDate: dateLabel,
          seriesName: entry.seriesName ?? m.seriesName,
        });
      }
    }
  }
  return out;
}

export function extractSchedule(text) {
  const idx = text.indexOf('"scheduleData":');
  if (idx === -1) return [];
  const data = parseBalancedJson(text, idx + '"scheduleData":'.length);
  return flattenSchedule(data);
}

export async function fetchRecentMatches() {
  const text = await fetchPageText(
    "https://www.cricbuzz.com/cricket-match/live-scores/recent-matches"
  );
  return dedupeMatches(extractAllMatchBlocks(text))
    .filter((m) => m.matchInfo.state === "Complete")
    .sort((a, b) => Number(b.matchInfo.startDate) - Number(a.matchInfo.startDate));
}

export async function fetchUpcomingMatches() {
  const text = await fetchPageText(
    "https://www.cricbuzz.com/cricket-match/live-scores/upcoming-matches"
  );
  return dedupeMatches(extractAllMatchBlocks(text))
    .filter((m) => m.matchInfo.state !== "Complete")
    .sort((a, b) => Number(a.matchInfo.startDate) - Number(b.matchInfo.startDate));
}

export async function fetchScheduleByDay() {
  const text = await fetchPageText(
    "https://www.cricbuzz.com/cricket-schedule/upcoming-series/international"
  );
  return extractSchedule(text);
}

export async function fetchMatchHeader(matchId, slugHint) {
  const url = slugHint
    ? `https://www.cricbuzz.com/live-cricket-scores/${matchId}/${slugHint}`
    : `https://www.cricbuzz.com/live-cricket-scores/${matchId}`;
  try {
    const text = await fetchPageText(url);
    const idx = text.indexOf('"matchHeader":');
    if (idx === -1) return null;
    return parseBalancedJson(text, idx + '"matchHeader":'.length);
  } catch {
    return null;
  }
}

export function formatScore(matchScore, team1, team2) {
  if (!matchScore) return "—";
  const parts = [];
  for (const [key, team] of [
    ["team1Score", team1?.teamSName],
    ["team2Score", team2?.teamSName],
  ]) {
    const s = matchScore[key];
    if (!s) continue;
    const inn = [];
    for (const k of Object.keys(s)) {
      const i = s[k];
      if (i?.runs != null) {
        inn.push(`${i.runs}/${i.wickets ?? 0} (${i.overs ?? "?"} ov)`);
      }
    }
    if (inn.length) parts.push(`${team}: ${inn.join(" & ")}`);
  }
  return parts.join(" | ") || "—";
}

export function formatMatchDate(ms) {
  if (!ms) return "TBC";
  return new Date(Number(ms)).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export function matchPriority(block) {
  const info = block.matchInfo ?? block;
  const series = (info.seriesName ?? "").toLowerCase();
  const fmt = info.matchFormat ?? "";

  if (series.includes("ipl") || series.includes("indian premier league")) return 95;
  if (["TEST", "ODI", "T20I"].includes(fmt) && !series.includes("women")) return 90;
  if (series.includes("tour of") || series.includes("world cup") || series.includes("asia cup")) return 85;
  if (fmt === "TEST" || fmt === "ODI") return 70;
  if (series.includes("women") && fmt === "T20") return 25;
  return 15;
}

export function isFutureMatch(block) {
  const start = Number(block.matchInfo?.startDate ?? block.startDate);
  return start > Date.now() - 3600000;
}

export function sortMatchesByPriority(blocks) {
  return [...blocks]
    .filter(isFutureMatch)
    .sort((a, b) => {
      const pd = matchPriority(b) - matchPriority(a);
      if (pd !== 0) return pd;
      return Number(a.matchInfo.startDate) - Number(b.matchInfo.startDate);
    });
}

export function sortRecentByPriority(blocks) {
  return [...blocks].sort((a, b) => {
    const pd = matchPriority(b) - matchPriority(a);
    if (pd !== 0) return pd;
    return Number(b.matchInfo.startDate) - Number(a.matchInfo.startDate);
  });
}

export function matchSlug(info) {
  const t1 = (info.team1?.teamSName ?? "t1").toLowerCase();
  const t2 = (info.team2?.teamSName ?? "t2").toLowerCase();
  const date = new Date(Number(info.startDate)).toISOString().slice(0, 10);
  return `${t1}-vs-${t2}-${date}`;
}
