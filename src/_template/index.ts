import { loadData } from './utils';

async function partOne() {
  const data = await loadData(true);

  console.log(data);

  return 0;
}

async function partTwo() {
  const data = await loadData();
  return 0;
}

export default [partOne, partTwo];
