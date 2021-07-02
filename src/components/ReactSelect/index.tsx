import React, { useRef, useEffect, useState, useCallback } from 'react';
import Select, { Props as SelectProps, OptionTypeBase } from 'react-select';
import { useField } from '@unform/core';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Container, ContainerWrapper, AddButton, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase, true | false> {
  name: string;
  label?: string;
  add?: boolean;
  remove?: boolean;
  addRealtors?(): void;
  removeRealtors?(): void;
}

const SelectSimple: React.FC<Props> = ({
  name,
  label,
  add,
  remove,
  addRealtors,
  removeRealtors,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const selectRef = useRef(null);
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
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
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
          ref={selectRef}
          classNamePrefix="select"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          openMenuOnClick={false}
          defaultValue={defaultValue}
          {...rest}
        />
        {add && (
          <AddButton type="button" onClick={addRealtors}>
            <FaPlus size={20} color="#FFF" />
          </AddButton>
        )}
        {remove && (
          <AddButton type="button" onClick={removeRealtors}>
            <FaMinus size={20} color="#FFF" />
          </AddButton>
        )}
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default SelectSimple;
