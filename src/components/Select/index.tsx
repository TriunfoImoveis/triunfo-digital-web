import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { Container, IconContainer, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  icon?: React.ComponentType<IconBaseProps>;
  nameLabel?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  icon: Icon,
  options,
  nameLabel,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
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
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
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
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Select;
