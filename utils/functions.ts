export const bigintToIntHandler = (id: number) => {
  const int = typeof id === "bigint" ? Number(id).toString() : id;
  return Number(int);
};