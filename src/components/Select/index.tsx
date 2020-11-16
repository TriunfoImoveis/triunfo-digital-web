import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FaPlus } from 'react-icons/fa';
import {
  ContainerWrapper,
  Container,
  IconContainer,
  AddButton,
  Error,
} from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  icon?: React.ComponentType<IconBaseProps>;
  nameLabel?: string;
  add?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  icon: Icon,
  options,
  nameLabel,
  add,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const [quantItems, setQuantItems] = useState(1);
  const [items, setItems] = useState([0]);

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

  useEffect(() => {
    console.log(quantItems);
    for (let i = 1; i < quantItems; i + 1) {
      setItems([...items, i]);
    }
  }, [quantItems, items]);
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
  }, [fieldName, registerField]);
  return (
    <ContainerWrapper>
      <Container
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
        nameLabel={nameLabel}
      >
        {Icon && (
          <IconContainer>
            <Icon size={22} />
          </IconContainer>
        )}
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
          <AddButton
            type="button"
            onClick={() => setQuantItems(quantItems + 1)}
          >
            <FaPlus size={22} color="#C32925" />
          </AddButton>
        )}
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default Select;
