import { DiceSet } from '../Dice';

test('count', () => {
  expect(DiceSet.empty.count).toEqual(0);

  const set1 = new DiceSet({ red: 2, blue: 1, black: 1 });
  expect(set1.count).toEqual(4);

  const set2 = new DiceSet({ red: 2, blue: 1, joker: 3 });
  expect(set2.count).toEqual(6);
});

test('getCountInColorOrJoker', () => {
  expect(DiceSet.empty.getCountInColorOrJoker('red')).toEqual(0);
  expect(DiceSet.empty.getCountInColorOrJoker('yellow')).toEqual(0);
  expect(DiceSet.empty.getCountInColorOrJoker('green')).toEqual(0);
  expect(DiceSet.empty.getCountInColorOrJoker('blue')).toEqual(0);
  expect(DiceSet.empty.getCountInColorOrJoker('black')).toEqual(0);

  const set1 = new DiceSet({ red: 2, blue: 1, black: 1 });
  expect(set1.getCountInColorOrJoker('red')).toEqual(2);
  expect(set1.getCountInColorOrJoker('yellow')).toEqual(0);
  expect(set1.getCountInColorOrJoker('green')).toEqual(0);
  expect(set1.getCountInColorOrJoker('blue')).toEqual(1);
  expect(set1.getCountInColorOrJoker('black')).toEqual(1);

  const set2 = new DiceSet({ red: 2, blue: 1, joker: 1 });
  expect(set2.getCountInColorOrJoker('red')).toEqual(3);
  expect(set2.getCountInColorOrJoker('yellow')).toEqual(1);
  expect(set2.getCountInColorOrJoker('green')).toEqual(1);
  expect(set2.getCountInColorOrJoker('blue')).toEqual(2);
  expect(set2.getCountInColorOrJoker('black')).toEqual(1);
});
