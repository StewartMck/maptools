import coords from '../src/coords';

describe("Create", ()=>{
    test("initial", ()=>{
        const position = new coords(`asd"`, `W116°14'28.86"`)
        position.read();
    })
})