import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';

import { Accordion, Card } from 'react-bootstrap';
import Switch from 'react-switch';
import Header from '../../../components/Header/SimpleHeader';
import api from '../../../services/api';
import {
  filterDay,
  filterMonth,
  filterYear,
  generateDivionValue,
  generateImpostValue,
  generateValueBrute,
  generateValueLiquid,
} from '../../../utils/filters';
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

interface Division {
  id: string;
  name: string;
  value: string;
}

interface DivisionType {
  division_type: {
    id: string;
  };
  percentage: string;
  value: string;
}
interface Participantes {
  user?: string;
  participant_type: string;
  comission_percentage: string;
  comission_integral: string;
  tax_percentage?: number;
  tax_value?: string;
  comission_liquid: string;
}
interface CalculatorData {
  calculation: {
    note_value: string;
    participants: Participantes[];
    divisions: DivisionType[];
  };
}
const DashboardFinances: React.FC = () => {
  const [city] = useState('São Luís');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2021);
  const [checkedDay, setCheckedDay] = useState(true);
  const [sallerBrute, setSallerBrute] = useState('R$ 0,00');
  const [sallerLiquid, setSallerLiquid] = useState('R$ 0,00');
  const [captvatorBrute, setCaptvatorBrute] = useState('R$ 0,00');
  const [captvatorLiquid, setsetCaptvatorLiquid] = useState('R$ 0,00');
  const [coordinatorBrute, setCoordinatorBrute] = useState('R$ 0,00');
  const [coordinatorLiquid, setCoordinatorLiquid] = useState('R$ 0,00');
  const [directorBrute, setDirectorBrute] = useState('R$ 0,00');
  const [directorLiquid, setDirectorLiquid] = useState('R$ 0,00');
  const [SubsidiaryBrute, setSubsidiaryBrute] = useState('R$ 0,00');
  const [SubsidiaryLiquid, setSubsidiaryLiquid] = useState('R$ 0,00');
  const [taxCollected, setTaxCollected] = useState('R$ 0,00');
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [linkDownloadReportContas, setLinkDownloadReportContas] = useState('');
  const [linkDownloadReportRevenue, setLinkDownloadReportRevenue] = useState(
    '',
  );
  const [url, setUrl] = useState('/installment');
  const [salesCalculation, setSalesCalculation] = useState<CalculatorData[]>(
    [],
  );

  useEffect(() => {
    const LoadingReports = async () => {
      const contas = await api.get('/expense/export/excel');
      const revenue = await api.get('revenue/export/excel');
      setLinkDownloadReportContas(contas.data.link_url);
      setLinkDownloadReportRevenue(revenue.data.link_url);
    };
    LoadingReports();
  }, []);
  useEffect(() => {
    const loadDataSales = async () => {
      const response = await api.get(url);
      const salesCalculation = response.data.filter(
        item => item.calculation && item,
      );
      if (checkedDay) {
        setSalesCalculation(
          salesCalculation.filter(item => filterDay(item.pay_date)),
        );
      } else if (month > 0) {
        setSalesCalculation(
          salesCalculation
            .filter(item => filterYear(item.pay_date, year))
            .filter(item => filterMonth(item.pay_date, month)),
        );
      } else if (month === 0) {
        setSalesCalculation(
          salesCalculation.filter(item => filterYear(item.pay_date, year)),
        );
      } else {
        setSalesCalculation(salesCalculation);
      }
    };

    loadDataSales();
  }, [url, checkedDay, month, year]);
  useMemo(async () => {
    const totalSubsidiaryBrute = generateValueBrute(
      salesCalculation,
      'EMPRESA',
    );
    const totalSubsidiaryLiquid = generateValueLiquid(
      salesCalculation,
      'EMPRESA',
    );
    const totalSallerBrute = generateValueBrute(salesCalculation, 'VENDEDOR');
    const totalSallerLiquid = generateValueLiquid(salesCalculation, 'VENDEDOR');
    const totalCaptvatorBrute = generateValueBrute(
      salesCalculation,
      'CAPTADOR',
    );
    const totalCaptvatorLiquid = generateValueLiquid(
      salesCalculation,
      'CAPTADOR',
    );
    const totalDirectorBrute = generateValueBrute(salesCalculation, 'DIRETOR');
    const totalDirectorLiquid = generateValueLiquid(
      salesCalculation,
      'DIRETOR',
    );
    const totalCoordinatorBrute = generateValueBrute(
      salesCalculation,
      'COORDENADOR',
    );
    const totalCoordinatorLiquid = generateValueLiquid(
      salesCalculation,
      'COORDENADOR',
    );
    setSubsidiaryBrute(formatPrice(totalSubsidiaryBrute));
    setSubsidiaryLiquid(formatPrice(totalSubsidiaryLiquid));
    setSallerBrute(formatPrice(totalSallerBrute));
    setSallerLiquid(formatPrice(totalSallerLiquid));
    setCaptvatorBrute(formatPrice(totalCaptvatorBrute));
    setsetCaptvatorLiquid(formatPrice(totalCaptvatorLiquid));
    setCoordinatorBrute(formatPrice(totalCoordinatorBrute));
    setCoordinatorLiquid(formatPrice(totalCoordinatorLiquid));
    setDirectorBrute(formatPrice(totalDirectorBrute));
    setDirectorLiquid(formatPrice(totalDirectorLiquid));
  }, [salesCalculation]);
  useMemo(async () => {
    const impost = generateImpostValue(salesCalculation);
    setTaxCollected(formatPrice(impost));
  }, [salesCalculation]);
  useMemo(async () => {
    const responseDivisions = await api.get('/calculator/division_types');
    const disivionTypes = responseDivisions.data;

    const data = disivionTypes.map(division => {
      const value = generateDivionValue(salesCalculation, division.id);
      return {
        id: division.id,
        name: division.name,
        value: formatPrice(value),
      };
    });

    setDivisions(data);
  }, [salesCalculation]);

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    event.target.value === 'Todas'
      ? setUrl(`/installment`)
      : setUrl(`/installment?city=${event.target.value}`);
  };
  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };

  const handleChangeDay = () => {
    setCheckedDay(!checkedDay);
  };

  return (
    <Container>
      <Header />
      <Content>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Cidade: </span>
                <select defaultValue={city} onChange={handleSelectCity}>
                  <option value="Todas">Todas</option>
                  <option value="São Luís">São Luís</option>
                  <option value="Fortaleza">Fortaleza</option>
                  <option value="Teresina">Teresina</option>
                </select>
              </FiltersBottonItems>
              <FiltersBottonItems>
                <span>Ano: </span>
                <select
                  disabled={checkedDay}
                  defaultValue={year}
                  onChange={handleSelectYear}
                >
                  <option value={2021}>2021</option>
                  <option value={2022}>2022</option>
                  <option value={2023}>2023</option>
                </select>
              </FiltersBottonItems>

              <FiltersBottonItems>
                <span>Mês: </span>
                <select
                  defaultValue={month}
                  onChange={handleSelectDate}
                  disabled={checkedDay}
                >
                  <option value={0}>Todas</option>
                  <option value={1}>Janeiro</option>
                  <option value={2}>Fevereiro</option>
                  <option value={3}>Março</option>
                  <option value={4}>Abril</option>
                  <option value={5}>Maio</option>
                  <option value={6}>Junho</option>
                  <option value={7}>Julho</option>
                  <option value={8}>Agosto</option>
                  <option value={9}>Setembro</option>
                  <option value={10}>Outubro</option>
                  <option value={11}>Novembro</option>
                  <option value={12}>Dezembro</option>
                </select>
              </FiltersBottonItems>
              <FiltersBottonItems>
                <span>Dia: </span>
                <Switch onChange={handleChangeDay} checked={checkedDay} />
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
                      <span>{sallerBrute}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago ao Vendedor(Liquido)</strong>
                      <span>{sallerLiquid}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago ao Captador(Bruto)</strong>
                      <span>{captvatorBrute}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago ao Captador(Liquido)</strong>
                      <span>{captvatorLiquid}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Coordenação(Bruto)</strong>
                      <span>{coordinatorBrute}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Coordenação(Liquido)</strong>
                      <span>{coordinatorLiquid}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Diretoria(Bruto)</strong>
                      <span>{directorBrute}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Diretoria(Liquido)</strong>
                      <span>{directorLiquid}</span>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <strong>Pago a Filial (Bruto)</strong>
                      <span>{SubsidiaryBrute}</span>
                    </BoxContent>
                    <BoxContent>
                      <strong>Pago a Filial (Liquido)</strong>
                      <span>{SubsidiaryLiquid}</span>
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
                    <span>{taxCollected}</span>
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
                  {divisions.map(division => (
                    <Box key={division.id}>
                      <BoxContent>
                        <strong>{division.name}</strong>
                        <span>{division.value}</span>
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
                      href={linkDownloadReportRevenue}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gerar relatório de Entradas e Saídas
                    </a>
                  </Box>
                  <Box>
                    <a
                      href={linkDownloadReportContas}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gerar relatório de Contas Fixa e Variaveis
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
