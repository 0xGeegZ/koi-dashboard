export const nitriet = {
  label: 10,
  value: 0.033,
};

export const getValuesTable = (step: number, max: number, value: number) => {
  let newTable: any = [];
  for (let i = 1; i <= max; i++) {
    newTable = [...newTable, { label: i * step, value: i * value }];
  }
  return newTable;
};
