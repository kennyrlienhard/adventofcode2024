import { loadData } from './utils';

async function partOne() {
  const data = await loadData();

  const a = data.map((d) => d[0]).sort((a, b) => a - b);
  const b = data.map((d) => d[1]).sort((a, b) => a - b);

  return a.reduce((acc, n, i) => acc + Math.abs(n - b[i]), 0);
}

async function partTwo() {
  const data = await loadData();

  const a = data.map((d) => d[0]);
  const b = data.map((d) => d[1]);

  return a.reduce((acc, value) => acc + value * b.filter((n) => n === value).length, 0);
}

export default [partOne, partTwo];
