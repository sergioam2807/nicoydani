import { siteConfig } from "@/config/site";

export function googleMapsUrl() {
  const { lat, lng, address } = siteConfig.venue;
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function wazeUrl() {
  const { lat, lng, address } = siteConfig.venue;
  if (lat != null && lng != null) {
    return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  }
  return `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
}

export function googleMapsEmbedSrc() {
  const { lat, lng, address } = siteConfig.venue;
  const query = lat != null && lng != null ? `${lat},${lng}` : address;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
