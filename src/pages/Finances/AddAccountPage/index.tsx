import React, { useState } from 'react';
import AccountFixed from '../../../components/AccountFixed/AccountFixed';
import AccountVariable from '../../../components/AccountVariable';
import Button from '../../../components/Button';

import FinancesLayout from '../../Layouts/FinancesLayout';

import { Background, Container, Content, Header } from './styles';

const AddAccount: React.FC = () => {
  const [typeAccount, setTypeAccount] = useState('FIXA');
  const forms = {
    FIXA: <AccountFixed />,
    VARIAVEL: <AccountVariable />,
  };
  return (
    <FinancesLayout>
      <Background>
        <Container>
          <h2>Adiciona contas</h2>
          <Header>
            <Button
              onClick={() => setTypeAccount('FIXA')}
              active={typeAccount !== 'FIXA'}
            >
              FIQUISAS
            </Button>
            <Button
              onClick={() => setTypeAccount('VARIAVEL')}
              active={typeAccount === 'FIXA'}
            >
              VARIAVEIS
            </Button>
          </Header>
          <Content>{forms[typeAccount]}</Content>
        </Container>
      </Background>
    </FinancesLayout>
  );
};

export default AddAccount;
