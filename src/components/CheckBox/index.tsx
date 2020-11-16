import React, { ChangeEvent, useState } from 'react';
import { Container } from './styles';

interface Props {
  options: {
    id: string;
    value: string;
    label: string;
  }[];
  handleValue(value: string): void;
}

const CheckboxInput: React.FC<Props> = ({ handleValue, options, ...rest }) => {
  const [selected, setSelected] = useState(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelected(!selected);
    handleValue(value);
  };
  return (
    <Container>
      {options.map(option => (
        <label htmlFor={option.id} key={option.id}>
          {option.value === 'N' ? (
            <input
              type="checkbox"
              name={option.label}
              id={option.id}
              value={option.value}
              checked={selected}
              onChange={handleChange}
              {...rest}
            />
          ) : (
            <input
              type="checkbox"
              name={option.label}
              id={option.id}
              value={option.value}
              checked={!selected}
              onChange={handleChange}
              {...rest}
            />
          )}

          {option.label}
        </label>
      ))}
    </Container>
  );
};

export default CheckboxInput;
