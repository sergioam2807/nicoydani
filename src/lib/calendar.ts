import { siteConfig } from "@/config/site";

function toIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildIcsFile() {
  const { date, title, description, durationHours } = siteConfig.event;
  const start = date;
  const end = new Date(date.getTime() + durationHours * 60 * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-app//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-app`,
    `DTSTAMP:${toIcsDate(new Date(start))}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${siteConfig.venue.name}, ${siteConfig.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadIcsFile() {
  const blob = new Blob([buildIcsFile()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "matrimonio.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl() {
  const { date, title, description, durationHours } = siteConfig.event;
  const start = date;
  const end = new Date(date.getTime() + durationHours * 60 * 60 * 1000);
  const fmt = (d: Date) => toIcsDate(d);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: description,
    location: `${siteConfig.venue.name}, ${siteConfig.venue.address}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
