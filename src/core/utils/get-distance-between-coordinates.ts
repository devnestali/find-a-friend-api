export interface CoordinateParams {
  latitude: number;
  longitude: number;
}

// "from" is the city that I'm trying to verify, e o "to" must be where this pet is in a rage of 10 kilometers

export function getDistanceBetweenCoordinates(
  from: CoordinateParams,
  to: CoordinateParams,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const fromRadian = (Math.PI * from.latitude) / 180;
  const toRadian = (Math.PI * to.latitude) / 180;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (dist > 1) {
    dist = 1;
  }

  const NAUTICAL_MILES_PER_DEGREE = 60;
  const MILES_PER_NAUTICAL_MILE = 1.1515;
  const KILOMETERS_PER_MILE = 1.609344;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * NAUTICAL_MILES_PER_DEGREE * MILES_PER_NAUTICAL_MILE;
  dist = dist * KILOMETERS_PER_MILE;

  return dist;
}
