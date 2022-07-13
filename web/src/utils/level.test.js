import {setLevel, setTier} from './Level'

describe("level functions", () => {

  test("setLevel function", () => {
       expect(setLevel(50)).toBe(1)
  });
  test("setTier function", () => {
    expect(setTier(1)).toBe('Servant')
  })
});
