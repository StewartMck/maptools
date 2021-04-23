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
        }).toThrowError
    })

    test("Valid Input: DMS", () => {
        expect(new coords(`S43°38'19.39`, `W116°14'28.86"`)).toEqual({lat: ['-43', '38', '19.39'], long: ['-116', '14', '28.86']})
    })

    test("Valid Input: DEC", () => {
        expect(new coords( 'N38.959390°','-95.265483°')).toEqual({lat: ['38.959390'], long: ['-95.265483']})
    })

  
})

describe("Conversions", ()=>{

    
    test("INPUT: DMS - OUTPUT: DEC", ()=>{
        const position = new coords(`S43°38'19.39`, `W116°14'28.86"`)
        expect(position.toDEC(5)).toEqual({lat: '-43.63872', long: '-116.24135'})
    })

    test("INPUT: DEC - OUTPUT: DEC", () => {
        const position = new coords('-43.63872', '-116.24135')
        expect(position.toDEC(5)).toEqual({lat: '-43.63872', long: '-116.24135'})
    })


});