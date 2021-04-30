import React, { useCallback, useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { formatPrice } from '../../../utils/format';
import Button from '../../Button';
import AddOrEditAccountBank from '../../ReactModal/AddOrEditAccountBank';

import {
  SaldBanksContainer,
  SaldBanksHeader,
  SaldBanks,
  SyncBankBalance,
} from './styles';

type BankBalance = {
  id: string;
  bank: string;
  name: string;
  number: string;
  sald: number;
};
const SaldAccountBanks: React.FC = () => {
  const [isBankVisible, setIsBankVisible] = useState(false);
  const [
    isOpenModalAddOrUpdateAccountBank,
    setIsOpenModalAddOrUpdateAccountBank,
  ] = useState(true);
  const [bankBalance, setBankBalance] = useState<BankBalance[]>([]);
  useEffect(() => {
    const loadBankBalance = async () => {
      const response = await fetch('http://localhost:3335/accountBanks');
      const data = await response.json();
      setBankBalance(data);
    };
    loadBankBalance();
  }, []);
  const toogleModalAddOrUpdateAccountBank = useCallback(() => {
    setIsOpenModalAddOrUpdateAccountBank(!isOpenModalAddOrUpdateAccountBank);
  }, [isOpenModalAddOrUpdateAccountBank]);
  return (
    <SaldBanksContainer>
      <SaldBanksHeader>
        <h1>Saldo dos Bancos</h1>
        <button type="button" onClick={() => setIsBankVisible(!isBankVisible)}>
          {isBankVisible ? (
            <IoMdArrowDropup size={30} color="#C32925" />
          ) : (
            <IoMdArrowDropdown size={30} color="#C32925" />
          )}
        </button>
      </SaldBanksHeader>
      {isBankVisible && (
        <SaldBanks quantCols={bankBalance.length}>
          <table>
            <thead>
              <tr>
                {bankBalance.map(bank => (
                  <th key={bank.id}>
                    <div>
                      <span>
                        Banco:
                        {bank.bank}
                      </span>
                      <span>
                        Conta:
                        {bank.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {bankBalance.map(bank => (
                  <td key={bank.id}>{formatPrice(bank.sald)}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <SyncBankBalance>
            <Button onClick={toogleModalAddOrUpdateAccountBank}>
              Atualizar Saldo
            </Button>
          </SyncBankBalance>
        </SaldBanks>
      )}
      <AddOrEditAccountBank
        isOpen={isOpenModalAddOrUpdateAccountBank}
        setIsOpen={toogleModalAddOrUpdateAccountBank}
        bankBalance={bankBalance}
      />
    </SaldBanksContainer>
  );
};

export default SaldAccountBanks;
