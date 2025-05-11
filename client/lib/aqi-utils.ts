export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "var(--aqi-good, #00e400)" // Good
  // if (aqi <= 100) return "var(--aqi-moderate, #ffff00)" // Moderate
  if (aqi <= 100) return "var(--aqi-moderate, #ffde33)" // Moderate
  if (aqi <= 150) return "var(--aqi-sensitive, #ff7e00)" // Unhealthy for Sensitive Groups
  if (aqi <= 200) return "var(--aqi-unhealthy, #ff0000)" // Unhealthy
  // if (aqi <= 300) return "var(--aqi-veryunhealthy, #99004c)" // Very Unhealthy
  if (aqi <= 300) return "var(--aqi-veryunhealthy, #660099)" // Very Unhealthy
  return "var(--aqi-hazardous, #7e0023)" // Hazardous
}

export function getAQICategory(aqi: number): string {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}
