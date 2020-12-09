import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { CEP, CPF, porcent, currency, Fone, Whats } from '../../utils/masked';

import { ContainerWrapper, Container, IconContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: 'currency' | 'cep' | 'cpf' | 'porcent' | 'fone' | 'whats';
  maxlength?: number;
  label: string;
}

const Input: React.FC<InputProps> = ({
  name,
  mask,
  maxlength,
  icon: Icon,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const masked = useCallback(
    e => {
      switch (mask) {
        case 'currency':
          currency(e);
          break;
        case 'porcent':
          porcent(e);
          break;
        case 'cep':
          CEP(e);
          break;
        case 'cpf':
          CPF(e);
          break;
        case 'fone':
          Fone(e);
          break;
        case 'whats':
          Whats(e);
          break;
        default:
          break;
      }
    },
    [mask],
  );

  return (
    <ContainerWrapper>
      <span className="label">{label}</span>
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
        {mask ? (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            defaultValue={defaultValue}
            onKeyUp={e => masked(e)}
            maxLength={maxlength}
            {...rest}
          />
        ) : (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            defaultValue={defaultValue}
            maxLength={maxlength}
            {...rest}
          />
        )}
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default Input;
