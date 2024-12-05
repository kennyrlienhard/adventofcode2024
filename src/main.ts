import day01 from './day01';
import day02 from './day02';
import day03 from './day03';
import day04 from './day04';
import day05 from './day05';

const PUZZLES = [day01, day02, day03, day04, day05];

const DAYS_TO_SOLVE = [PUZZLES.length];

type Result = { day: number; part: number; start: Date; end: Date; value: number };

function printResult(result: Result) {
  console.log(`Day ${('0' + result.day).slice(-2)}. Part ${result.part}: ${result.value}`);
  console.log(`Executed in ${(result.end.getTime() - result.start.getTime()) / 1000}s`);
  console.log();
}

async function solvePuzzlesForDays() {
  const result = (
    await Promise.all(
      DAYS_TO_SOLVE.map((day) =>
        Promise.all(
          PUZZLES[day - 1].map(async (p, i) => {
            const start = new Date();
            const value = await p();
            return { day, part: i + 1, start, end: new Date(), value };
          })
        )
      )
    )
  ).flat();

  result.forEach(printResult);
}

solvePuzzlesForDays();
