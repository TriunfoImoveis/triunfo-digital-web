import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import ConfirmAccount from '../../../components/ConfirmAccount';
import EditAccountFixed from '../../../components/EditAccountFixed';
import api from '../../../services/api';

import FinancesLayout from '../../Layouts/FinancesLayout';

import { Background, Container, Content, Header } from './styles';

type Params = {
  id: string;
};

const DetailsAccount: React.FC = () => {
  const [action, setAction] = useState('UPDATE');
  const history = useHistory();
  const { id } = useParams<Params>();
  const forms = {
    UPDATE: <EditAccountFixed accountId={id} />,
    CONFIRM: <ConfirmAccount accountId={id} />,
  };

  const handleRemoveAccout = async () => {
    try {
      await api.delete(`/expense/${id}`);
      toast.success('Conta Excluída');
      history.push('/financeiro/contas');
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <FinancesLayout>
      <Background>
        <Container>
          <h2>Detalhes da Conta</h2>
          <Header>
            <Button onClick={() => setAction('UPDATE')}>ATUALIZAR</Button>
            <Button onClick={() => setAction('CONFIRM')}>DAR BAIXA</Button>
            <Button onClick={handleRemoveAccout}>REMOVER</Button>
          </Header>
          <Content>{forms[action]}</Content>
        </Container>
      </Background>
    </FinancesLayout>
  );
};

export default DetailsAccount;
