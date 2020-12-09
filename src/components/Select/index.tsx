import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { AiOutlineCaretDown } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  ContainerWrapper,
  Container,
  IconContainer,
  Error,
  AddButton,
} from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  nameLabel?: string;
  add?: boolean;
  remove?: boolean;
  addRealtors?(): void;
  removeRealtors?(): void;
}

const Select: React.FC<SelectProps> = ({
  name,
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

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    if (error !== undefined) {
      setErrorField(true);
    }
  }, [error]);
  const handleInputFocus = useCallback(() => {
    setErrorField(false);
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, name]);
  return (
    <ContainerWrapper>
      <Container
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
        nameLabel={nameLabel}
      >
        <IconContainer>
          <AiOutlineCaretDown size={18} />
        </IconContainer>

        <select
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={selectRef}
          defaultValue={defaultValue}
          value={defaultValue}
          {...rest}
        >
          {nameLabel && (
            <option value="" selected disabled>
              {`Selecione ${nameLabel}`}
            </option>
          )}
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
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default Select;
