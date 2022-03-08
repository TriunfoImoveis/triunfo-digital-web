import React, {
  SelectHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { AiOutlineCaretDown } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  ContainerWrapper,
  Container,
  IconContainer,
  AddButton,
} from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    label?: string | undefined | number;
  }[];
  nameLabel?: string;
  add?: boolean;
  remove?: boolean;
  addRealtors?(): void;
  removeRealtors?(): void;
}

const Select: React.FC<SelectProps> = ({
  options,
  nameLabel,
  add,
  remove,
  addRealtors,
  removeRealtors,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [errorField, setErrorField] = useState(false);

  const handleInputFocus = useCallback(() => {
    setErrorField(false);
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.value);
  }, []);

  return (
    <ContainerWrapper>
      {nameLabel && <span className="label">{nameLabel}</span>}
      <Container
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
        nameLabel={nameLabel}
      >
        <IconContainer>
          <AiOutlineCaretDown size={18} />
        </IconContainer>

        <select onFocus={handleInputFocus} onBlur={handleInputBlur} {...rest}>
          <option value="" disabled>Selecione</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {add && (
          <AddButton type="button" onClick={addRealtors}>
            <FaPlus size={20} color="#C32925" />
          </AddButton>
        )}
        {remove && (
          <AddButton type="button" onClick={removeRealtors}>
            <FaMinus size={20} color="#C32925" />
          </AddButton>
        )}
      </Container>
    </ContainerWrapper>
  );
};

export default Select;
