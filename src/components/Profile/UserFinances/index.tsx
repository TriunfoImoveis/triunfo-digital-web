import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Container, Header } from './styles';
import BankAccount from './BankAccount';
import { BiPlus } from 'react-icons/bi';
import FormCreateBankAccount from './FormCreateBankAccount';



const UserFinances: React.FC = () => {
  const { userAuth } = useAuth();
  const [createNewBankData, setCreateNewBankData] = useState(false);

  return (
    <Container>
      <Header>
        <div>
          <h2>Dados Bancários</h2>
          <button type="button" onClick={() => setCreateNewBankData(prevState => !prevState)}>
            <BiPlus />
            Adicionar novo
          </button>
        </div>
      </Header>

      {createNewBankData && (
        <FormCreateBankAccount type='new' bankDataId='' />
      )}
    
      {!createNewBankData && userAuth.bank_data.map(bank => (
        <BankAccount
          key={bank.id}
          bank={bank}
        />
      ))}
    </Container>
  );
};

export default UserFinances;
