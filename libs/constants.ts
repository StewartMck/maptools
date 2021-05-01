export enum VALID_RANGE {
  LAT_MIN = -90.0,
  LAT_MAX = 90.0,
  LONG_MIN = -180.0,
  LONG_MAX = 180.0,
}

export enum FORMAT {
  DMS = "DMS",
  DEC = "DEC",
  DDM = "DDM",
}

export const FORMAT_INPUT = /([^NnEeSsWw\s'\u00B0])\d+(\.\d+)*/g;

export const MATCH_BEHIND_DECIMAL = /[^\.]\d+(\.\d+)*/g;

export enum TYPE {
  LAT = "LAT",
  LONG = "LONG",
}

export enum WGS84 {
  a = 6378137,
  b = 6356752.314245,
  f = 1 - b / a,
  feSq = 2 * f - f * f,
  seSq = feSq / (1 - feSq),
}

export enum DISTANCE_FORMAT {
  KM = 1,
  M = 1000,
  NM = 0.5399568,
  MI = 0.62137119,
}
