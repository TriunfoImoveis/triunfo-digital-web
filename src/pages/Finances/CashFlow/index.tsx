import React, {useState, useCallback, useEffect, ChangeEvent} from 'react';
import { Form } from '@unform/web';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import api from '../../../services/api';
import {formatPrice} from '../../../utils/format';
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
} from './styles';
import { format } from 'date-fns';

interface Params {
  data_inicio: string;
  data_fim: string;
  escritorio?: string;
  conta?: string;
}
interface Filial {
  id: string;
  nome: string;
}

interface Conta {
  id: string
  conta: string;
  nome_banco: string;
}

interface Despesa {
  id: string;
  conta: Conta;
  escritorio: Filial;
  descricao: string;
  tipo_despesa: 'ENTRADA' | 'SAIDA';
  valor: string;
  data: string;
  created_at: string;
}

interface Saldos {
  saldo_entrada: string;
  saldo_saida: string;
  saldo_total: string;
}

interface ReponseData {
  saldo_entrada: number;
  saldo_saida: number;
  saldo_total: number;
  despesas: Despesa[];
}

const formatData = (data: Despesa[]): Despesa[] => {
  const dataFormated = data.map(item => {
    return {
      ...item,
      valor: formatPrice(Number(item.valor)),
      data: format(new Date(item.created_at), 'dd/MM/yyyy'),
    }
  });
  return dataFormated;
};

const CashFlow: React.FC = () => {
  const [typeTab, setTypeTab] = useState('entry');
  const [entradas, setEntradas] = useState<Despesa[]>([]);
  const [saidas, setSaidas] = useState<Despesa[]>([]);
  const [saldos, setSaldos] = useState({} as Saldos);
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [parms, setParms] = useState({
    data_inicio: '2021-01-01',
    data_fim: format(new Date(), 'yyyy-MM-dd'), 
  } as Params);



  const loadFiliais = useCallback(async () => {
    try {
      const response = await api.get('/escritorio');
      setFiliais(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadContas = useCallback(async () => {
    try {
      const response = await api.get('conta');
      setContas(response.data);
    } catch (error) {
      console.log(error);
    }
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

      const {saldo_entrada, saldo_saida, saldo_total} = response.data;
      const entradas = formatData(response.data.despesas.filter(item => item.tipo_despesa === 'ENTRADA'));
      const saidas = formatData(response.data.despesas.filter(item => item.tipo_despesa === 'SAIDA'));

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
  }, [parms]);

  useEffect(() => {
    loadDespesas();
    loadContas();
    loadFiliais();
  }, [loadDespesas, loadContas, loadFiliais]);

  const optionsFilial = filiais.map(item => ({
    label: item.nome,
    value: item.id,
  }));

  const optionsContas = contas.map(item => ({
    label: `${item.nome_banco} - ${item.conta}`,
    value: item.id,
  }));

  

  const initialParams = useCallback(() => {
    setParms({
      data_inicio: '2021-01-01',
      data_fim: format(new Date(), 'yyyy-MM-dd'), 
    });
  }, []);

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value !== '') {
      setParms(prevState => ({
        ...prevState,
        escritorio: event.target.value
      }));
    } else {
      initialParams();
    }
  }; 


  const handleSelectContas= (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value !== '') {
      setParms(prevState => ({
        ...prevState,
        conta: event.target.value
      }));
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
                  <Form onSubmit={handleSubmit}>
                    <Input name="data_inicio" mask="date" type="date" />
                    <Input name="data_fim" mask="date" type="date" />
                    <Button type="submit">Filtrar</Button>
                  </Form>
                </FiltersBottonItems>
            </FilterButtonGroup>
          </FiltersBotton>
        </FiltersContainer>

        <Tabs
        id="tab-container"
        className="tab-container"
        activeKey={typeTab}
        onSelect={tab => handleSetTab(tab)}
        variant="tabs"
      >
        <TabBootstrap eventKey="entry" title="Entradas">
          <CashFlowEntry entradas={entradas} />
        </TabBootstrap>
        <TabBootstrap eventKey="exits" title="Saídas">
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
      </Tabs>
      </Container>
    </FinancesLayout>
  );
}

export default CashFlow;