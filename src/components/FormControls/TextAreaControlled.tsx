import React, { TextareaHTMLAttributes, useState } from 'react';
import { ContainerWrapper, Container, Error } from '../TextArea/styles';

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextAreaControlled: React.FC<Props> = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(Boolean(value));

  return (
    <ContainerWrapper>
      {label && <span className="label">{label}</span>}
      <Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <textarea
          {...rest}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange?.(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={event => {
            setIsFocused(false);
            setIsFilled(!!event.target.value);
          }}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default TextAreaControlled;
