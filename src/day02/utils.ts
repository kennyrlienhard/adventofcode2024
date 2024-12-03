import { getData } from '../data';

export async function loadData(trainingData = false): Promise<number[][]> {
  return (await getData(2, trainingData)).map((line) => line.split(' ').map(Number));
}
