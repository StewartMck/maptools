import coords from '../src/coords';

describe("Check Valid Input", ()=>{
    
    test("Invalid Input", ()=>{
        expect(()=>{
            new coords('invalid', 'W116')
        }).toThrowError(TypeError('Invalid Input'))
    })

    test("Out of Range", () => {
        expect(()=>{
            new coords(`S43°38'19.39`, `W216°14'28.86"`)
        }).toThrowError(TypeError('Invalid Range: Long'))
    })

    test("Valid Input: DMS", () => {
        expect(new coords(`S43°38'19.39`, `W116°14'28.86"`)).toEqual({"lat": {"format": "DMS", "input": "S43°38'19.39", "signed": true, "value": [43, 38, 19.39]}, "long": {"format": "DMS", "input": "W116°14'28.86\"", "signed": true, "value": [116, 14, 28.86]}})
    })

    test("Valid Input: DEC", () => {
        expect(new coords( 'N38.959390°','-95.265483°')).toEqual({"lat": {"format": "DEC", "input": "N38.959390°", "signed": false, "value": [38.959390]}, "long": {"format": "DEC", "input": "-95.265483°", "signed": true, "value": [95.265483]}})
    })

    test("Valid Input: DDM", () => {
        expect(new coords( 'N38°57.5634','W95°15.92890')).toEqual({"lat": {"format": "DDM", "input": 'N38°57.5634', "signed": false, "value": [38, 57.5634]}, "long": {"format": "DDM", "input": 'W95°15.92890', "signed": true, "value": [95, 15.92890]}})
    })

  
})

describe("Conversions", ()=>{

    
    test("INPUT: DMS - OUTPUT: DEC", ()=>{
        const position = new coords(`S43°38'19.39`, `W116°14'28.86"`)
        expect(position.toDEC()).toEqual({lat: '-43.63872', long: '-116.24135'})
    })

    test("INPUT: DEC - OUTPUT: DEC", () => {
        const position = new coords('-43.63872', '-116.24135')
        expect(position.toDEC(2)).toEqual({lat: '-43.64', long: '-116.24'})
    })

    test("INPUT: DDM - OUTPUT: DEC", () => {
        const position = new coords(`32° 18.385' N`, `122° 36.875' W`)
        expect(position.toDEC()).toEqual({lat: '32.30642', long: '-122.61458'})
    })

    // test("INPUT: DDM, DEC - OUTPUT: ERROR", () => {
    //     const position = new coords(`32° 18.385' N`, `-122.61458`)
    //     expect(position.toDEC()).toThrowError(TypeError('Values are not of the same type'))
    // });

    test("INPUT: DEC - OUTPUT: DMS", () => {
        const position = new coords('-43.63872', '-116.24135')
        expect(position.toDMS()).toEqual({lat:`S43°38'19.39"`, long: `W116°14'28.86"` })
    })

    test("INPUT: DMS - OUTPUT: DMS", () => {
        const position = new coords(`S43°38'19.39`, `W116°14'28.86"`)
        expect(position.toDMS()).toEqual({lat:`S43°38'19.39"`, long: `W116°14'28.86"` })
    })

    test("INPUT: DDM - OUTPUT: DMS", () => {
        const position = new coords(`32° 18.385' N`, `122° 36.875' W`)
        expect(position.toDMS()).toEqual({lat:`N32°18'23.1"`, long: `W122°36'52.5"` })
    })
  
});