import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { Container, ContainerWrapper, Error } from './styles';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
  label?: string;
}

const AsyncSelect: React.FC<Props> = ({ name, label, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const selectRef = useRef<Select<OptionTypeBase>>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (error !== undefined) {
      setErrorField(true);
    }
  }, [error]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setErrorField(false);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setErrorField(false);
  }, []);

  return (
    <ContainerWrapper>
      {label && <span className="label">{label}</span>}
      <Container isErrored={errorField} isFocused={isFocused} label={label}>
        <Select
          cacheOptions
          defaultValue={defaultValue}
          ref={selectRef}
          classNamePrefix="select"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          openMenuOnClick={false}
          {...rest}
        />
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default AsyncSelect;
