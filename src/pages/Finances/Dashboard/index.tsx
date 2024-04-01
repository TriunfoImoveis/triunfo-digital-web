import { Form } from '@unform/web';
import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';

import { Accordion, Card } from 'react-bootstrap';
import Switch from 'react-switch';
import Button from '../../../components/Button';
import Header from '../../../components/Header/SimpleHeader';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';
import {
  Container,
  Content,
  ContainerCards,
  Box,
  BoxContent,
  FiltersContainer,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
} from './styles';
import { useFetchFinances } from '../../../hooks/useFetchFinances';

interface Report {
  link_url: string;
}
interface Subsidiary {
  id: string;
  name: string;
}

interface Payment {
  brute: number;
  liquid: number;
}

interface Divison {
  id: string;
  name: string;
  value: number;
}
export interface Comercial {
  seller: Payment,
  captivator: Payment,
  coordinator: Payment,
  director: Payment,
  subsidiary: Payment,
}
export interface DashboardData {
  comercial: Comercial;
  tax: number;
  divisions?: Divison[];
}

interface DashboardParams {
  subsidiary?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

const DashboardFinances: React.FC = () => {
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [linkDownloadReportContas, setLinkDownloadReportContas] = useState('');
  const [linkDownloadReportRevenue, setLinkDownloadReportRevenue] = useState(
    '',
  );
  const [
    linkDownloadReportComissions,
    setLinkDownloadReportComissions,
  ] = useState('');

  const [isTimeSlot, setIsTimeSlot] = useState(false);

  const toogleIsTimeSlot = useCallback(() => {
    setIsTimeSlot(!isTimeSlot);
  }, [isTimeSlot]);

  const [dashboardParams, setDashboardParams] = useState<DashboardParams>({
    subsidiary: '',
    month,
    year
  })

  const {data: dashboardFinances} = useFetchFinances<DashboardData>({url: '/dashboard/finances', params: dashboardParams});
  const {data: subsidiaries} = useFetchFinances<Subsidiary[]>({url: '/subsidiary'});
 
  useEffect(() => {
    const LoadingReports = async () => {
      const contas = await api.get('/expense/export/excel');
      const revenue = await api.get('revenue/export/excel');
      const comissions = await api.get('/installment/export/excel');
      setLinkDownloadReportContas(contas.data.link_url);
      setLinkDownloadReportRevenue(revenue.data.link_url);
      setLinkDownloadReportComissions(comissions.data.link_url);
    };
    LoadingReports();
  }, []);

  const handleSubmit = ({ date_initial, date_final }) => {
    setDashboardParams(prevState => ({
      ...prevState,
      year: '',
      month: '',
      dateFrom: date_initial,
      dateTo: date_final
    }))
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const subsidiary = event.target.value;
    setDashboardParams(prevState => ({
      ...prevState,
     subsidiary
    }))
  };
  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setYear(year)
    setDashboardParams(prevState => ({
      ...prevState,
     year
    }))
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setMonth(month)
    setDashboardParams(prevState => ({
      ...prevState,
     month
    }))
  };

  return (
    <Container>
      <Header />
      <Content>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Filial: </span>
                <select defaultValue={''} onChange={handleSelectCity}>
                  <option value="">Todas</option>
                  {subsidiaries && subsidiaries?.map(subsidiary => (
                     <option key={subsidiary.id} value={subsidiary.id}>{subsidiary.name}</option>
                  ))}
                </select>
              </FiltersBottonItems>
              {!isTimeSlot ? (
                <>
                  <FiltersBottonItems>
                    <span>Ano: </span>
                    <select
                      disabled={isTimeSlot}
                      defaultValue={year}
                      onChange={handleSelectYear}
                    >
                      <option value={'2020'}>2021</option>
                      <option value={'2021'}>2021</option>
                      <option value={'2022'}>2022</option>
                      <option value={'2023'}>2023</option>
                      <option value={'2024'}>2024</option>
                      <option value={'2025'}>2025</option>
                      <option value={'2026'}>2026</option>
                      <option value={'2027'}>2027</option>
                      <option value={'2028'}>2028</option>
                      <option value={'2028'}>2028</option>
                      <option value={'2029'}>2029</option>
                      <option value={'2030'}>2030</option>
                    </select>
                  </FiltersBottonItems>

                  <FiltersBottonItems>
                    <span>Mês: </span>
                    <select
                      defaultValue={month}
                      onChange={handleSelectDate}
                      disabled={isTimeSlot}
                    >
                      <option value={''}>Todas</option>
                      <option value={'1'}>Janeiro</option>
                      <option value={'2'}>Fevereiro</option>
                      <option value={'3'}>Março</option>
                      <option value={'4'}>Abril</option>
                      <option value={'5'}>Maio</option>
                      <option value={'6'}>Junho</option>
                      <option value={'7'}>Julho</option>
                      <option value={'8'}>Agosto</option>
                      <option value={'9'}>Setembro</option>
                      <option value={'10'}>Outubro</option>
                      <option value={'11'}>Novembro</option>
                      <option value={'12'}>Dezembro</option>
                    </select>
                  </FiltersBottonItems>
                </>
              ) : (
                <FiltersBottonItems>
                  <Form onSubmit={handleSubmit}>
                    <Input name="date_initial" mask="date" type="date" />
                    <Input name="date_final" mask="date" type="date" />
                    <Button type="submit">Filtrar</Button>
                  </Form>
                </FiltersBottonItems>
              )}
              <FiltersBottonItems>
                <span>intervalo de tempo: </span>
                <Switch onChange={toogleIsTimeSlot} checked={isTimeSlot} />
              </FiltersBottonItems>
            </FilterButtonGroup>
          </FiltersBotton>
        </FiltersContainer>
        <Accordion defaultActiveKey="0" bsPrefix="dashboard">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Comercial
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ContainerCards>
                  <Box>
                    <BoxContent>
                      <strong>Pago ao Vendedor(Bruto)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.seller.brute || 0)}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago ao Vendedor(Liquido)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.seller.liquid || 0)}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago ao Captador(Bruto)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.captivator.brute || 0)}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago ao Captador(Liquido)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.captivator.liquid || 0)}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Coordenação(Bruto)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.coordinator.brute || 0)}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Coordenação(Liquido)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.coordinator.liquid || 0)}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Diretoria(Bruto)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.director.brute || 0)}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Diretoria(Liquido)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.director.liquid || 0)}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Filial (Bruto)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.subsidiary.brute || 0)}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Filial (Liquido)</strong>
                      <span>{formatPrice(dashboardFinances?.comercial.subsidiary.liquid || 0)}</span>
                    </BoxContent>
                  </Box>
                </ContainerCards>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Imposto
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Box>
                  <BoxContent>
                    <strong>Imposto Recolhido</strong>
                    <span>{formatPrice(dashboardFinances?.tax || 0)}</span>
                  </BoxContent>
                </Box>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Divisão Financeiro
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <ContainerCards>
                  {dashboardFinances?.divisions && dashboardFinances?.divisions.map(division => (
                    <Box key={division.id}>
                      <BoxContent>
                        <strong>{division.name}</strong>
                        <span>{formatPrice(division.value || 0)}</span>
                      </BoxContent>
                    </Box>
                  ))}
                </ContainerCards>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              Relatórios
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <ContainerCards>
                  <Box>
                    <a
                      href={linkDownloadReportContas}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gerar relatório de Entradas (Crédito e Despachante)
                    </a>
                  </Box>
                  <Box>
                    <a
                      href={linkDownloadReportRevenue}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gerar relatório de Despesas
                    </a>
                  </Box>
                  <Box>
                    <a
                      href={linkDownloadReportComissions}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gerar relatório de comissões
                    </a>
                  </Box>
                </ContainerCards>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Content>
    </Container>
  );
};

export default DashboardFinances;
