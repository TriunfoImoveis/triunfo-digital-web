import React from 'react';
import AdmLayout from '../../Layouts/Adm';

import {
  RegisterSellIcon,
  Realter,
  Builders,
} from '../../../assets/images';

import { Container, Content, Option, OptionsContainer } from './styles';
import { BsFillPinMapFill, BsGear } from 'react-icons/bs';


const ConfigMenu: React.FC = () => {
  return (
  <AdmLayout>
    <Container>
      <Content>
        <OptionsContainer>
          <Option to="/adm/lista-bairros">
            <BsFillPinMapFill  />
            <span>Bairros</span>
          </Option>
          <Option to="/adm/lista-filiais">
            <RegisterSellIcon />
            <span>Fíliais</span>
          </Option>
          <Option to="/adm/lista-construtoras">
            <Builders />
            <span>Construtoras</span>
          </Option>
          <Option to="/adm/lista-corretores">
            <Realter />
            <span>Corretores</span>
          </Option>
          <Option to="/adm/config/origens">
            <BsGear size={30} />
            <span>Origens</span>
          </Option>
        </OptionsContainer>
      </Content>
    </Container>
  </AdmLayout>
);
}

export default ConfigMenu;