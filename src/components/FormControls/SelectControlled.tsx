import React, { useCallback, useState } from 'react';
import Select, {
  OptionTypeBase,
  Props as SelectProps,
  ValueType,
} from 'react-select';
import { FaMinus, FaPlus } from 'react-icons/fa';
import theme from '../../styles/theme';
import {
  Container,
  ContainerWrapper,
  AddButton,
  Error,
} from '../ReactSelect/styles';

interface Props extends SelectProps<OptionTypeBase, boolean> {
  name: string;
  label?: string;
  add?: boolean;
  remove?: boolean;
  addRealtors?(): void;
  removeRealtors?(): void;
  error?: string;
  value?: ValueType<OptionTypeBase, boolean>;
  onChange?: (value: ValueType<OptionTypeBase, boolean>) => void;
}

const SelectControlled: React.FC<Props> = ({
  label,
  add,
  remove,
  addRealtors,
  removeRealtors,
  error,
  value,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (val: ValueType<OptionTypeBase, boolean>) => {
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <ContainerWrapper>
      {label && <span className="label">{label}</span>}
      <Container isErrored={!!error} isFocused={isFocused} label={label}>
        <Select
          {...rest}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          classNamePrefix="select"
        />
        {add && (
          <AddButton type="button" onClick={addRealtors}>
            <FaPlus size={20} color={theme.colors.gold} />
          </AddButton>
        )}
        {remove && (
          <AddButton type="button" onClick={removeRealtors}>
            <FaMinus size={20} color={theme.colors.gold} />
          </AddButton>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default SelectControlled;
