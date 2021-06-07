import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { LogoHeader, FinancesIcons } from '../../../assets/images';

import MenuResponsive from '../../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styles';
import LogoutModal from '../../ReactModal/LogoutModal';

const Header: React.FC = () => {
  const [logoutModal, setLogoutModal] = useState(false);

  const toggleLogoutModal = useCallback(() => {
    setLogoutModal(!logoutModal);
  }, [logoutModal]);
  return (
    <Container>
      <Link to="/financeiro/menu">
        <LogoHeader />
      </Link>
      <NavBarContainer>
        <NavItemContent>
          <FinancesIcons />
          <Link to="/financeiro/futuro">Recedimentos Futuros</Link>
        </NavItemContent>
        <NavItemContent>
          <FinancesIcons />
          <Link to="/financeiro/caixa">Entradas/Saídas</Link>
        </NavItemContent>
        <NavItemContent>
          <FinancesIcons />
          <Link to="/financeiro/contas">Contas</Link>
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
