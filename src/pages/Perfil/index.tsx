import React from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';

import { LogoHeader, Camera } from '../../assets/images';
import {
  Container,
  Header,
  NavBarContainer,
  NavItemContent,
  Content,
  ProfileContainer,
  BasicInfo,
  Avatar,
  InforUser,
  InfoItem,
  InfoGroup,
  Separator,
} from './styles';

const Perfil: React.FC = () => {
  const { signOut } = useAuth();
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
        <ProfileContainer>
          <BasicInfo>
            <Avatar>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
              <button type="button">
                <span>Mudar foto</span>
                <Camera />
              </button>
            </Avatar>
            <InforUser>
              <InfoItem>
                <span className="label">Nome</span>
                <span>Rafael Serejo</span>
              </InfoItem>
              <InfoGroup>
                <InfoItem>
                  <span className="label">Cargo</span>
                  <span>Corretor</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">Filial</span>
                  <span>São Luís</span>
                </InfoItem>
              </InfoGroup>
            </InforUser>
          </BasicInfo>
          <Separator />
        </ProfileContainer>
      </Content>
    </Container>
  );
};

export default Perfil;
