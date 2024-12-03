import { loadData } from './utils';

function isSave(report: number[]) {
  const check = report[0] > report[1] ? (a: number, b: number) => a > b : (a: number, b: number) => a < b;

  return report.slice(0, -1).every((a, i) => {
    const b = report[i + 1];
    const diff = Math.abs(a - b);
    return check(a, b) && diff >= 1 && diff <= 3;
  });
}

function isSaveWithProblemDampening(report: number[]) {
  if (isSave(report)) return true;

  for (let i = 0; i < report.length; i += 1) {
    const copy = [...report];
    copy.splice(i, 1);
    if (isSave(copy)) return true;
  }

  return false;
}

async function partOne() {
  return (await loadData()).filter(isSave).length;
}

async function partTwo() {
  return (await loadData()).filter(isSaveWithProblemDampening).length;
}

export default [partOne, partTwo];
