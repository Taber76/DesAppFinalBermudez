const MAPS_API_KEY = "AIzaSyAHoSdn6r38ii5ZFewMjFPwjuRZkFfPX9s";
export const URL_MAPS = (lat, lng, zoom = 14) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${MAPS_API_KEY}`;

export const URL_GEOCODING = (lat, lng) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`;
