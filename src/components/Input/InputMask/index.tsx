import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactInputMask, { Props as InputPropsMask } from 'react-input-mask';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { ContainerWrapper, Container, IconContainer, Error } from './styles';

interface InputProps extends InputPropsMask {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<ReactInputMask>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    if (error) {
      setErrorField(true);
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    setErrorField(false);
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.state);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <ContainerWrapper>
      <Container
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && (
          <IconContainer>
            <Icon size={12} />
          </IconContainer>
        )}
        <ReactInputMask
          name={fieldName}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default InputMask;
