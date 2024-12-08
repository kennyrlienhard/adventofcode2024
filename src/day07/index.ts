import { loadData } from './utils';

async function run(withConcatenation = false) {
  const data = await loadData();

  const findSum = (values: number[], test: number, tmp: number): number => {
    if (!values.length) return test === tmp ? test : 0;
    return (
      (withConcatenation && findSum(values.slice(1), test, Number(`${tmp}${values[0]}`))) ||
      findSum(values.slice(1), test, tmp + values[0]) ||
      findSum(values.slice(1), test, tmp * values[0])
    );
  };

  return data.reduce((acc, [values, sum]) => acc + findSum(values.slice(1), sum, values[0]), 0);
}

export default [() => run(), () => run(true)];
