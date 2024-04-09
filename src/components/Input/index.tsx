import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import {
  CEP,
  CPF,
  porcent,
  currency,
  Fone,
  Whats,
  DateDMY,
  CNPJMask,
  zipCodeMask,
} from '../../utils/masked';

import { ContainerWrapper, Container, IconContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  mask?:
    | 'currency'
    | 'cep'
    | 'cpf'
    | 'porcent'
    | 'fone'
    | 'whats'
    | 'date'
    | 'cnpj'
    | 'zipcode';
  maxlength?: number;
  label?: string;
  readOnly?: boolean | undefined;
  status?: 'PAGO' | 'PENDENTE';
  containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  name,
  mask,
  maxlength,
  icon: Icon,
  label,
  readOnly,
  status,
  containerStyle,
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
      clearValue: inputRef => {
        inputRef.clear();
      },
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
        case 'date':
          DateDMY(e);
          break;
        case 'cnpj':
          CNPJMask(e);
          break;
        case 'zipcode':
          zipCodeMask(e);
          break;
        default:
          break;
      }
    },
    [mask],
  );

  return (
    <ContainerWrapper className="inputContainer">
      {label && <span className="label">{label}</span>}
      <Container
        style={containerStyle}
        isErrored={errorField}
        isFilled={isFilled}
        isFocused={isFocused}
        status={status}
      >
        {Icon && (
          <IconContainer>
            <Icon size={12} />
          </IconContainer>
        )}
        {mask ? (
          <input
            ref={inputRef}
            name={name}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            onKeyUp={e => masked(e)}
            maxLength={maxlength}
            readOnly={readOnly}
            {...rest}
          />
        ) : (
          <input
            name={name}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            defaultValue={defaultValue}
            maxLength={maxlength}
            readOnly={readOnly}
            {...rest}
          />
        )}
      </Container>
      {errorField && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default Input;
