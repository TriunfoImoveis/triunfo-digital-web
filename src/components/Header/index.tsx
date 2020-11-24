import React from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { GrUserAdmin } from 'react-icons/gr';
import { useAuth } from '../../context/AuthContext';
import {
  LogoHeader,
  RankingIcon,
  RegisterSellIcon,
  DashboardIcon,
  Realter,
  Sale,
  Collaborators,
} from '../../assets/images';

import MenuResponsive from '../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styles';

interface IHeaderProps {
  type?: string;
}

const Header: React.FC<IHeaderProps> = ({ type }) => {
  const { signOut, userAuth } = useAuth();
  return (
    <Container>
      <LogoHeader />
      {type === 'adm' ? (
        <NavBarContainer>
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
            <Link to="/adm/lista-colaboradores">Colaboradores</Link>
          </NavItemContent>
          <NavItemContent>
            <IoIosLogOut size={30} color="#fff" />
            <button type="button" onClick={signOut}>
              Sair
            </button>
          </NavItemContent>
        </NavBarContainer>
      ) : (
        <NavBarContainer>
          {userAuth.office.name === 'Administrador' && (
            <NavItemContent>
              <GrUserAdmin size={20} color="#C32925" />
              <Link to="/adm/lista-vendas">Administrativo</Link>
            </NavItemContent>
          )}
          <NavItemContent>
            <RankingIcon />
            <Link to="/ranking">Ranking</Link>
          </NavItemContent>
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
            <button type="button" onClick={signOut}>
              Sair
            </button>
          </NavItemContent>
        </NavBarContainer>
      )}
      <MenuResponsive />
    </Container>
  );
};

export default Header;
