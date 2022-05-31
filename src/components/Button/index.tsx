import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  colorsText?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  active,
  colorsText,
  ...rest
}) => (
  <Container colors={color} active={active} colorsText={colorsText} {...rest}>
    {children}
  </Container>
);

export default Button;
