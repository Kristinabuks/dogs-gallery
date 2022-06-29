import { buildColumn } from "./buildColumn";

// TODO: учитывать размер окна
test("split into 5 arrays", () => {
  expect(buildColumn([1, 2, 3, 4, 5, 6])).toEqual([[1, 6], [2], [3], [4], [5]]);
});
