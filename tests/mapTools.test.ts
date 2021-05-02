import { getDistance, getCenterPoint, orderByDistance, getArea } from '../src/index'
import {toDEC} from '../src/index'

describe("Distance", () => {
  test("Invalid Input: Format", () => {
    expect(() => {
      getDistance(
        toDEC([
          `N53° 26' 42.19"`,
          `W113° 31' 33.42"`,
          `N53° 35' 1.61"`,
          `w112° 59' 54.72"`,
        ]),
        "invalid"
      );
    }).toThrowError(TypeError("Invalid output format"));
  });

  test("Invalid Input: Less than 2 points", () => {
    expect(() => {
      getDistance([{ lat: 53.507788383961426, long: -113.31885708984761 }]);
    }).toThrowError(
      TypeError("At least 2 points are needed to calculate the distance")
    );
  });

  test("Valid Input: Batch DEC", () => {
    expect(
      getDistance(
        toDEC([
          `N53°27'-18.85"`,
          `W113°32'-23.09"`,
          `N53°30'-14.91"`,
          `W113°23'-8.08"`,
          `N53°30'22.8"`,
          `W113°13'-28.44"`,
          `N53°35'-15.29"`,
          `W113°11'-8.45"`,
          `N53°35'1.61"`,
          `W112°60'-5.29"`,
        ]),
        "km"
      )
    ).toEqual({ distance: 42.96, format: "km" });
  });

  test("Valid Input: User Provided", () => {
    expect(
      getDistance(
        [
          { lat: 53.50768960437428, long: -113.30924577376084 },
          { lat: "53.53381699129032", long: "-113.23731415008545" },
        ],
        "nm",
        4
      )
    ).toEqual({ distance: 3.0058, format: "nm" });
  });
});

describe("Center of Points", () => {
  test("Return same coords for single pair", () => {
    const coords = toDEC([`N53° 26' 42.19"`, `W113° 31' 33.42"`]);
    expect(getCenterPoint(coords)).toEqual(coords[0]);
  });

  test("Return middle point for array of coords", () => {
    expect(
      getCenterPoint(
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
      )
    ).toEqual({ lat: "-20.83315", long: "132.56395" });
  });
});

describe("Order By Distance", () => {
  test("Valid Input", () => {
    expect(orderByDistance({lat: 56.495000228117775, long:-88.26338679703304}, toDEC([
      61.46659628870247, -93.86230787510061,
      63.32600658563838, -85.55269557039314,
      60.26988668328659, -77.2462962114008,
      55.46098932075369, -77.3115710914306,     
    ]))).toEqual([
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304 },
        to: { lat: '61.46660', long: '-93.86231' },
        distance: 637.8,
        format: 'km'
      },
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304 },
        to: { lat: '55.46099', long: '-77.31157' },
        distance: 689.41,
        format: 'km'
      },
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304 },
        to: { lat: '60.26989', long: '-77.24630' },
        distance: 764.76,
        format: 'km'
      },
      {
        from: { lat: 56.495000228117775, long: -88.26338679703304 },
        to: { lat: '63.32601', long: '-85.55270' },
        distance: 773.21,
        format: 'km'
      },
    ])
  })
})

describe("Calculate Area from Coordinates", () => {
  test("test1", () => {
   const coords = toDEC([
     -30.755695508016164,139.58931179712357,
    -31.026745675780326,139.67720242212357,
    -30.929020409557967,139.9243948049360,
    -30.563139898321857,140.02052517602982,
    -30.500447229869152,139.79530544946732,
    ])
      console.log('area:', getArea(coords))
  })
})
