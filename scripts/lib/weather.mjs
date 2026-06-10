/** Open-Meteo weather forecast — free, no API key. */

export async function fetchWeather(lat, lng, matchDateMs) {
  if (lat == null || lng == null) return null;
  const matchDate = new Date(Number(matchDateMs));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAhead = Math.ceil((matchDate - today) / 86400000);
  if (daysAhead < 0 || daysAhead > 14) {
    return {
      note: "Detailed forecast available closer to match day (within 14 days).",
    };
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lng));
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "16");

  try {
    const res = await fetch(url, { headers: { "User-Agent": "ReddyAnnaBook/1.0" } });
    if (!res.ok) return null;
    const data = await res.json();
    const dateStr = matchDate.toISOString().slice(0, 10);
    const idx = data.daily?.time?.indexOf(dateStr);
    if (idx == null || idx < 0) {
      return { note: "Forecast date not yet in range — check again closer to the match." };
    }

    const code = data.daily.weathercode?.[idx];
    return {
      date: dateStr,
      tempMax: data.daily.temperature_2m_max?.[idx],
      tempMin: data.daily.temperature_2m_min?.[idx],
      rainMm: data.daily.precipitation_sum?.[idx],
      windKmh: data.daily.wind_speed_10m_max?.[idx],
      condition: weatherLabel(code),
      note: rainNote(data.daily.precipitation_sum?.[idx], code),
    };
  } catch {
    return null;
  }
}

function weatherLabel(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  return map[code] ?? "Variable conditions";
}

function rainNote(mm, code) {
  if (mm > 5 || [63, 65, 80, 95].includes(code)) {
    return "Rain likely — DLS may apply; favour bowlers who hit the deck and teams with depth.";
  }
  if (mm > 1 || [51, 53, 55, 61].includes(code)) {
    return "Light rain possible — overcast conditions could assist swing bowling early.";
  }
  if ([3, 45, 48].includes(code)) {
    return "Cloud cover expected — seamers may get movement with the new ball.";
  }
  return "Dry conditions expected — good for batting if the pitch is true.";
}

export function formatWeather(w) {
  if (!w) return "Weather data unavailable for this venue.";
  if (w.note && w.tempMax == null) return w.note;
  const parts = [
    w.condition,
    w.tempMax != null ? `High ${Math.round(w.tempMax)}°C / Low ${Math.round(w.tempMin)}°C` : null,
    w.rainMm != null ? `Rain: ${w.rainMm} mm` : null,
    w.windKmh != null ? `Wind: up to ${Math.round(w.windKmh)} km/h` : null,
  ].filter(Boolean);
  return `${parts.join(" · ")}. ${w.note ?? ""}`.trim();
}
