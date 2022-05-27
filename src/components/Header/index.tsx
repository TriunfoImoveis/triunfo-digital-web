import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import {
  LogoTriunfoSmall,
  RegisterSellIcon,
  DashboardIcon,
  Realter,
  Sale,
  Collaborators,
  AdmLogo,
  Builders,
} from '../../assets/images';

import MenuResponsive from '../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styles';
import LogoutModal from '../ReactModal/LogoutModal';

interface IHeaderProps {
  type?: string;
}

const Header: React.FC<IHeaderProps> = ({ type = 'realtor' }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { userAuth } = useAuth();

  const toggleLogoutModal = useCallback(() => {
    setLogoutModal(!logoutModal);
  }, [logoutModal]);
  return (
    <Container>
      <Link to="/menu">
        <LogoTriunfoSmall />
      </Link>
      {type === 'adm' ? (
        <NavBarContainer>
          {userAuth.office.name === 'Administrador' ? (
            <>
              <NavItemContent>
                <Realter />
                <Link to="/adm/lista-corretores">Corretores</Link>
              </NavItemContent>
              <NavItemContent>
                <Builders />
                <Link to="/adm/lista-construtoras">Construtoras</Link>
              </NavItemContent>
              <NavItemContent>
                <IoIosLogOut size={30} color="#fff" />
                <button type="button" onClick={toggleLogoutModal}>
                  Sair
                </button>
              </NavItemContent>
            </>
          ) : (
            <>
              {userAuth.office.name === 'Diretor' ? (
                <>
                  <NavItemContent>
                    <Sale />
                    <Link to="/adm/lista-vendas">Vendas</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <Realter />
                    <Link to="/adm/lista-corretores">Corretores</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <Builders />
                    <Link to="/adm/lista-construtoras">Construtoras</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <IoIosLogOut size={30} color="#fff" />
                    <button type="button" onClick={toggleLogoutModal}>
                      Sair
                    </button>
                  </NavItemContent>
                </>
              ) : (
                <>
                  <NavItemContent>
                    <Realter />
                    <Link to="/adm/lista-corretores">Corretores</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <Sale />
                    <Link to="/adm/lista-vendas">Vendas</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <Collaborators />
                    <Link to="/adm/lista-colaboradores">RH</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <Builders />
                    <Link to="/adm/lista-construtoras">Construtoras</Link>
                  </NavItemContent>
                  <NavItemContent>
                    <IoIosLogOut size={30} color="#fff" />
                    <button type="button" onClick={toggleLogoutModal}>
                      Sair
                    </button>
                  </NavItemContent>
                </>
              )}
            </>
          )}
        </NavBarContainer>
      ) : (
        <NavBarContainer>
          {userAuth.office.name === 'Presidente' ||
          userAuth.office.name === 'Gerente' ? (
            <NavItemContent>
              <AdmLogo />
              <Link to="/adm/lista-vendas">Administrativo</Link>
            </NavItemContent>
          ) : null}
          {/* <NavItemContent>
            <RankingIcon />
            <Link to="/ranking">Ranking</Link>
          </NavItemContent> */}
          <NavItemContent>
            <RegisterSellIcon />
            <a href="/actions">Vendas</a>
          </NavItemContent>
          <NavItemContent>
            <DashboardIcon />
            <a href="#top">Dashboard</a>
          </NavItemContent>
          <NavItemContent>
            <IoIosLogOut size={40} color="#fff" />
            <button type="button" onClick={toggleLogoutModal}>
              Sair
            </button>
          </NavItemContent>
        </NavBarContainer>
      )}
      <MenuResponsive />
      <LogoutModal isOpen={logoutModal} setIsOpen={toggleLogoutModal} />
    </Container>
  );
};

export default Header;
