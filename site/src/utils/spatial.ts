export interface Coordinates {
  lng: number;
  lat: number;
}

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function getBounds(coords: Coordinates[]): Bounds {
  if (coords.length === 0) {
    return { north: 0, south: 0, east: 0, west: 0 };
  }
  const lats = coords.map((c) => c.lat);
  const lngs = coords.map((c) => c.lng);
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
}

export function getCenter(bounds: Bounds): Coordinates {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };
}

export function calculateZoom(bounds: Bounds): number {
  const latRange = bounds.north - bounds.south;
  const lngRange = bounds.east - bounds.west;
  const maxRange = Math.max(latRange, lngRange);
  if (maxRange > 50) return 4;
  if (maxRange > 20) return 5;
  if (maxRange > 5) return 7;
  if (maxRange > 1) return 9;
  if (maxRange > 0.5) return 11;
  if (maxRange > 0.1) return 13;
  return 15;
}
