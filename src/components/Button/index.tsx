import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => (
  <Container colors={color} {...rest}>
    {children}
  </Container>
);

export default Button;
