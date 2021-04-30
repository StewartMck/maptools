import { WGS84 } from "../libs/constants";

interface LAT_LONG {
  lat: string | number;
  long: string | number;
}

interface DISTANCE {
  from: LAT_LONG;
  to: LAT_LONG;
  distance: number;
}

enum DISTANCE_FORMAT {
  KM = 1,
  M = 1000,
  NM = 0.5399568,
  Mi = 0.62137119,
}

const convertRad = (value: number) => {
  return value * (Math.PI / 180);
};

const convertDeg = (value: number) => {
  return value * (180 / Math.PI);
};

const convertToCartesian = ({ lat, long }: LAT_LONG) => {
  const { a, feSq } = WGS84;

  const sinLat = Math.sin(convertRad(<number>lat));
  const sinLong = Math.sin(convertRad(<number>long));
  const cosLat = Math.cos(convertRad(<number>lat));
  const cosLong = Math.cos(convertRad(<number>long));

  const h = 0;
  const v = a / Math.sqrt(1 - feSq * sinLat * sinLat);

  const X = (v + h) * cosLat * cosLong;
  const Y = (v + h) * cosLat * sinLong;
  const Z = (v * (1 - feSq) + h) * sinLat;

  return { X, Y, Z };
};

export function getDistance(
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
}

export function centerPoint(points: Array<LAT_LONG>) {
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
}

export function orderByDistance(lat_long: Array<LAT_LONG>,
  format: string = "KM",){
    const distances: Array<DISTANCE> = []
    let index = 0;
    while (index < lat_long.length - 1) {
      const {distance} = getDistance([lat_long[index], lat_long[index + 1]], format)
      distances.push({
        from: lat_long[index],
        to: lat_long[index + 1],
        distance: distance,
      })
      index++
    }
    return distances.sort((a,b) =>
      a.distance - b.distance);
}
