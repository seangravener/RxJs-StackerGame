export const NUM_OF_COLUMNS = 7;
export const NUM_OF_ROWS = 7;

export const generateGrid = (rows = NUM_OF_ROWS, cols = NUM_OF_COLUMNS) => {
  const grid = [];

  for (const c of Array(cols).keys()) {
    for (const r of Array(rows).keys()) {
      grid.push(0);
    }
  }

  return grid;
};
