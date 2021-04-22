import coords from '../src/coords';

describe("Create", ()=>{
    test("initial", ()=>{
        const position = new coords(`S43°38'19.39`, `W116°14'28.86"`)
       console.log(position.toDEC())
    })
})