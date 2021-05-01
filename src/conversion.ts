import COORDS from "./coords";
import { FORMAT } from "../libs/constants";

/**
 * Converts an array of numbers | strings that represent Latitude & Longitude to Decimal Degrees
 * @param input Must be even number of elements in the array.
 * @returns [{lat: 'dd.ddddd', long: 'dd.ddddd'}]
 */
const toDEC = function (input: Array<string | number>) {
  return COORDS.convertBatch(input, FORMAT.DEC);
};

/**
 * Converts an array of numbers | strings that represent Latitude & Longitude to Degree Minutes Seconds
 * @param input Must be even number of elements in the array.
 * @returns [{lat: '<N|S>dd°mm'ss.ss"', long: '<W|E>ddd°mm'ss.ss"'}]
 */
const toDMS = function (input: Array<string | number>) {
  return COORDS.convertBatch(input, FORMAT.DMS);
};

/**
 * Converts an array of numbers | strings that represent Latitude & Longitude to Degree Decimal Minutes
 * @param input Must be even number of elements in the array.
 * @returns [{lat: '<N|S>dd°mm'ss.ss"', long: '<W|E>ddd°mm'ss.ss"'}]
 */
const toDDM = function (input: Array<string | number>) {
  return COORDS.convertBatch(input, FORMAT.DDM);
};

export { toDEC, toDMS, toDDM };
