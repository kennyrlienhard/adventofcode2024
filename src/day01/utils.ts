import { getData } from '../data';

export async function loadData(trainingData = false): Promise<[number, number][]> {
  return (await getData(1, trainingData)).map((d) => {
    return d.replace(/\s+/g, ' ').split(' ').map(Number) as [number, number];
  });
}
