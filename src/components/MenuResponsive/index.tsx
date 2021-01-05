import React from 'react';

import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';

import { Container } from './styles';

const MenuResponsive: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <button type="button" onClick={signOut}>
        <IoIosLogOut size={30} color="#C32925" />
      </button>
    </Container>
  );
};

export default MenuResponsive;
