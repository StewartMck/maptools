MapTools
Utility Library to provide functionality like calculating distance, coords conversions, etc.


Install
npm install geolib

Usage
There is a UMD build and an ES Module build. You can either use the UMD build in Node like any other library:

const geolib = require('geolib');
or in the browser by using a simple script element:

<script src="lib/geolib.js"></script>
If you load it in the browser, you can access all the functions via window.geolib.

If you're working with a bundler (like Webpack or Parcel) or have an environment that supports ES Modules natively, you can either import certain functions from the package directly:

import { getDistance } from 'geolib';
or load the whole library:

import * as geolib from 'geolib';
or you can import single functions directly to potentially make use of treeshaking (recommended):

import getDistance from 'geolib/es/getDistance';
General
This library is written in TypeScript. You don't have to know TypeScript to use Geolib but the type definitions give you valuable information about the general usage, input parameters etc.

Supported values and formats
All methods that are working with coordinates accept either an object with a lat/latitude and a lon/lng/longitude property, or a GeoJSON coordinates array, like: [lon, lat]. All values can be either in decimal (53.471) or sexagesimal (53° 21' 16") format.

Distance values are always floats and represent the distance in meters.

Functions
getDistance(start, end, accuracy = 1)
Calculates the distance between two geo coordinates.

This function takes up to 3 arguments. First 2 arguments must be valid GeolibInputCoordinates (e.g. {latitude: 52.518611, longitude: 13.408056}). Coordinates can be in sexagesimal or decimal format. The third argument is accuracy (in meters). By default the accuracy is 1 meter. If you need a more accurate result, you can set it to a lower value, e.g. to 0.01 for centimeter accuracy. You can set it higher to have the result rounded to the next value that is divisible by your chosen accuracy (e.g. 25428 with an accuracy of 100 becomes 25400).

getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
);
// Working with W3C Geolocation API
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(
            'You are ',
            geolib.getDistance(position.coords, {
                latitude: 51.525,
                longitude: 7.4575,
            }),
            'meters away from 51.525, 7.4575'
        );
    },
    () => {
        alert('Position could not be determined.');
    }
);
Returns the distance in meters as a numeric value.

getPreciseDistance(start, end[, int accuracy])