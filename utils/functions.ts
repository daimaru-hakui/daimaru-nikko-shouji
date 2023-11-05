export const bigintToIntHandler = (id: number) => {
  const int = typeof id === "bigint" ? Number(id).toString() : id;
  return Number(int);
};

export const zeroPadding = (id: number) => {
  const serial =  ("00000000" + id).slice(-8)
  return serial
}