import React from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import {
  LogoHeader,
  RankingIcon,
  RegisterSellIcon,
  DashboardIcon,
} from '../../assets/images';

import MenuResponsive from '../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <LogoHeader />
      <NavBarContainer>
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
      <MenuResponsive />
    </Container>
  );
};

export default Header;
