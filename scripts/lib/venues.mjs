/** Venue pitch characteristics + coordinate fallbacks for weather. */

const VENUE_PITCHES = [
  { match: /wankhede|mumbai/i, pitch: "Batting-friendly deck with true bounce; short boundaries favour power hitters. Spinners get turn in second innings.", avg: "170–190 (T20)" },
  { match: /eden gardens|kolkata/i, pitch: "Slow, turning surface — spinners dominate. Chasing teams need patience early.", avg: "150–170 (T20)" },
  { match: /chinnaswamy|bengaluru|bangalore/i, pitch: "High-scoring belter with good carry; dew makes chasing easier.", avg: "180–200 (T20)" },
  { match: /chepauk|chennai/i, pitch: "Traditional spin-friendly track; low-scoring Tests, balanced in limited overs.", avg: "160–175 (T20)" },
  { match: /arun jaitley|delhi|kotla/i, pitch: "Slow outfield, variable bounce; spin effective in second half.", avg: "155–170 (T20)" },
  { match: /narendra modi|ahmedabad|motera/i, pitch: "Hard, even surface — good for batters and fast bowlers; long boundaries.", avg: "165–180 (T20)" },
  { match: /rajiv gandhi|hyderabad|uppal/i, pitch: "Balanced wicket; black soil offers turn as match progresses.", avg: "160–175 (T20)" },
  { match: /punjab|mohali|dharamsala/i, pitch: "Pace and bounce on offer; seamers enjoy early overs.", avg: "165–180 (T20)" },
  { match: /lord'?s|london/i, pitch: "Seam-friendly English conditions; overcast skies assist swing bowlers.", avg: "250–300 (ODI)" },
  { match: /mirpur|sher-e-bangla|dhaka/i, pitch: "Slow, low bounce; spinners key in middle overs. Turn increases under lights.", avg: "230–260 (ODI)" },
  { match: /mcg|melbourne|scg|sydney|gabba|brisbane|adelaide|perth/i, pitch: "Pace and bounce typical of Australian wickets; good carry for fast bowlers.", avg: "260–290 (ODI)" },
  { match: /wanderers|johannesburg|centurion|capetown|durban/i, pitch: "Bouncy South African surfaces; seam movement early, flatten for batters later.", avg: "250–280 (ODI)" },
  { match: /galle|colombo|kandy/i, pitch: "Spin-friendly Sri Lankan tracks; deteriorate quickly on day 4–5 in Tests.", avg: "240–270 (ODI)" },
  { match: /old trafford|manchester|trent bridge|nottingham|headingley|leeds/i, pitch: "Classic English seaming conditions when clouds cover; batting paradise in sunshine.", avg: "250–280 (ODI)" },
  { match: /mullanpur|chandigarh/i, pitch: "Newer surface with even bounce; still finding its character for long formats.", avg: "250–280 (ODI)" },
];

const FORMAT_AVG = {
  TEST: "300–400 runs per innings typical",
  ODI: "250–290 runs par score",
  T20: "160–180 runs par score",
  T20I: "160–180 runs par score",
};

export function getPitchReport(venueInfo, format = "ODI") {
  const ground = `${venueInfo?.ground ?? ""} ${venueInfo?.city ?? ""}`;
  for (const v of VENUE_PITCHES) {
    if (v.match.test(ground)) {
      return {
        summary: v.pitch,
        parScore: v.avg,
        venue: ground.trim() || "Venue TBC",
      };
    }
  }
  return {
    summary: `Standard ${format} surface expected. Conditions will be clearer at the toss — monitor team selection and dew factor for night games.`,
    parScore: FORMAT_AVG[format] ?? FORMAT_AVG.ODI,
    venue: ground.trim() || "Venue TBC",
  };
}

export function getVenueCoords(venueInfo) {
  const lat = parseFloat(venueInfo?.latitude);
  const lng = parseFloat(venueInfo?.longitude);
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    return { lat, lng };
  }
  const ground = `${venueInfo?.ground ?? ""} ${venueInfo?.city ?? ""}`;
  const fallbacks = [
    { match: /mumbai/i, lat: 19.076, lng: 72.877 },
    { match: /delhi/i, lat: 28.613, lng: 77.209 },
    { match: /chennai/i, lat: 13.082, lng: 80.27 },
    { match: /kolkata/i, lat: 22.572, lng: 88.363 },
    { match: /bengaluru|bangalore/i, lat: 12.971, lng: 77.594 },
    { match: /hyderabad/i, lat: 17.385, lng: 78.486 },
    { match: /ahmedabad/i, lat: 23.022, lng: 72.571 },
    { match: /dhaka|mirpur/i, lat: 23.810, lng: 90.412 },
    { match: /kuala lumpur|bangi|malaysia/i, lat: 3.139, lng: 101.686 },
    { match: /kigali|rwanda/i, lat: -1.94, lng: 30.059 },
    { match: /london|lord/i, lat: 51.507, lng: -0.127 },
    { match: /sydney/i, lat: -33.868, lng: 151.209 },
    { match: /melbourne/i, lat: -37.813, lng: 144.963 },
    { match: /chandigarh|mullanpur/i, lat: 30.741, lng: 76.774 },
  ];
  for (const f of fallbacks) {
    if (f.match.test(ground)) return { lat: f.lat, lng: f.lng };
  }
  return null;
}
