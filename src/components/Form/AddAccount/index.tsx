import React, { useState } from 'react';
import AccountFixed from '../../../components/AccountFixed/AccountFixed';
import AccountVariable from '../../../components/AccountVariable';
import Button from '../../../components/Button';

import { Container, Content, Header } from './styles';

const AddAccount: React.FC = () => {
  const [typeAccount, setTypeAccount] = useState('FIXA');
  const forms = {
    FIXA: <AccountFixed />,
    VARIAVEL: <AccountVariable />,
  };
  return (
    <Container>
      <h2>ADICIONAR CONTAS</h2>
      <Header>
        <Button
          colorsText='#FFF'
          onClick={() => setTypeAccount('FIXA')}
          active={typeAccount !== 'FIXA'}
        >
          FIXAS
        </Button>
        <Button
          colorsText='#FFF'
          onClick={() => setTypeAccount('VARIAVEL')}
          active={typeAccount === 'FIXA'}
        >
          VARIAVEIS
        </Button>
      </Header>
      <Content>{forms[typeAccount]}</Content>
    </Container>
  );
};

export default AddAccount;
