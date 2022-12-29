// export const generateGridWithValues = (rows = 7, cols = 10) => {
//   const grid = [];

//   for (const i of Array(cols).fill(0).keys()) {
//     const col = [];
//     for (const j of Array(rows).fill(0).keys()) {
//       col.push(i * rows + j);
//     }
//     grid.push(col);
//   }

//   return grid;
// };

export const NUM_OF_COLUMNS = 7
export const NUM_OF_ROWS = 7


export const generateGrid = (rows = NUM_OF_ROWS, cols = NUM_OF_COLUMNS) => {
  const grid = [];

  for (const c of Array(cols).keys()) {
    for (const r of Array(rows).keys()) {
      grid.push(0);
    }
  }

  return grid;
};

// export const generateGrid2 = (rows = 7, cols = 10) => {
//   const initialValue: any = [];
//   const reducer = (acc: any, _: any) => {
//     console.log('acc', acc);
//     return [...acc, ...Array(cols).fill(0)];
//   };

//   console.log('duced', [...Array(rows).keys()].reduce(reducer, initialValue));

//   return Array(rows).reduce(reducer, initialValue);
// };
