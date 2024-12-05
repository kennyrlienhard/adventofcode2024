import { loadData, Rule, Update } from './utils';

function isValidUpdate(update: number[], rules: Rule[]): boolean {
  return update.every((value) => {
    const rulesBefore = rules.filter((r) => r[0] === value);
    const rulesAfter = rules.filter((r) => r[1] === value);

    return (
      rulesBefore.every(([a, b]) => update.indexOf(a) < update.indexOf(b) || update.indexOf(b) === -1) &&
      rulesAfter.every(([a, b]) => update.indexOf(b) > update.indexOf(a) || update.indexOf(a) === -1)
    );
  });
}

function reOrder(update: number[], rules: Rule[]): number[] {
  if (update.length <= 1) return [...update];

  const left = [] as Update;
  const right = [] as Update;

  const l = update[0];

  for (const r of update.slice(1)) {
    const invalidOrder = [r, l] as Rule;

    if (rules.some(([a, b]) => a === invalidOrder[0] && b === invalidOrder[1])) {
      left.push(r);
    } else {
      right.push(r);
    }
  }

  return [...reOrder(left, rules), l, ...reOrder(right, rules)];
}

async function partOne() {
  const [rules, updates] = await loadData();
  return updates.filter((u) => isValidUpdate(u, rules)).reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);
}

async function partTwo() {
  const [rules, updates] = await loadData();

  return updates
    .filter((u) => !isValidUpdate(u, rules))
    .map((update) => reOrder(update, rules))
    .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);
}

export default [partOne, partTwo];
