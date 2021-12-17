import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import api from '../../../services/api';
import { DateBRL, formatPrice } from '../../../utils/format';
import FinancesLayout from '../../Layouts/FinancesLayout';
import CashFlowBalanceBanks from './components/CashFlowBalanceBanks';
import CashFlowEntry from './components/CashFlowEntry';
import CashFlowExits from './components/CashFlowExits';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  Container,
  FilterButtonGroup,
  FiltersBotton,
  FiltersBottonItems,
  FiltersContainer,
  CashFlowContainer,
  TitlePane
} from './styles';
import { format, subDays } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';
import { filterGroup } from '../../../utils/filters';
import ExportCashFlow from '../../../components/ReactModal/ExportCashFlow';

interface Params {
  data_inicio: string;
  data_fim: string;
  escritorio?: string;
  conta?: string;
}
interface Filial {
  id: string;
  name: string;
}
interface Subsidiary {
  id: string;
  name: string;
}

interface Conta {
  id: string
  account: string;
  bank_name: string;
}

interface Group {
  id: string;
  name: string;
}
interface Despesa {
  id: string;
  conta: Conta;
  escritorio: Filial;
  descricao: string;
  tipo_despesa: 'ENTRADA' | 'SAIDA';
  valor: string;
  data_pagamento: string;
  grupo: Group;
}

interface Saldos {
  saldo_entrada: string;
  saldo_saida: string;
  saldo_total: string;
}

interface Expense {
  id: string;
  expense_type: string;
  description: string;
  due_date: string;
  value: string;
  pay_date: string;
  value_paid: string;
  group: Group;
  subsidiary: Subsidiary
  bank_data: {
    id: string;
    bank_name: string;
    account: string;
  }
}

interface ReponseData {
  saldo_entrada: number;
  saldo_saida: number;
  saldo_total: number;
  despesas: Despesa[];
  expenses: Expense[];
}


const CashFlow: React.FC = () => {
  const { userAuth } = useAuth();

  const [modalCreateReoport, setModalCreateReoport] = useState(false);
  const [typeTab, setTypeTab] = useState('entry');
  const [entradas, setEntradas] = useState<Despesa[]>([]);
  const [saidas, setSaidas] = useState<Expense[]>([]);
  const [saldos, setSaldos] = useState({} as Saldos);
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [parms, setParms] = useState({
    data_inicio: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    data_fim: format(new Date(), 'yyyy-MM-dd'),
  } as Params);

  const formatEntry = (data: Despesa[]): Despesa[] => {
    const dataFormated = data.map(item => {
      return {
        ...item,
        valor: formatPrice(Number(item.valor)),
      }
    });
    return dataFormated;
  };

  const formatExit = (data: Expense[]) => {
    const dataFormated = data.map(item => {
      return {
        ...item,
        value: formatPrice(Number(item.value)),
        value_paid: formatPrice(Number(item.value_paid)),
        due_date: DateBRL(item.due_date),
        pay_date: DateBRL(item.pay_date),
      }
    });

    return dataFormated;
  }



  const loadFiliais = useCallback(async () => {
    try {
      const response = await api.get('/subsidiary');
      const filiais = response.data.map(item => ({
        id: item.id,
        name: item.name
      }));
      setFiliais(filiais);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadContas = useCallback(() => {
    const contas = userAuth.bank_data.map(item => ({
      id: item.id,
      account: item.account,
      bank_name: item.bank_name
    }))
    setContas(contas)
  }, [userAuth.bank_data]);

  const loadGroups = useCallback(async () => {
    const response = await api.get('/expense/groups');
    setGroups(response.data);
  }, []);
  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const loadDespesas = useCallback(async () => {
    try {
      const response = await api.get<ReponseData>('/despesa', {
        params: parms,
      })

      const { saldo_entrada, saldo_saida, saldo_total, despesas, expenses } = response.data;

      const entradas = selectedGroup === '' ? formatEntry(despesas
        .filter(item => item.tipo_despesa === 'ENTRADA'))
        : formatEntry(despesas.filter(item => item.tipo_despesa === 'ENTRADA'))
          .filter(item => filterGroup(selectedGroup, item.grupo.id));
      const saidas = selectedGroup === "" ?
        formatExit(expenses)
        : formatExit(expenses).filter(item => filterGroup(selectedGroup, item.group.id));

      setEntradas(entradas);
      setSaidas(saidas);
      setSaldos({
        saldo_entrada: formatPrice(saldo_entrada),
        saldo_saida: formatPrice(saldo_saida),
        saldo_total: formatPrice(saldo_total)
      })

    } catch (error) {
      console.warn(error);
    }
  }, [parms, selectedGroup]);

  useEffect(() => {
    loadDespesas();
    loadContas();
    loadFiliais();
    loadGroups()
  }, [loadDespesas, loadContas, loadFiliais, loadGroups]);

  const optionsFilial = filiais.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const optionsContas = contas.map(item => ({
    label: `${item.bank_name} - ${item.account}`,
    value: item.id,
  }));

  const optionsGroups = groups.map(item => ({
    label: item.name,
    value: item.id
  }))

  const initialParams = useCallback(() => {
    setParms({
      data_inicio: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      data_fim: format(new Date(), 'yyyy-MM-dd'),
    });
  }, []);

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value !== '') {
      setParms(prevState => ({
        ...prevState,
        escritorio: value
      }));
    } else {
      initialParams();
    }
  };


  const handleSelectContas = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value !== '') {
      setParms(prevState => ({
        ...prevState,
        conta: value
      }));
    } else {
      initialParams();
    }
  };

  const handleSelectGroups = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value !== '') {
      setSelectedGroup(value);
    } else {
      initialParams();
    }
  };

  const handleSubmit = ({ data_inicio, data_fim }) => {
    if (data_inicio !== '' && data_fim !== '') {
      setParms(prevState => ({
        ...prevState,
        data_inicio,
        data_fim
      }))
    }
  };

  const toogleCreateReportModal = useCallback(() => {
    setModalCreateReoport(!modalCreateReoport);
  }, [modalCreateReoport]);



  return (
    <FinancesLayout>
      <Container>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Cidade: </span>
                <select defaultValue={""} onChange={handleSelectCity}>
                  <option value="">Todas</option>
                  {optionsFilial.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </FiltersBottonItems>

              <FiltersBottonItems>
                <span>Contas: </span>
                <select defaultValue={""} onChange={handleSelectContas}>
                  <option value="">Todas</option>
                  {optionsContas.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </FiltersBottonItems>

              <FiltersBottonItems>
                <span>Grupo: </span>
                <select defaultValue={selectedGroup} onChange={handleSelectGroups}>
                  <option value="">Todas</option>
                  {optionsGroups.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </FiltersBottonItems>

              <FiltersBottonItems>
                <Form onSubmit={handleSubmit}>
                  <Input name="data_inicio" mask="date" type="date" />
                  <Input name="data_fim" mask="date" type="date" />
                  <Button type="submit">Filtrar</Button>
                </Form>
              </FiltersBottonItems>
            </FilterButtonGroup>
          </FiltersBotton>
        </FiltersContainer>

        <CashFlowContainer>
          <Tabs
            id="tab-container"
            className="tab-container"
            activeKey={typeTab}
            onSelect={tab => handleSetTab(tab)}
            variant="tabs"
          >
            <TabBootstrap eventKey="entry" title="Entradas">
              <TitlePane>Entradas</TitlePane>
              <CashFlowEntry entradas={entradas} />
            </TabBootstrap>
            <TabBootstrap eventKey="exits" title="Saídas">
              <TitlePane>Saídas</TitlePane>
              <CashFlowExits saidas={saidas} />
            </TabBootstrap>
            <TabBootstrap eventKey="bankBalances" title="Saldos">
              <CashFlowBalanceBanks
                saldos={saldos}
                entradas={entradas}
                saidas={saidas}
                listBanks={contas}
              />
            </TabBootstrap>
            <TabBootstrap eventKey="excel" title="Relatório">
              <Button onClick={toogleCreateReportModal}>Gerar Relatório</Button>
            </TabBootstrap>
          </Tabs>
        </CashFlowContainer>
      </Container>
      <ExportCashFlow isOpen={modalCreateReoport} setIsOpen={toogleCreateReportModal} />
    </FinancesLayout>
  );
}

export default CashFlow;