import { getData } from '../data';

export type Rule = [number, number];

export type Update = number[];

export async function loadData(trainingData = false): Promise<[rules: Rule[], updates: Update[]]> {
  let parsingRules = true;

  const rules: Rule[] = [];
  const updates: Update[] = [];

  for (const line of await getData(5, trainingData)) {
    if (line === '') {
      parsingRules = false;
      continue;
    }

    if (parsingRules) {
      rules.push(line.split('|').map(Number) as Rule);
    } else {
      updates.push(line.split(',').map(Number));
    }
  }

  return [rules, updates];
}
