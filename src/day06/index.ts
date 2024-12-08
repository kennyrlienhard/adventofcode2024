import { loadData, Position } from './utils';

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

const MOVE = {
  [Direction.Up]: ([y, x]: Position): Position => [y - 1, x],
  [Direction.Right]: ([y, x]: Position): Position => [y, x + 1],
  [Direction.Down]: ([y, x]: Position): Position => [y + 1, x],
  [Direction.Left]: ([y, x]: Position): Position => [y, x - 1],
};

const TURN = {
  [Direction.Up]: Direction.Right,
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
};

function positionIsInGrid([y, x]: Position, grid: string[][]): boolean {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
}

function getVisitedPositions(start: Position, grid: string[][]): Set<string> {
  const visited = new Set<string>();

  let direction: Direction = Direction.Up;
  let position: Position = [...start];

  while (positionIsInGrid(position, grid)) {
    if (!visited.has(position.join(','))) visited.add(position.join(','));

    const nextPosition = MOVE[direction](position);
    const isBlocked = grid[nextPosition[0]]?.[nextPosition[1]] === '#';

    if (isBlocked) direction = TURN[direction];
    else position = nextPosition;
  }

  return visited;
}

async function partOne() {
  const [start, grid] = await loadData();

  return getVisitedPositions(start, grid).size;
}

async function partTwo() {
  const [start, grid] = await loadData();

  const startDirection: Direction = Direction.Up;
  const visited = getVisitedPositions(start, grid);

  let result = 0;

  const loops = (obstruction: Position) => {
    const gridCopy = grid.map((e) => [...e]);
    gridCopy[obstruction[0]][obstruction[1]] = '#';

    let position: Position = [...start];
    let direction = startDirection;

    const visited = new Set();

    while (true) {
      const state = [...position, ...MOVE[direction](position)].join(',');
      if (visited.has(state)) return true;

      visited.add(state);

      const nextpos = MOVE[direction](position);

      if (!positionIsInGrid(nextpos, grid)) return false;

      if (gridCopy[nextpos[0]][nextpos[1]] == '#') {
        direction += 1;
        direction %= 4;
      } else {
        position = [nextpos[0], nextpos[1]];
      }
    }
  };

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[0].length; j += 1) {
      const key = `${i},${j}`;
      if (!visited.has(`${i},${j}`) || grid[i][j] == '#' || key === start.join(',')) continue;
      if (loops([i, j])) result += 1;
    }
  }

  return result;
}

export default [partOne, partTwo];
