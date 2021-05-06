# maptools

Maptools is a **WGS84** map utility library.
Its core functionality is to convert between DMS, DEC and DDM coordinate formats. Given a group of coordinates it can calculate distance, order by distance, and find the center point.

## Install

### Node.JS

```bash
npm install @stewartmac/maptools --save
```

```javascript
const maptools = require('maptools');
```

```javascript
import {toDEC, toDMS, toDDM, getDistance, orderByDistance, getCenterPoint } from 'maptools';
```

### Web
All functions can be accessed via window.MapTools

```html
<script language="JavaScript" src="/dist/maptools.js"></script>
<script>
  window.Maptools.toDEC([`S43°38'19.39`, `W116°14'28.86"`])
</script>
```


> ## Accepted Input
>- Whitespace is acceptable in Latitude and Longitude
>- Negative values for Latitude are assumed to be S
>- Negative values for Longitude are assumed to be W
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

<br>

---

## Conversion Functions

---

>Accepts an array of strings or numbers as per the accepted format. Returns an object with the converted latitude and longitude pair(s).
### `toDMS([lat, long])`
### `toDEC([lat, long], precision = 5)`
### `toDDM([lat, long])`

#### Params
`Even length array of lat and long pairs`

* `lat` – latitude in Accepted format, either string or number
* `long` – longitude in Accepted format, either string or number
* `precision` - <strong>toDEC only</strong> - Optional number of decimal places, default is 5

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

<br>

---

## Map Functions

---

### `getDistance(points, format = "km", precision = 2)`
>Uses the Harvesine Formula to calculate the distance between two pairs of coordinates. The spherical radius is calculated using the average latitude between the two points. The distance between points [A, B, C, D] is the sum of: (A + B) + (B + C) + (C + D). The unit of measurement is optional with the default as km. The precision is also option with the default as 2 decimal places. Precision must be used in combination with the format argument.
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
* `precision` - number of decimal places, default is 2. Must be used in combination with format.

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

### `orderByDistance(origin, points, format = "km")`
>Accepts an origin point of {"lat": lat, "long": long} type and an array of {"lat": lat, "long": long} objects. Returns an array of objects ordered from nearest to farthest. Iterates over the array and uses the getDistance() function under the hood.

#### Params
`An origin point and array of coordinate pairs`

* `origin` – {"lat": lat, "long": long} pair in DEC format
* `points` – Array of {"lat": lat, "long": long} pairs in DEC format
* `format` - unit of measurement for output, default is 'km'

    | Symbol  | Unit of Measurement |
    | :---| :--- |
    |m  | Meters |
    |km  | Kilometers |
    |nm  | Nautical miles |
    |mi  | Miles |

#### Returns an Array of Objects
`{from: { "lat": lat, "long": long },
        to: { "lat": lat, "long": long },
        "distance": distance,
        "format": format }`
* from is a { "lat": lat, "long": long } object
* to is a { "lat": lat, "long": long } object
* distance is of type number
* format is of type string

#### Example
```javascript
const points = orderByDistance(
  {lat: 56.495000228117775, long:-88.26338679703304}, 
  toDEC([
      61.46659628870247, -93.86230787510061,
      63.32600658563838, -85.55269557039314,
      60.26988668328659, -77.2462962114008,
      55.46098932075369, -77.3115710914306,     
    ])
/* [
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304},
        to: { lat: '61.46660', long: '-93.86231' },
        distance: 637.8,
        format: 'km'
      },
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304},
        to: { lat: '55.46099', long: '-77.31157' },
        distance: 689.41,
        format: 'km'
      },
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304},
        to: { lat: '60.26989', long: '-77.24630' },
        distance: 764.76,
        format: 'km'
},
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304},
        to: { lat: '63.32601', long: '-85.55270' },
        distance: 773.21,
        format: 'km'
      },
    ]
*/
```
#### Errors
| Input | Error |
| :---| :--- |
|Missing Parameters  | TypeError:  "Input parameters missing" |
|Less than 2 points  | TypeError:  "At least 2 points are needed to calculate the distance" |
|Invalid format symbol  | TypeError:  "Invalid output format" |

---

### `getCenterPoint(points)`
>Accepts an array of {"lat": lat, "long": long} objects. Iterates over the array, converting the pairs of Geodetic coordinates into their respective Cartesian coordinates. The height is assumed to be 0. Sums and averages to find the center point. 
#### Params
`Array of pairs of coordinates in object form`
* `points` - Array of {"lat": lat, "long": long} pairs

#### Returns an Object
`{"lat": lat, "long": long }`
* Latitude is of type string in DEC format
* Longitude is of type string in DEC format

#### Example
```javascript
const center = getCenterPoint(
       toDEC([
          -21.0781885,
          130.2679653,
          -22.0304073,
          133.3797261,
          -20.1017191,
          133.3017134,
          -20.1017192,
          133.3017126,
        ])
// { lat: "-20.83315", long: "132.56395" }
```

#### Errors
| Input | Error |
| :---| :--- |
|Missing Parameters  | TypeError:  "Input parameters missing" |
---

<br>

---

## Errors

---
Errors can be handled with a try-catch block.

```javascript
try {
  const distanceKM = getDistance({lat: -43.63872, long: -116.24135});
} catch (e) {
  console.log(e.message)
}
// "At least 2 points are needed to calculate the distance"
```