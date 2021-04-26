export const valiateDate = (value: string | null | undefined): boolean => {
  if (!value) return false;

  const dtArray = value.split('/');

  if (dtArray == null) return false;

  const dtDay = Number(dtArray[0]);
  const dtMonth = Number(dtArray[1]);
  const dtYear = Number(dtArray[2]);
  const yearSystem = new Date().getFullYear() + 10;
  if (dtMonth < 1 || dtMonth > 12) return false;
  if (dtDay < 1 || dtDay > 31) return false;
  if (dtYear < 1900 || dtYear > yearSystem) return false;
  if (
    (dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) &&
    dtDay === 31
  )
    return false;
  if (dtMonth === 2) {
    const isleap =
      dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0);
    if (dtDay > 29 || (dtDay === 29 && !isleap)) return false;
  }
  return true;
};
