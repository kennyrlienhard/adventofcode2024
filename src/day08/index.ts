import { loadData } from './utils';

const locationParserOne =
  (grid: string[][], y: number, x: number) =>
  ([y2, x2]: [number, number]) => {
    const result = [];

    const newAntinodes = [
      [2 * y2 - y, 2 * x2 - x],
      [2 * y - y2, 2 * x - x2],
    ];

    newAntinodes.forEach(([y, x]) => {
      if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) return;
      result.push(`${y},${x}`);
    });

    return result;
  };

const locationParserTwo =
  (grid: string[][], y: number, x: number) =>
  ([y2, x2]: [number, number]) => {
    const result = [];

    const slopeTop = x2 - x;
    const slopeBottom = y2 - y;

    for (let Y = 0; Y < grid.length; Y += 1) {
      const dr = Y - y;
      const dc = (dr * slopeTop) / slopeBottom;
      const X = x + dc;
      if (X < 0 || X >= grid[y].length || X % 1 !== 0) continue;

      result.push(`${Y},${X}`);
    }

    return result;
  };

async function run(parser: (grid: string[][], y: number, x: number) => (location: [number, number]) => string[]) {
  const grid = await loadData();

  const antennas = new Map<string, [number, number][]>();
  const antinodes = new Set<string>();

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const char = grid[y][x];

      if (char === '.') continue;

      const antennaLocations = antennas.get(char) ?? [];

      antennaLocations.forEach((location) => {
        parser(grid, y, x)(location).forEach(antinodes.add, antinodes);
      });

      antennaLocations.push([y, x]);
      antennas.set(char, antennaLocations);
    }
  }

  return antinodes.size;
}

export default [() => run(locationParserOne), () => run(locationParserTwo)];
