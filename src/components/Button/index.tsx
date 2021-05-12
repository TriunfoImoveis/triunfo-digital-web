import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  active,
  ...rest
}) => (
  <Container colors={color} active={active} {...rest}>
    {children}
  </Container>
);

export default Button;
