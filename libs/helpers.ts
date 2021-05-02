import { WGS84, LAT_LONG } from "./constants";

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

export { convertDeg, convertRad, convertToCartesian };
