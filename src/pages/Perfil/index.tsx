import React from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { LogoHeader } from '../../assets/images';
import {
  Container,
  Header,
  NavBarContainer,
  NavItemContent,
  Content,
  TabWrapper,
} from './styles';
import UserProfile from '../../components/Profile/UserProfile';
import UserUpdate from '../../components/Profile/UserUpdate';
import { useAuth } from '../../context/AuthContext';
import UserFinances from '../../components/Profile/UserFinances';
// import Select from '../../components/Select';

const Perfil: React.FC = () => {
  const { signOut } = useAuth();

  // const formBankRef = useRef<FormHandles>(null);

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
        <h1>Perfil do Usuário</h1>
        <TabWrapper>
          <Tabs
            id="tab-container"
            className="tab-container"
            defaultActiveKey="finances"
            variant="tabs"
          >
            <TabBootstrap eventKey="profile" title="Perfil">
              <UserProfile />
              <UserUpdate />
            </TabBootstrap>
            <TabBootstrap eventKey="finances" title="Financeiro">
              <UserProfile />
              <UserFinances />
            </TabBootstrap>
            <TabBootstrap eventKey="sales" title="Vendas">
              <UserProfile />
            </TabBootstrap>
          </Tabs>
        </TabWrapper>
      </Content>
    </Container>
  );
};

export default Perfil;
