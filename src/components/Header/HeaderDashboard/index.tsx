import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { LogoHeader } from '../../../assets/images';

import MenuResponsive from '../../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styled';
import LogoutModal from '../../ReactModal/LogoutModal';

const Header: React.FC = () => {
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
          <Link to="/dashboard/vendas">Vendas</Link>
        </NavItemContent>
        <NavItemContent>
          <Link to="/dashboard/persona">Persona</Link>
        </NavItemContent>
        <NavItemContent>
          <IoIosLogOut size={30} color="#fff" />
          <button type="button" onClick={toggleLogoutModal}>
            Sair
          </button>
        </NavItemContent>
      </NavBarContainer>

      <MenuResponsive />
      <LogoutModal isOpen={logoutModal} setIsOpen={toggleLogoutModal} />
    </Container>
  );
};

export default Header;
