import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import {
  RegisterSellIcon,
  DashboardIcon,
  RankingIcon,
  Perfil,
  LogoHeader,
  AdmLogo,
} from '../../assets/images';
import {
  Container,
  Header,
  Content,
  UserContainer,
  InfoContainer,
  OptionsContainer,
  Option,
  NavBarContainer,
  NavItemContent,
} from './styles';

const Menu: React.FC = () => {
  const { signOut, userAuth } = useAuth();
  return (
    <Container>
      <Header>
        <Link to="/menu">
          <LogoHeader />
        </Link>
        <NavBarContainer>
          <NavItemContent>
            <button type="button" onClick={signOut}>
              <IoIosLogOut size={30} color="#C32925" />
              <span>Sair</span>
            </button>
          </NavItemContent>
        </NavBarContainer>
      </Header>
      <Content>
        <UserContainer>
          <img
            src={userAuth.avatar_url || 'https://imgur.com/I80W1Q0.png'}
            alt={userAuth.name}
          />
          <InfoContainer>
            <span>{userAuth.name}</span>
            <span className="office">{userAuth.office.name}</span>
          </InfoContainer>
        </UserContainer>
        <OptionsContainer>
          {userAuth.office.name === 'Presidente' && (
            <>
              <Option to="/adm/lista-vendas">
                <AdmLogo />
                <span>Painel Administrativo</span>
              </Option>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking</span>
              </Option>
              <Option to="/#top">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
          {userAuth.office.name === 'Gerente' && (
            <>
              <Option to="/adm/lista-vendas">
                <AdmLogo />
                <span>Painel Administrativo</span>
              </Option>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking</span>
              </Option>
              <Option to="/#top">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
          {userAuth.office.name === 'Corretor' && (
            <>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking</span>
              </Option>
              <Option to="/#top">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
          {userAuth.office.name === 'Coordenador' && (
            <>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking</span>
              </Option>
              <Option to="/#top">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
          {userAuth.office.name === 'Diretor' && (
            <>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking</span>
              </Option>
              <Option to="/#top">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
          {userAuth.office.name === 'Administrador' && (
            <>
              <Option to="/adm/lista-corretores">
                <Perfil />
                <span>Corretores</span>
              </Option>
              <Option to="/adm/lista-construtoras">
                <Perfil />
                <span>Construtora</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          )}
        </OptionsContainer>
      </Content>
    </Container>
  );
};

export default Menu;
