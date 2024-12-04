import { getData } from '../data';

async function getLines(): Promise<string[]> {
  const result = [] as string[];

  const data = await getData(4);

  // horizontal lines
  for (let i = 0; i < data.length; i += 1) {
    result.push(data[i]);
  }

  // vertical lines
  for (let i = 0; i < data[0].length; i += 1) {
    let line = '';
    for (let j = 0; j < data.length; j += 1) line += data[j][i];

    result.push(line);
  }

  // diagonal lines, part one
  for (let start = 0; start < data.length; start += 1) {
    let line = '';
    let i = start;
    let j = 0;

    while (data[i]?.[j]) {
      line += data[i][j];
      i += 1;
      j += 1;
    }

    result.push(line);
  }

  // diagonal lines, part two
  for (let start = 1; start < data[0].length; start += 1) {
    let line = '';
    let i = start;
    let j = 0;

    while (data[j]?.[i]) {
      line += data[j][i];
      i += 1;
      j += 1;
    }

    result.push(line);
  }

  // inverted diagonal lines, part one
  for (let start = 0; start < data.length; start += 1) {
    let line = '';
    let i = start;
    let j = 0;

    while (data[i]?.[j]) {
      line = `${data[i][j]}${line}`;
      i -= 1;
      j += 1;
    }

    result.push(line);
  }

  // inverted diagonal lines, part two
  for (let start = 1; start < data.length; start += 1) {
    let line = '';
    let i = start;
    let j = data.length - 1;

    while (data[i]?.[j]) {
      line += data[i][j];
      i += 1;
      j -= 1;
    }

    result.push(line);
  }

  return result;
}

async function partOne() {
  const countMatches = (line: string) => (line.match(/XMAS/g)?.length || 0) + (line.match(/SAMX/g)?.length || 0);
  return (await getLines()).reduce((acc, line) => acc + countMatches(line), 0);
}

async function partTwo() {
  let result = 0;

  const data = await getData(4);

  const isValid = (line: string) => (line.match(/MAS/g)?.length || 0) + (line.match(/SAM/g)?.length || 0) > 0;

  const isX = (line: string, i: number, j: number) => {
    if (!isValid(line)) return false;
    return isValid(`${data[i][j + 2]}${data[i + 1]?.[j + 1]}${data[i + 2]?.[j]}`);
  };

  for (let start = 0; start < data.length; start += 1) {
    let line = '';
    let i = start;
    let j = 0;

    while (data[i]?.[j]) {
      line += data[i][j];
      if (isX(line, i - 2, j - 2)) result += 1;
      if (line.length === 3) line = line.slice(1);

      i += 1;
      j += 1;
    }
  }

  for (let start = 1; start < data[0].length; start += 1) {
    let line = '';
    let i = 0;
    let j = start;

    while (data[i]?.[j]) {
      line += data[i][j];

      if (isX(line, i - 2, j - 2)) result += 1;
      if (line.length === 3) line = line.slice(1);

      i += 1;
      j += 1;
    }
  }

  return result;
}

export default [partOne, partTwo];
