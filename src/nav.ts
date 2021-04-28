interface LAT_LONG {
  lat: string | number;
  long: string | number;
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

export function distance(
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

// const centre = () => {

// }
