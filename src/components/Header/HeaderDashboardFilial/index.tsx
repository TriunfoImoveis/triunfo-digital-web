import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { LogoHeader } from '../../../assets/images';

import { Container, NavBarContainer, NavItemContent } from './styled';
import LogoutModal from '../../ReactModal/LogoutModal';
import { useAuth } from '../../../context/AuthContext';

const Header: React.FC = () => {
  const { userAuth } = useAuth();
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
          <Link to="/dashboard/filial">Filial</Link>
        </NavItemContent>
        {userAuth.office.name !== 'Diretor' && (
          <NavItemContent>
            <Link to="/dashboard/time">Time</Link>
          </NavItemContent>
        )}

        <NavItemContent>
          <IoIosLogOut size={30} color="#fff" />
          <button type="button" onClick={toggleLogoutModal}>
            Sair
          </button>
        </NavItemContent>
      </NavBarContainer>
      <LogoutModal isOpen={logoutModal} setIsOpen={toggleLogoutModal} />
    </Container>
  );
};

export default Header;
