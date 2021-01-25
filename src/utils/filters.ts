interface OptionsData {
  label: string;
  value: string;
}

// Bancos
export const filterOptions = (
  inputValue: string,
  options: OptionsData[],
): OptionsData[] => {
  return options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};
