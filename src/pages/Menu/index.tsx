import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header/SimpleHeader';
import {
  RegisterSellIcon,
  DashboardIcon,
  RankingIcon,
  Perfil,
  AdmLogo,
  FinancesIcons,
} from '../../assets/images';
import {
  Container,
  Content,
  UserContainer,
  InfoContainer,
  OptionsContainer,
  Option,
} from './styles';
// import Notifications from '../../components/Notifications';

const Menu: React.FC = () => {
  const { userAuth } = useAuth();
  return (
    <Container>
      <Header />
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
        {/* <Notifications /> */}
        <OptionsContainer>
          {userAuth.office.name === 'Presidente' ||
          userAuth.office.name === 'Gerente' ? (
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
                <span>Ranking de Vendas</span>
              </Option>
              <Option to="/ranking-geral-vendas"> 
                <RankingIcon />
                <span>Ranking Geral de Vendas</span>
              </Option>
              <Option to="/ranking-captacao">
                <RankingIcon />
                <span>Ranking de Captação</span>
              </Option>
              <Option to="/dashboard/menu">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/financeiro/menu">
                <FinancesIcons />
                <span>Financeiro</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          ) : null}

          {userAuth.office.name === 'Corretor' ||
          userAuth.office.name === 'Coordenador' ? (
            <>
              <Option to="/actions">
                <RegisterSellIcon />
                <span>Cadastar Vendas</span>
              </Option>
              
              <Option to="/ranking">
                <RankingIcon />
                <span>Ranking de Vendas</span>
              </Option>
              <Option to="/ranking-captacao">
                <RankingIcon />
                <span>Ranking de Captação</span>
              </Option>
              <Option to="/dashboard">
              </Option> 
             
              <Option to="/dashboard/vendas">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          ) : null}
          {userAuth.office.name === 'Diretor' ? (
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
                <span>Ranking de Vendas</span>
              </Option>
              <Option to="/ranking-captacao">
                <RankingIcon />
                <span>Ranking de Captação</span>
              </Option>
              <Option to="/dashboard/menu">
                <DashboardIcon />
                <span>Dashboard</span>
              </Option>
              <Option to="/perfil">
                <Perfil />
                <span>Perfil</span>
              </Option>
            </>
          ) : null}
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
