import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiOneplus } from 'react-icons/si';
import { FinancesIcons } from '../../../assets/images';

import AdmLayout from '../../Layouts/Adm';
import {
  Container,
  Header,
  Background,
  Content,
  Footer,
  ButtonGroup,
} from './styles';
import ChartAccounts from '../../../components/Finances/ChartAccounts';

const Account: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  return (
    <AdmLayout>
      <Background>
        <Container>
          <Header>
            <h1>Contas</h1>
          </Header>
          <Content>
            <ChartAccounts typeTab={typeTab} handleSetTab={handleSetTab} />
          </Content>
          <Footer>
            <ButtonGroup>
              <Link to="/financeiro/caixa">
                <FinancesIcons />
                <span>Caixa</span>
              </Link>

              <Link to="/financeiro/adicionanovaconta">
                <SiOneplus />
                <span>Adiconar nova conta</span>
              </Link>
            </ButtonGroup>
          </Footer>
        </Container>
      </Background>
    </AdmLayout>
  );
};

export default Account;
