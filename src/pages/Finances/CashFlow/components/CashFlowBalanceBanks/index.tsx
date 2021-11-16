import React from 'react';

// import { Container } from './styles';

interface Saldos {
  saldo_entrada: string;
  saldo_saida: string;
  saldo_total: string;
}

interface CashFlowBalanceBanksProps {
  saldos: Saldos;
}
const CashFlowBalanceBanks: React.FC<CashFlowBalanceBanksProps> = ({saldos}) => {
  return <div />;
}

export default CashFlowBalanceBanks;