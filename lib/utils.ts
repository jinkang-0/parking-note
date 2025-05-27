import { Platform } from "react-native";

/**
 * Calculates the distance between two points on the Earth using the Haversine formula.
 *
 * @param lon1 Longtitude of point A
 * @param lat1 Latitude of point A
 * @param lon2 Longtitude of point B
 * @param lat2 Latitude of point B
 * @returns The distance in meters between the two points.
 */
export const distanceLonLatMiles = (
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
) => {
  const r = 3958.8; // Radius of the Earth in miles

  const p1 = lat1 * (Math.PI / 180);
  const p2 = lat2 * (Math.PI / 180);
  const dp = ((lat2 - lat1) * (Math.PI / 180)) / 2;
  const dl = ((lon2 - lon1) * (Math.PI / 180)) / 2;

  const a =
    Math.sin(dp) * Math.sin(dp) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dl) * Math.sin(dl);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = r * c; // Distance in miles
  return distance;
};

/**
 * Formats a date to a human-readable string indicating how long ago it was.
 *
 * @param date The date to format
 * @returns A string representing the time elapsed since the date, e.g., "2 days ago", "5 minutes ago", etc.
 */
export const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

/**
 * Converts meters to feet.
 * @param meters
 */
export const metersToFeet = (meters: number) => {
  return meters * 3.28084; // Convert meters to feet
};

/**
 * Gets a link to open a map application with the specified coordinates.
 * @param latitude
 * @param longitude
 * @returns A URL string without the protocol
 */
export const getMapLink = (latitude: number, longitude: number) => {
  if (Platform.OS === "ios") {
    return `maps.apple.com/?daddr=${latitude},${longitude}`;
  }
  return `www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
};
