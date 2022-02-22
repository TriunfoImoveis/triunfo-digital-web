import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/Header/SimpleHeader';
import {
  DashboardIcon,
} from '../../../assets/images';
import {
  Container,
  Content,
  UserContainer,
  InfoContainer,
  OptionsContainer,
  Option,
} from './styles';
// import Notifications from '../../components/Notifications';

const MenuDashboard: React.FC = () => {
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
          <Option to="/dashboard/vendas">
          <DashboardIcon />
            <span>Dashboard Vendas</span>
          </Option>
          <Option to="/adm/lista-construtoras">
          <DashboardIcon />
            <span>Dashboard Comercial</span>
          </Option>
        </OptionsContainer>
      </Content>
    </Container>
  );
};

export default MenuDashboard;
