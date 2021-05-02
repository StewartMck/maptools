# maptools


**WGS84** utility library to provide basic functions such as converting coordinates between different formats, calculating distance and finding the center point of a group of coordinates.

## Install

### Node.JS

```bash
npm install maptools --save
```

```javascript
const maptools = require('maptools');
```

### Web

```html
<script language="JavaScript" src="/maptools.js"></script>
```


> ## Accepted Input
>- Whitespace is acceptable
>- Negative values for Lat are assumed to be S
>- Negative values for Long are assumed to be W
>- Single digits in number format are acceptable
>- degree, minutes, and seconds signs may be included or ommitted
>### Degrees Minutes Seconds (DMS)
>| Latitude | Longitude |
>| :---| :--- |
>| Ndd°mm'ss.ss" | Wddd°mm's.ss" |
>| dd mm ' ss " S| dd mm ' s W |
>|-d mm ss| -d |
>### Decimal Degrees (DEC)
>| Latitude | Longitude |
>| :---| :--- |
>| -dd.ddddd | ddd.ddddd|
>| -d | d|
>### Degrees Decimal Minutes (DDM)
>| Latitude | Longitude |
>| :---| :--- |
>| dd°mm.mmmm' | Wddd°mm.mmmm' |
>| dd mm.mmmm S| dd mm |
>|-d mm.mmmm| -d |

## Conversion Functions
---
### `toDMS([lat, long])`
### `toDEC([lat, long], precision = 5)`
### `toDDM([lat, long])`

#### Params
`Even length array of lat and long pairs`

* `lat` – latitude in Accepted format, either string or number
* `long` – longitude in Accepted format, either string or number
* `precision` - <strong>toDEC only</strong> Optional number of decimal places, default is 5

#### Returns an Array of Objects
`[{
  "lat": "latitude",
  "long": "longitude"
}]`

* Latitude is of type string
* Longitude is of type string
 

#### Errors
| Input | Error |
| :---| :--- |
|Empty Array  | TypeError:  "One or more lat/long pairs invalid" |
|Odd length array  | TypeError:  "One or more lat/long pairs invalid" |
|Out of Range Lat  | TypeError:  "Invalid Range: Lat" |
|Out of Range Long  | TypeError:  "Invalid Range: Long" |


#### Examples

```javascript
const pointA = toDEC([`S43°38'19.39`, `W116°14'28.86"`])
// [{ lat: -43.63872, long: -116.24135 }]
const pointB = toDMS([-43.63872, -116.24135])
// [{ lat: S43°38'19.39", long: W116°14'28.86" }]
const pointC = toDDM([`32° 18.385' N`, `122° 36.875' W`])
// [{ lat: N32°18.385', long: W122°36.875' }]
```
---
## Map Functions
---
### `getDistance(points, format = "km", precision = 2)`
Uses the Harvesine Formula to calculate the distance between two pairs of coordinates. The spherical radius is calculated using the average latitude between the two points. The distance between points [A, B, C, D] is the sum of: (A + B) + (B + C) + (C + D). The unit of measurement is optional with the default as km. The precision is also option with the default as 2 decimal places. Precision must be used in combination with the format argument.
#### Params
`Array of at least 2 pairs of coordinates in object form`

* `points` - Array of {"lat": lat, "long": long} pairs
* `format` - unit of measurement for output, default is 'km'

    | Symbol  | Unit of Measurement |
    | :---| :--- |
    |m  | Meters |
    |km  | Kilometers |
    |nm  | Nautical miles |
    |mi  | Miles |
* `precision` - number of decimal places, default is 2. Must be used with format.

#### Returns an Object
`{"distance": distance, "format": format }`
* distance is of type number
* format is of type string

#### Example
```javascript
const points = toDEC([
    `N53°27'-18.85"`, `W113°32'-23.09"`,
    `N53°30'-14.91"`, `W113°23'-8.08"`,
    `N53°30'22.8"`, `W113°13'-28.44"`,
    `N53°35'-15.29"`, `W113°11'-8.45"`,
    `N53°35'1.61"`, `W112°60'-5.29"`,
    ]);
const distanceKM = getDistance(points);
// { distance: 42.96, format: "km" }
const distanceNM = getDistance(points, 'nm', 4);
// { distance: 23.1982, format: "nm" }

```
#### Errors
| Input | Error |
| :---| :--- |
|Less than 2 points  | TypeError:  "At least 2 points are needed to calculate the distance" |
|Invalid format symbol  | TypeError:  "Invalid output format" |

---

### `orderByDistance(origin, points, format)`

#### Params
`An origin point and array of coordinate pairs`

* `origin` – {"lat": lat, "long": long}
* `points` – Array of {"lat": lat, "long": long} pairs
* `format` - unit of measurement for output, default is 'km'

    | Symbol  | Unit of Measurement |
    | :---| :--- |
    |m  | Meters |
    |km  | Kilometers |
    |nm  | Nautical miles |
    |mi  | Miles |

#### Returns an Array of Objects
`{"distance": distance, "format": format }`
* distance is of type number
* format is of type string

#### Example
```javascript
const points = toDEC([
    `N53°27'-18.85"`, `W113°32'-23.09"`,
    `N53°30'-14.91"`, `W113°23'-8.08"`,
    `N53°30'22.8"`, `W113°13'-28.44"`,
    `N53°35'-15.29"`, `W113°11'-8.45"`,
    `N53°35'1.61"`, `W112°60'-5.29"`,
    ]);
const distanceKM = getDistance(points);
// { distance: 42.96, format: "km" }
const distanceNM = getDistance(points, 'nm', 4);
// { distance: 23.1982, format: "nm" }

```
#### Errors
| Input | Error |
| :---| :--- |
|Less than 2 points  | TypeError:  "At least 2 points are needed to calculate the distance" |
|Invalid format symbol  | TypeError:  "Invalid output format" |

---
### `centerPoint([lat, long, lat, long])`
### `getArea([lat, long, lat, long, lat, long])`

#### Params
`Even length array of lat and long pairs`

* `lat` – latitude in Accepted format, either string or number
* `long` – longitude in Accepted format, either string or number
* `precision` - <strong>toDEC only</strong> Optional number of decimal places, default is 5

#### Returns an Array of Objects
`[{
  "lat": "latitude",
  "long": "longitude"
}]`

* Latitude is of type string
* Longitude is of type string
 

#### Errors
| Input | Error |
| :---| :--- |
|Empty Array  | TypeError:  "One or more lat/long pairs invalid" |
|Odd length array  | TypeError:  "One or more lat/long pairs invalid" |
|Out of Range Lat  | TypeError:  "Invalid Range: Lat" |
|Out of Range Long  | TypeError:  "Invalid Range: Long" |


### Examples

```javascript
const pointA = toDEC([`S43°38'19.39`, `W116°14'28.86"`])
// [{ lat: -43.63872, long: -116.24135 }]
const pointB = toDMS([-43.63872, -116.24135])
// [{ lat: S43°38'19.39", long: W116°14'28.86" }]
const pointC = toDDM([`32° 18.385' N`, `122° 36.875' W`])
// [{ lat: N32°18.385', long: W122°36.875' }]
```


### GeoJSON

`NB!` Remember that GeoJSON stores coordinates in reversed order (`longitude`,
`latitude`) which means you have to reverse the order of the coordinates
returned from `dms2dec()`.

```
var geojson = {
  type: 'Point',
  coordinates: dms2dec(lat, latRef, lon, lonRef).reverse()
};
```

