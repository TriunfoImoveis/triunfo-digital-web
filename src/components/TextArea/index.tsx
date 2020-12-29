import React, {
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { ContainerWrapper, Container, Error } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
}

const TextArea: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerWrapper>
      <span className="label">{label}</span>
      <Container
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={textAreaRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default TextArea;
