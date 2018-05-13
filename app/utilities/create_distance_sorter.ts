import { getDistanceFromLatLonInKm } from "./distance_calculator";

export default gps => (a, b) => {
  const distance_from_a = getDistanceFromLatLonInKm(
    gps.latitude,
    gps.longitude,
    a.selectedLocation.lat,
    a.selectedLocation.lng
  );

  const distance_from_b = getDistanceFromLatLonInKm(
    gps.latitude,
    gps.longitude,
    b.selectedLocation.lat,
    b.selectedLocation.lng
  );

  return distance_from_a > distance_from_b ? 1 : -1;
};
