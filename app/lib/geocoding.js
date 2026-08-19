// Wraps the Google Geocoding API — same service used on every signup form
// with an address field (client, both pharmacist modes, delivery agent)
// to turn the typed address into coordinates before it's sent to
// create_profile / the pharmacy insert.
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function geocodeAddress(address) {
  if (!address?.trim() || !GOOGLE_MAPS_API_KEY) return null;

  const params = new URLSearchParams({
    address,
    key: GOOGLE_MAPS_API_KEY,
    region: "cm", // bias toward Cameroon
  });

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
    const data = await response.json();
    if (data.status !== "OK" || !data.results?.length) return null;

    const first = data.results[0];
    return {
      lat: first.geometry.location.lat,
      lng: first.geometry.location.lng,
      formattedAddress: first.formatted_address,
    };
  } catch (e) {
    console.warn("Geocoding failed:", e.message);
    return null;
  }
}
