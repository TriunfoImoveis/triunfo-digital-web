import React, { useState, useCallback } from 'react';

import { IoIosLogOut } from 'react-icons/io';
import LogoutModal from '../ReactModal/LogoutModal';

import { Container } from './styles';

const MenuResponsive: React.FC = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = useCallback(() => {
    setLogoutModal(!logoutModal);
  }, [logoutModal]);
  return (
    <Container>
      <button type="button" onClick={toggleLogoutModal}>
        <IoIosLogOut size={30} color="#C32925" />
      </button>
      <LogoutModal isOpen={logoutModal} setIsOpen={toggleLogoutModal} />
    </Container>
  );
};

export default MenuResponsive;
