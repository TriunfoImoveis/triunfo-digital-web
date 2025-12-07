import React, { InputHTMLAttributes, useCallback, useState } from 'react';
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
import {
  ContainerWrapper,
  Container,
  IconContainer,
  Error,
} from '../Input/styles';

type Mask =
  | 'currency'
  | 'cep'
  | 'cpf'
  | 'porcent'
  | 'fone'
  | 'whats'
  | 'date'
  | 'cnpj'
  | 'zipcode';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: Mask;
  maxlength?: number;
  label?: string;
  readOnly?: boolean;
  status?: 'PAGO' | 'PENDENTE';
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const maskFns: Record<Mask, (e: React.ChangeEvent<HTMLInputElement>) => void> = {
  currency,
  cep: CEP,
  cpf: CPF,
  porcent,
  fone: Fone,
  whats: Whats,
  date: DateDMY,
  cnpj: CNPJMask,
  zipcode: zipCodeMask,
};

const InputControlled: React.FC<InputProps> = ({
  icon: Icon,
  label,
  mask,
  maxlength,
  status,
  error,
  value,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(Boolean(value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask) {
        maskFns[mask](e);
      }
      onChange?.(e.target.value);
    },
    [mask, onChange],
  );

  return (
    <ContainerWrapper className="inputContainer">
      {label && <span className="label">{label}</span>}
      <Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        status={status}
      >
        {Icon && (
          <IconContainer>
            <Icon size={12} />
          </IconContainer>
        )}
        <input
          {...rest}
          value={value}
          maxLength={maxlength}
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            setIsFocused(false);
            setIsFilled(!!e.target.value);
          }}
          onChange={handleChange}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </ContainerWrapper>
  );
};

export default InputControlled;
