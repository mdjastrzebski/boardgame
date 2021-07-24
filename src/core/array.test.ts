import { buildArray } from './array';

test('buildArray', () => {
  expect(buildArray(3, i => i)).toEqual([0, 1, 2]);
});