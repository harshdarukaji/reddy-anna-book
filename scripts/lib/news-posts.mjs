import { getPitchReport, getVenueCoords } from "./venues.mjs";
import { fetchWeather, formatWeather } from "./weather.mjs";
import {
  fetchSquadsForMatch,
  formatSquadList,
  isRecordHeadline,
  extractRecordHighlights,
} from "./squads.mjs";
import {
  formatMatchDate,
  formatScore,
  matchSlug,
} from "./cricbuzz.mjs";

const WHATSAPP_CTA =
  "Get your Reddy Anna Cricket ID on WhatsApp and bet on live cricket with instant deposits.";

export function pickImage(info, kind) {
  const ipl = (info?.seriesName ?? "").toLowerCase().includes("ipl");
  if (kind === "digest") return "/images/blog/cricket-news.jpg";
  if (kind === "record") return "/images/blog/ipl-cricket.jpg";
  if (ipl || kind === "preview-ipl") return "/images/blog/ipl-cricket.jpg";
  if (kind === "result") return "/images/blog/cricket-hero.jpg";
  return "/images/blog/cricket-hero.jpg";
}

function seoKeywords(extra = []) {
  return [
    "cricket news",
    "cricket match preview",
    "pitch report",
    "weather report",
    "cricket lineup",
    "live cricket betting",
    "reddy anna cricket",
    ...extra,
  ].slice(0, 10);
}

function ctaBlock() {
  return [
    { type: "h2", text: "Bet on Cricket with Reddy Anna Book", id: "bet-with-reddy-anna" },
    {
      type: "p",
      text: "Use pitch reports, weather updates, and team news to make smarter cricket bets on Reddy Anna Book. Live odds on IPL, ODIs, Tests, and T20 leagues. New users get ₹5,000 welcome bonus.",
    },
    { type: "cta", text: WHATSAPP_CTA },
  ];
}

export function buildDailyDigest({ today, recent, upcoming, schedule, rssRecords, rssHeadlines }) {
  const slug = `cricket-daily-digest-${today}`;
  const title = `Cricket Daily Digest — ${formatDisplayDate(today)} | Match Previews & Results`;

  const blocks = [
    {
      type: "p",
      text: `Your complete cricket briefing for ${formatDisplayDate(today)} — upcoming fixtures between top teams, latest match results, pitch and weather reports, squad updates, and record-breaking performances. Updated daily on Reddy Anna Book.`,
    },
    { type: "h2", text: "Upcoming Cricket Matches", id: "upcoming-matches" },
    {
      type: "p",
      text: "Fixtures scheduled in the coming days across international and league cricket:",
    },
  ];

  const upcomingRows = upcoming.slice(0, 12).map(({ matchInfo: m }) => [
    formatMatchDate(m.startDate),
    `${m.team1?.teamName ?? "TBC"} vs ${m.team2?.teamName ?? "TBC"}`,
    m.matchFormat ?? "—",
    m.venueInfo?.city ?? m.venueInfo?.ground?.split(",")[0] ?? "TBC",
    m.seriesName?.slice(0, 40) ?? "—",
  ]);

  if (upcomingRows.length) {
    blocks.push({
      type: "table",
      headers: ["Date (IST)", "Match", "Format", "Venue", "Series"],
      rows: upcomingRows,
    });
  } else if (schedule.length) {
    const schedRows = schedule.slice(0, 12).map((m) => [
      m.scheduleDate ?? formatMatchDate(m.startDate),
      `${m.team1?.teamName ?? "TBC"} vs ${m.team2?.teamName ?? "TBC"}`,
      m.matchFormat ?? "—",
      m.venueInfo?.city ?? "TBC",
    ]);
    blocks.push({
      type: "table",
      headers: ["Date", "Match", "Format", "Venue"],
      rows: schedRows,
    });
  } else {
    blocks.push({ type: "p", text: "No upcoming fixtures listed at this time — check back tomorrow." });
  }

  blocks.push({ type: "h2", text: "Latest Match Results — Who Won?", id: "latest-results" });
  const resultItems = recent.slice(0, 8).map(({ matchInfo: m, matchScore: s }) => {
    const score = formatScore(s, m.team1, m.team2);
    return `${m.team1?.teamName} vs ${m.team2?.teamName} (${m.matchDesc}, ${m.matchFormat}): ${m.status ?? m.stateTitle ?? "Complete"} — ${score}`;
  });
  blocks.push({ type: "ul", items: resultItems.length ? resultItems : ["No recent results available."] });

  if (rssRecords.length) {
    blocks.push({ type: "h2", text: "Record-Breaking Performances", id: "records" });
    blocks.push({
      type: "ul",
      items: rssRecords.slice(0, 6).map((r) => `${r.title} — ${r.description.slice(0, 120)}`),
    });
  }

  if (rssHeadlines.length) {
    blocks.push({ type: "h2", text: "Top Cricket Headlines", id: "headlines" });
    blocks.push({
      type: "ul",
      items: rssHeadlines.slice(0, 5).map((r) => r.title),
    });
  }

  blocks.push(...ctaBlock());

  return {
    slug,
    title,
    description: `Daily cricket digest: upcoming ${upcoming.length}+ matches, latest results, pitch & weather reports, lineups, and record-breaking player performances.`,
    excerpt: `Upcoming fixtures, latest results, pitch reports, weather, and squad news for ${formatDisplayDate(today)}.`,
    keywords: seoKeywords(["cricket daily digest", "upcoming cricket matches", "cricket results today"]),
    category: "Cricket News",
    publishedAt: today,
    updatedAt: today,
    readingTime: Math.max(5, Math.ceil(blocks.length / 2)),
    source: "Cricbuzz + BBC Sport",
    image: pickImage(null, "digest"),
    imageAlt: `Cricket daily digest ${today} — match previews and results`,
    blocks,
  };
}

export async function buildMatchPreview({ matchInfo: m, matchScore, today }) {
  const slug = `match-preview-${matchSlug(m)}`;
  const t1 = m.team1?.teamName ?? "Team 1";
  const t2 = m.team2?.teamName ?? "Team 2";
  const title = `${t1} vs ${t2} Preview — Pitch, Weather & Lineup | ${m.matchDesc ?? m.matchFormat}`;

  const pitch = getPitchReport(m.venueInfo, m.matchFormat);
  const coords = getVenueCoords(m.venueInfo);
  const weather = coords ? await fetchWeather(coords.lat, coords.lng, m.startDate) : null;
  const squads = await fetchSquadsForMatch(m);

  const blocks = [
    {
      type: "p",
      text: `Match preview: ${t1} face ${t2} in ${m.matchDesc ?? "a fixture"} (${m.matchFormat}) on ${formatMatchDate(m.startDate)} at ${pitch.venue}. Full pitch report, weather forecast, and squad details below.`,
    },
    { type: "h2", text: "Match Details", id: "match-details" },
    {
      type: "table",
      headers: ["Detail", "Info"],
      rows: [
        ["Teams", `${t1} vs ${t2}`],
        ["Format", m.matchFormat ?? "—"],
        ["Series", m.seriesName ?? "—"],
        ["Date & Time (IST)", formatMatchDate(m.startDate)],
        ["Venue", pitch.venue],
        ["Status", m.status ?? "Upcoming"],
      ],
    },
    { type: "h2", text: "Pitch Report", id: "pitch-report" },
    { type: "p", text: pitch.summary },
    { type: "p", text: `Expected par score: ${pitch.parScore}.` },
    { type: "h2", text: "Weather Report", id: "weather-report" },
    { type: "p", text: formatWeather(weather) },
    { type: "h2", text: "Team Lineups & Squads", id: "lineups" },
    { type: "p", text: squads.note },
  ];

  const lineupItems = [
    ...formatSquadList(squads.team1, t1),
    ...formatSquadList(squads.team2, t2),
  ];
  if (lineupItems.length > 2) {
    blocks.push({ type: "ul", items: lineupItems.slice(0, 24) });
  }

  if (m.state === "Complete" && matchScore) {
    blocks.push({ type: "h2", text: "Result", id: "result" });
    blocks.push({
      type: "p",
      text: `${m.status ?? m.stateTitle ?? "Match complete"}. Scores: ${formatScore(matchScore, m.team1, m.team2)}`,
    });
  }

  blocks.push(...ctaBlock());

  return {
    slug,
    title,
    description: `${t1} vs ${t2} preview with pitch report, weather forecast, probable lineups, and betting insights for ${m.matchFormat} on ${formatMatchDate(m.startDate)}.`,
    excerpt: `${t1} vs ${t2} — pitch: ${pitch.summary.slice(0, 100)}… Weather: ${formatWeather(weather).slice(0, 80)}…`,
    keywords: seoKeywords([
      `${t1} vs ${t2}`,
      "pitch report",
      "weather forecast",
      `${m.matchFormat} preview`,
    ]),
    category: "Cricket News",
    publishedAt: today,
    updatedAt: today,
    readingTime: Math.max(4, Math.ceil(blocks.length / 2)),
    source: "Cricbuzz",
    image: pickImage(m, isIpl(m) ? "preview-ipl" : "preview"),
    imageAlt: `${t1} vs ${t2} cricket match preview — pitch and weather report`,
    blocks,
  };
}

function isIpl(m) {
  return (m.seriesName ?? "").toLowerCase().includes("ipl");
}

export async function buildResultPost({ matchInfo: m, matchScore, today, header }) {
  const slug = `cricket-result-${matchSlug(m)}`;
  const t1 = m.team1?.teamName ?? "Team 1";
  const t2 = m.team2?.teamName ?? "Team 2";
  const title = `${m.status ?? `${t1} vs ${t2} Result`} | ${m.matchDesc ?? m.matchFormat} Cricket News`;

  const potm = header?.playersOfTheMatch?.[0];
  const blocks = [
    {
      type: "p",
      text: `Match result: ${t1} vs ${t2} (${m.matchDesc}, ${m.matchFormat}) — ${m.status ?? m.stateTitle}. Full scorecard summary and player highlights from Reddy Anna Book cricket news.`,
    },
    { type: "h2", text: "Final Result", id: "final-result" },
    {
      type: "table",
      headers: ["Team", "Score"],
      rows: buildScoreRows(matchScore, m.team1, m.team2),
    },
    { type: "p", text: `Winner: ${m.status ?? m.stateTitle ?? "See scorecard above"}.` },
  ];

  if (header?.tossResults) {
    blocks.push({
      type: "p",
      text: `Toss: ${header.tossResults.tossWinnerName} chose ${header.tossResults.decision?.toLowerCase() ?? "—"}.`,
    });
  }

  if (potm) {
    blocks.push({ type: "h2", text: "Player of the Match", id: "player-of-match" });
    blocks.push({
      type: "p",
      text: `${potm.fullName ?? potm.name} delivered a match-winning performance${potm.runs ? ` — scored ${potm.runs} runs` : ""}.`,
    });
  }

  const pitch = getPitchReport(m.venueInfo, m.matchFormat);
  blocks.push({ type: "h2", text: "Pitch Summary", id: "pitch-summary" });
  blocks.push({ type: "p", text: pitch.summary });

  blocks.push(...ctaBlock());

  return {
    slug,
    title,
    description: `${t1} vs ${t2} result: ${m.status}. Scores, player of the match, and pitch report.`,
    excerpt: `${m.status} — ${formatScore(matchScore, m.team1, m.team2)}`,
    keywords: seoKeywords([`${t1} vs ${t2} result`, "who won", "cricket scorecard"]),
    category: "Cricket News",
    publishedAt: today,
    updatedAt: today,
    readingTime: 4,
    source: "Cricbuzz",
    image: pickImage(m, "result"),
    imageAlt: `${t1} vs ${t2} cricket match result`,
    blocks,
  };
}

function buildScoreRows(matchScore, team1, team2) {
  if (!matchScore) return [["—", "—"]];
  const rows = [];
  for (const [key, team] of [
    ["team1Score", team1?.teamName],
    ["team2Score", team2?.teamName],
  ]) {
    const s = matchScore[key];
    if (!s) continue;
    const inn = [];
    for (const k of Object.keys(s)) {
      const i = s[k];
      if (i?.runs != null) inn.push(`${i.runs}/${i.wickets ?? 0} (${i.overs ?? "?"} ov)`);
    }
    if (inn.length) rows.push([team ?? "Team", inn.join(" & ")]);
  }
  return rows.length ? rows : [["—", "—"]];
}

export function buildRecordPost(item, today) {
  const baseSlug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
  const slug = `cricket-news-${today}-${baseSlug}`;

  const paragraphs = item.description
    .split(/(?<=[.!?])\s+/)
    .filter((p) => p.length > 40)
    .slice(0, 5);

  const blocks = [
    {
      type: "p",
      text: `Record-breaking cricket news: ${item.title}. ${item.description.slice(0, 200)}`,
    },
    ...paragraphs.map((text) => ({ type: "p", text })),
    { type: "h2", text: "Why This Matters for Bettors", id: "betting-angle" },
    {
      type: "p",
      text: "Record performances often shift team momentum and player markets. Track form on Reddy Anna Book before placing session and match bets.",
    },
    ...ctaBlock(),
  ];

  return {
    slug,
    title: `${item.title} | Cricket News`,
    description: item.description.slice(0, 160) || item.title,
    excerpt: item.description.slice(0, 160) || item.title,
    keywords: seoKeywords(["cricket records", "cricket milestones"]),
    category: "Cricket News",
    publishedAt: today,
    updatedAt: today,
    readingTime: 3,
    source: "BBC Sport Cricket RSS",
    externalUrl: item.link,
    image: pickImage(null, "record"),
    imageAlt: `Cricket record: ${item.title}`,
    blocks,
  };
}

export function buildHeadlinePost(item, today) {
  if (isRecordHeadline(item.title, item.description)) return null;
  const baseSlug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
  const slug = `cricket-news-${today}-${baseSlug}`;

  const blocks = [
    {
      type: "p",
      text: `Cricket update: ${item.title}. ${item.description}`,
    },
    ...ctaBlock(),
  ];

  return {
    slug,
    title: `${item.title} | Cricket News`,
    description: item.description.slice(0, 160) || item.title,
    excerpt: item.description.slice(0, 160) || item.title,
    keywords: seoKeywords(["cricket updates"]),
    category: "Cricket News",
    publishedAt: today,
    updatedAt: today,
    readingTime: 3,
    source: "BBC Sport Cricket RSS",
    externalUrl: item.link,
    image: "/images/blog/cricket-news.jpg",
    imageAlt: `Cricket news: ${item.title}`,
    blocks,
  };
}

function formatDisplayDate(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { isRecordHeadline, extractRecordHighlights };
