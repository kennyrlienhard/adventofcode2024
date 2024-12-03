import { getData } from '../data';

function multiply(instruction: string, withEnabler = false): number {
  const REGEX = /mul\((\d+),(\d+)\)/;

  let result = 0;
  let enabled = true;

  let match = null;

  while ((match = REGEX.exec(instruction)) !== null) {
    if (withEnabler) {
      const doIndex = instruction.indexOf('do()');
      const dontIndex = instruction.indexOf("don't()");

      if (doIndex !== -1 && doIndex < match.index && (dontIndex === -1 || doIndex < dontIndex)) {
        enabled = true;
      } else if (dontIndex !== -1 && dontIndex < match.index && (doIndex === -1 || dontIndex < doIndex)) {
        enabled = false;
      }
    }

    if (enabled) result += Number(match[1]) * Number(match[2]);
    instruction = instruction.slice(match.index + match[0].length);
  }

  return result;
}

async function partOne() {
  return (await getData(3)).reduce((acc, instruction) => acc + multiply(instruction), 0);
}

async function partTwo() {
  return (await getData(3)).reduce((acc, instruction) => acc + multiply(instruction, true), 0);
}

export default [partOne, partTwo];
