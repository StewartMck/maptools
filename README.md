# maptools


WGS84 Library to provide basic functions such as converting coordinates between different formats, calculating distance and finding the center point.

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

## Usage

[`latDec`, `lonDec`] = dms2dec(String `lat`, String `latRef`, String `lon`, String `lonRef`);

#### Params

* `lat` – latitude in "degrees, minutes, seconds" format
* `lagRef` – latitude hemisphere reference (N or S)
* `lon` – longitude in "degrees, minutes, seconds" format
* `lonRef` – longitude hemisphere reference (E or W)

#### Return

* `latDec` – latitude converted into decimal format
* `lonDec` – longitude converted into decimal format

### Parse dms strings

```javascript
var dec = dms2dec("60/1, 21/1, 4045/100", "N", "5/1, 22/1, 1555/100", "E");
// dec[0] == 60.36123611111111, dec[1] == 5.370986111111111

// without spaces or commas in the dms strings are also supported
var dec = dms2dec("60/1,21/1,4045/100", "N", "5/1,22/1,1555/100", "E");
var dec = dms2dec("60/1 21/1 4045/100", "N", "5/1 22/1 1555/100", "E");
```

### Parse dms arrays

```javascript
var dec = dms2dec(["60/1", "21/1", "4045/100"], "N", ["5/1", "22/1", "1555/100"], "E");
// dec[0] == 60.36123611111111, dec[1] == 5.370986111111111
```

#### dms arrays as decimal

```javascript
var dec = dms2dec([60, 21, 40.45], "N", [5, 22, 15.55], "E");
// dec[0] == 60.36123611111111, dec[1] == 5.370986111111111
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

