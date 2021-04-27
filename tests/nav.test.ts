import {distance} from '../src/nav';
import COORDS from '../src/coords';

describe("Distance", ()=>{
   
    test("Invalid Format Input", () => {
        distance(COORDS.batchDEC([53.507788383961426, -113.31885708984761, 53.53448404821897, -113.25276944601737]), "KM");
    })
})
