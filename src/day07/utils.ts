import { getData } from '../data';

export async function loadData(trainingData = false): Promise<[values: number[], sum: number][]> {
  return (await getData(7, trainingData)).map((line) => {
    const [sum, values] = line.split(': ');
    return [values.split(' ').map(Number), Number(sum)];
  });
}
