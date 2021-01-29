interface OptionsData {
  label: string;
  value: string;
}

export const filterOptions = (
  inputValue: string,
  options: OptionsData[],
): OptionsData[] => {
  return options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};
