import { WGS84, DISTANCE_FORMAT, LAT_LONG, DISTANCE } from "../libs/constants";
import { convertDeg, convertRad, convertToCartesian } from "../libs/helpers";

/**
 * Sums the distance between an array of lat/long pairs
 * @param lat_long Array of {"lat": lat, "long": long} in DEC format.
 * @param format  [format='km'] - Unit of measurement.
 * @param precision [precision=2] - Number of decimal places.
 * @returns Object {"distance": distance, "format": format}
 */
const getDistance = function (
  lat_long: Array<LAT_LONG>,
  format: string = "KM",
  precision: number = 2
) {
  if (!DISTANCE_FORMAT[<any>format.toUpperCase()]) {
    throw TypeError("Invalid output format");
  }

  if (lat_long.length < 2) {
    throw TypeError("At least 2 points are needed to calculate the distance");
  }

  const conversion = Number(DISTANCE_FORMAT[<any>format.toUpperCase()]);

  const distance = [];
  let index = 0;
  while (index < lat_long.length - 1) {
    const { lat: lat1, long: long1 } = lat_long[index];
    const { lat: lat2, long: long2 } = lat_long[index + 1];

    // eqR = equatorial Radius (km), pR = polar radius (km), radius = specific radius for avg lat
    const eqR = 6378.137;
    const pR = 6356.752;
    const avLat = convertRad((Number(lat1) + Number(lat2)) / 2);
    const radius = Math.sqrt(
      ((eqR ** 2 * Math.cos(avLat)) ** 2 + (pR ** 2 * Math.sin(avLat)) ** 2) /
        ((eqR * Math.cos(avLat)) ** 2 + (pR * Math.sin(avLat)) ** 2)
    );

    const phi1 = convertRad(Number(lat1));
    const phi2 = convertRad(Number(lat2));
    const delta_phi = convertRad(Number(lat2) - Number(lat1));
    const delta_lambda = convertRad(Number(long2) - Number(long1));
    const a =
      Math.pow(Math.sin(delta_phi / 2), 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(delta_lambda / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance.push(radius * c * conversion);
    index++;
  }

  const totalDistance = distance.reduce((acc, prev) => acc + prev, 0);

  return {
    distance: Number(totalDistance.toFixed(precision)),
    format: format.toLowerCase(),
  };
};

/**
 * Returns the center point of an array of lat/long pairs.
 * @param points Array of {"lat": lat, "long": long} in DEC format.
 * @returns Object {"lat": lat, "long": long} in DEC format.
 */
const getCenterPoint = function (points: Array<LAT_LONG>) {
  const numberPoints = points.length;
  const { b, a, feSq, seSq } = WGS84;

  // convert to cartesian coords
  const sum = points.reduce(
    (acc, point) => {
      const { X, Y, Z } = convertToCartesian(point);
      return {
        X: acc.X + X / numberPoints,
        Y: acc.Y + Y / numberPoints,
        Z: acc.Z + Z / numberPoints,
      };
    },
    { X: 0, Y: 0, Z: 0 }
  );

  //convert to geodetic coords (lat/long DEC Deg)
  const { X, Y, Z } = sum;

  const p = Math.sqrt(X ** 2 + Y ** 2); //distance from the polar axis to the point
  const R = Math.sqrt(p ** 2 + Z ** 2); //distance from the origin to the point

  // parametric latitude
  const tanβ = ((b * Z) / (a * p)) * (1 + (seSq * b) / R);
  const sinβ = tanβ / Math.sqrt(1 + tanβ ** 2);
  const cosβ = sinβ / tanβ;

  return {
    lat: convertDeg(
      Math.atan2(Z + seSq * b * sinβ ** 3, p - feSq * a * cosβ ** 3)
    ).toFixed(5),
    long: convertDeg(Math.atan2(Y, X)).toFixed(5),
  };
};

/**
 * Orders an array of lat/long pairs from nearest to farthest.
 * @param origin {"lat": lat, "long": long} pair in DEC format.
 * @param points Array of {"lat": lat, "long": long} pairs in DEC format.
 * @param format [format='km'] - Unit of measurement.
 * @returns Object {from: { "lat": lat, "long": long }, to: { "lat": lat, "long": long }, "distance": distance, "format": format }
 */
const orderByDistance = function (
  origin: LAT_LONG,
  points: Array<LAT_LONG>,
  format: string = "KM"
) {
  const distances: Array<DISTANCE> = [];
  points.map((point) => {
    const { distance } = getDistance([origin, point], format);
    distances.push({
      from: origin,
      to: point,
      distance: distance,
      format: format.toLowerCase(),
    });
  });

  return distances.sort((a, b) => a.distance - b.distance);
};

const getArea = function (lat_long: Array<LAT_LONG>) {
  //shoelace algo
  lat_long.push(lat_long[0]);

  const cart = lat_long.map((point) => convertToCartesian(point));

  let sum1 = 0;
  let sum2 = 0;

  cart.map((point, i, cart) => {
    if (cart[i + 1]) {
      const { X: lat1, Y: long1 } = point;
      const { X: lat2, Y: long2 } = cart[i + 1];
      sum1 += <number>lat1 * <number>long2;
      sum2 += <number>long1 * <number>lat2;
    }
  });
  console.log("sum1:", sum1, "sum2:", sum2);
  // const area = Math.abs(sum1 -sum2) / 2;
  const area = Math.abs(sum1 - sum2) / 2;
  console.log("area:", area);
};

export { getDistance, getArea, getCenterPoint, orderByDistance };
