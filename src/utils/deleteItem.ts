interface IRealtors {
  name: string;
}
const deleteItem = (array: IRealtors[], index: number): IRealtors[] => {
  const itensCopy = Array.from(array);
  itensCopy.splice(index, 1);
  return itensCopy;
};

export default deleteItem;
