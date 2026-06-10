/** Squad / lineup helpers — IPL free API + optional CricAPI. */

const IPL_CODES = {
  "mumbai indians": "mi",
  "chennai super kings": "csk",
  "royal challengers": "rcb",
  "royal challengers bengaluru": "rcb",
  "kolkata knight riders": "kkr",
  "sunrisers hyderabad": "srh",
  "delhi capitals": "dc",
  "punjab kings": "pbks",
  "rajasthan royals": "rr",
  "gujarat titans": "gt",
  "lucknow super giants": "lsg",
};

const IPL_API = "https://ipl-okn0.onrender.com";

export function isIplMatch(info) {
  const series = (info.seriesName ?? "").toLowerCase();
  const fmt = info.matchFormat ?? "";
  return series.includes("ipl") || series.includes("indian premier league") || fmt === "IPL";
}

function iplCode(teamName = "") {
  const lower = teamName.toLowerCase();
  for (const [name, code] of Object.entries(IPL_CODES)) {
    if (lower.includes(name) || name.includes(lower)) return code;
  }
  const short = lower.replace(/\s+/g, " ").trim();
  for (const [name, code] of Object.entries(IPL_CODES)) {
    const words = name.split(" ");
    if (words.every((w) => short.includes(w))) return code;
  }
  return null;
}

export async function fetchIplSquad(teamName) {
  const code = iplCode(teamName);
  if (!code) return null;
  try {
    const res = await fetch(`${IPL_API}/squad/${code}`, {
      headers: { "User-Agent": "ReddyAnnaBook/1.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.squad) return null;
    const players = Object.values(data.squad)
      .map((p) => ({
        name: p.Name,
        role: p.Role,
        captain: p.Captaincy === "Captain",
        overseas: p.Overseas,
      }))
      .filter((p) => p.name);
    return players.slice(0, 15);
  } catch {
    return null;
  }
}

export async function fetchSquadsForMatch(info) {
  if (!isIplMatch(info)) {
    return {
      team1: null,
      team2: null,
      note: "International playing XI is announced at the toss. Check back on match day for confirmed line-ups.",
    };
  }
  const [team1, team2] = await Promise.all([
    fetchIplSquad(info.team1?.teamName),
    fetchIplSquad(info.team2?.teamName),
  ]);
  return {
    team1,
    team2,
    note: team1 || team2
      ? "Full IPL squad listed — final playing XI is confirmed at the toss."
      : "Squad data temporarily unavailable.",
  };
}

export function formatSquadList(players, teamName) {
  if (!players?.length) return [`${teamName}: Squad TBC at toss`];
  const byRole = {};
  for (const p of players) {
    const role = p.role ?? "Squad";
    if (!byRole[role]) byRole[role] = [];
    byRole[role].push(p.captain ? `${p.name} (C)` : p.name);
  }
  return Object.entries(byRole).flatMap(([role, names]) =>
    names.slice(0, 6).map((n) => `${teamName} ${role}: ${n}`)
  );
}

export async function fetchCricApiMatchInfo(matchId, apiKey) {
  if (!apiKey) return null;
  try {
    const url = `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${matchId}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

const RECORD_KEYWORDS =
  /\b(record|century|double century|hat-?trick|first time|fastest|milestone|historic|breaks?|youngest|oldest|highest|lowest|unbeaten|world number|ton|five-?for|five-?wicket|six-?for|776 runs|21 years)\b/i;

export function isRecordHeadline(title, description = "") {
  return RECORD_KEYWORDS.test(`${title} ${description}`);
}

export function extractRecordHighlights(items) {
  return items.filter((i) => isRecordHeadline(i.title, i.description));
}
