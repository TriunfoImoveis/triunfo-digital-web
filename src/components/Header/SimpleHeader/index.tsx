import React, { useState, useCallback } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { LogoHeader } from '../../../assets/images';

import LogoutModal from '../../ReactModal/LogoutModal';

import { Container, NavBarContainer, NavItemContent } from './styles';

const SimpleHeader: React.FC = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = useCallback(() => {
    setLogoutModal(!logoutModal);
  }, [logoutModal]);
  return (
    <Container>
      <Link to="/menu">
        <LogoHeader />
      </Link>
      <NavBarContainer>
        <NavItemContent>
          <button type="button" onClick={toggleLogoutModal}>
            <IoIosLogOut size={30} color="#C32925" />
            <span>Sair</span>
          </button>
        </NavItemContent>
      </NavBarContainer>
      <LogoutModal isOpen={logoutModal} setIsOpen={toggleLogoutModal} />
    </Container>
  );
};

export default SimpleHeader;
