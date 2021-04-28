import {distance} from '../src/nav';
import COORDS from '../src/coords';

describe("Distance", ()=>{

    test("Invalid Input: Format", () => {
        expect(() => {
            distance(COORDS.batchDEC([`N53° 26' 42.19"`, `W113° 31' 33.42"`, `N53° 35' 1.61"`, `w112° 59' 54.72"`]), 'invalid')
        }).toThrowError(TypeError("Invalid output format"))
    })

    test("Invalid Input: Less than 2 points", () => {
        expect(()=>{
            distance([{lat: 53.507788383961426, long: -113.31885708984761}])
        }).toThrowError(TypeError("At least 2 points are needed to calculate the distance"))
    })
   
    test("Valid Input: Batch DEC", () => {
        expect(distance(COORDS.batchDEC([
            `N53°27'-18.85"`, `W113°32'-23.09"`, 
            `N53°30'-14.91"`, `W113°23'-8.08"`,
            `N53°30'22.8"`, `W113°13'-28.44"`,
             `N53°35'-15.29"`, `W113°11'-8.45"`,
            `N53°35'1.61"`, `W112°60'-5.29"`
          ]), "km")).toEqual({distance: 43.01 , format: 'km'})
    })
 
    test("Valid Input: User Provided", () => {
        expect(distance( [
            { lat: 53.50779, long: -113.31886 },
            { lat: '53.53448', long: '-113.25277' }
          ])).toEqual({distance: 5.28, format: 'km'})
    })


})
