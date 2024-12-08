import { getData } from '../data';

export type Position = [y: number, x: number];

export async function loadData(trainingData = false): Promise<[Position, string[][]]> {
  const map = (await getData(6, trainingData)).map((line) => line.split(''));

  for (let y = 0; y < map.length; y += 1) {
    if (map[y].includes('^')) {
      return [[y, map[y].indexOf('^')], map];
    }
  }

  return [[0, 0], map];
}
