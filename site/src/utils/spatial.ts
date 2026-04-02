/**
 * Spatial utilities for coordinate formatting and conversion.
 */

/**
 * Format coordinates for display (lat, lon)
 * @param lat Latitude
 * @param lon Longitude
 * @returns Formatted coordinate string
 */
export function formatCoords(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(6)}° ${latDir}, ${Math.abs(lon).toFixed(6)}° ${lonDir}`;
}
