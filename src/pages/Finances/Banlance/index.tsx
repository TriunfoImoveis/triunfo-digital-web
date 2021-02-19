import React, { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import AdmLayout from '../../Layouts/Adm';

import {
  Container,
  Header,
  SaldBanks,
  SaldBanksHeader,
  SaldBanksContainer,
} from './styles';

const Balance: React.FC = () => {
  const [isBankVisible, setIsBankVisible] = useState(true);

  return (
    <AdmLayout>
      <Container>
        <Header>
          <SaldBanksContainer>
            <SaldBanksHeader showBanks={Number(isBankVisible)}>
              <h1>Saldo dos Bancos</h1>
              <button
                type="button"
                onClick={() => setIsBankVisible(!isBankVisible)}
              >
                {isBankVisible ? (
                  <IoMdArrowDropup size={30} color="#C32925" />
                ) : (
                  <IoMdArrowDropdown size={30} color="#C32925" />
                )}
              </button>
            </SaldBanksHeader>
            {isBankVisible && (
              <SaldBanks>
                <span>bancos</span>
              </SaldBanks>
            )}
          </SaldBanksContainer>
        </Header>
      </Container>
    </AdmLayout>
  );
};

export default Balance;
