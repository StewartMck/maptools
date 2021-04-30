import { getDistance, centerPoint, orderByDistance } from "../src/nav";
import COORDS from "../src/coords";

describe("Distance", () => {
  test("Invalid Input: Format", () => {
    expect(() => {
      getDistance(
        COORDS.batchDEC([
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
        COORDS.batchDEC([
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
    const coords = new COORDS(`N53° 26' 42.19"`, `W113° 31' 33.42"`).toDEC();
    expect(centerPoint([coords])).toEqual(coords);
  });

  test("Return middle point for array of coords", () => {
    expect(
      centerPoint(
        COORDS.batchDEC([
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
    expect(orderByDistance(COORDS.batchDEC([
      -21.0781885,
      130.2679653,
      -22.0304073,
      133.3797261,
      -20.1017191,
      133.3017134,
      -20.1017192,
      133.3017126,
    ]))).toEqual([
      {
        from: { lat: '-20.10172', long: '133.30171' },
        to: { lat: '-20.10172', long: '133.30171' },
        distance: 0
      },
      {
        from: { lat: '-22.03041', long: '133.37973' },
        to: { lat: '-20.10172', long: '133.30171' },
        distance: 214.76
      },
      {
        from: { lat: '-21.07819', long: '130.26797' },
        to: { lat: '-22.03041', long: '133.37973' },
        distance: 339
      }
    ])
  })
})
