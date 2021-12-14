import React, {useEffect, useCallback, useState} from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { formatPrice } from '../../../../../utils/format';
import {currency} from '../../../../../utils/unMasked';
import { 
  Container, 
  ContainerCards,
  Box,
  BoxContent
} from './styled';

interface Saldos {
  saldo_entrada: string; 
  saldo_saida: string;
  saldo_total: string;
}

interface Conta {
  id: string
  account: string;
  bank_name: string;
}

interface Despesa {
  id: string;
  conta: Conta;
  tipo_despesa: 'ENTRADA' | 'SAIDA';
  valor: string;
}

interface Subsidiary {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  expense_type: string;
  description: string;
  due_date: string;
  value: string;
  pay_date: string;
  value_paid: string;
  group: {
    id: string;
    name: string;
  }
  subsidiary: Subsidiary;
  bank_data: {
    id: string;
    bank_name: string;
  }
}


interface CashFlowBalanceBanksProps {
  saldos: Saldos;
  listBanks: Conta[];
  entradas: Despesa[];
  saidas: Expense[];
}

interface SaldoContas {
  nome: string;
  saldo: string;
}
const CashFlowBalanceBanks: React.FC<CashFlowBalanceBanksProps> = ({ 
  saldos, 
  entradas, 
  saidas, 
  listBanks 
}) => {
  const [contas, setContas] = useState<SaldoContas[]>([])
  const reducerSum = (acc, valor) => acc + valor;
  const getSaldoConta = useCallback((conta: Conta, entradas: Despesa[], saidas: Expense[]): SaldoContas => {
    const valorEntradas = entradas.map(entrada => {
      if(entrada.conta.id !== conta.id) {
        return 0;
      }

      return currency(entrada.valor);
    }).reduce(reducerSum, 0);

    const valorSaidas = saidas.map(saida => {
      if(saida.bank_data.id !== conta.id) {
        return 0;
      }

      return currency(saida.value_paid);
    }).reduce(reducerSum, 0);
    
    const saldo = valorEntradas - valorSaidas;
    return {
      nome: `${conta.bank_name} - ${conta.account}`,
      saldo: formatPrice(saldo),
    }
  }, []);

  useEffect(() => {
    setContas(listBanks.map(bank => getSaldoConta(bank, entradas, saidas)));
  }, [entradas, getSaldoConta, listBanks, saidas]);
  return (
    <Container>
      <Accordion defaultActiveKey="0" bsPrefix="dashboard">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Saldos Gerais
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ContainerCards>
                <Box>
                  <BoxContent>
                    <strong>Saldo de Entradas</strong>
                    <span>{saldos.saldo_entrada}</span>
                  </BoxContent>
                </Box>
                <Box>
                  <BoxContent>
                    <strong>Saldo de Saída</strong>
                    <span>{saldos.saldo_saida}</span>
                  </BoxContent>
                </Box>
                <Box>
                  <BoxContent>
                    <strong>Saldo Total</strong>
                    <span>{saldos.saldo_total}</span>
                  </BoxContent>
                </Box>
              </ContainerCards>
            </Card.Body>
          </Accordion.Collapse>
        </Card>


        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Saldos das Contas
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ContainerCards>
                {contas.map(conta => (
                  <Box>
                  <BoxContent>
                    <strong>{conta.nome}</strong>
                    <span>{conta.saldo}</span>
                  </BoxContent>
                </Box>
                ))}
                
              </ContainerCards>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

    </Container>
  );
}

export default CashFlowBalanceBanks;