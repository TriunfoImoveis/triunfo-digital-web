import React, { useState, useEffect } from 'react';

import { Accordion, Card } from 'react-bootstrap';
import Header from '../../../components/Header/SimpleHeader';
import api from '../../../services/api';
import {
  generateDivionValue,
  generateImpostValue,
  generateValueBrute,
  generateValueLiquid,
} from '../../../utils/filters';
import { formatPrice } from '../../../utils/format';
import { Container, Content, ContainerCards, Box, BoxContent } from './styles';

interface Division {
  id: string;
  name: string;
  value: string;
}
const DashboardFinances: React.FC = () => {
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
    const loadCommercialData = async () => {
      const response = await api.get('/installment');
      const commercial = response.data.filter(item => item.calculation && item);
      const totalSubsidiaryBrute = generateValueBrute(commercial, 'EMPRESA');
      const totalSubsidiaryLiquid = generateValueLiquid(commercial, 'EMPRESA');
      const totalSallerBrute = generateValueBrute(commercial, 'VENDEDOR');
      const totalSallerLiquid = generateValueLiquid(commercial, 'VENDEDOR');
      const totalCaptvatorBrute = generateValueBrute(commercial, 'CAPTADOR');
      const totalCaptvatorLiquid = generateValueLiquid(commercial, 'CAPTADOR');
      const totalDirectorBrute = generateValueBrute(commercial, 'DIRETOR');
      const totalDirectorLiquid = generateValueLiquid(commercial, 'DIRETOR');
      const totalCoordinatorBrute = generateValueBrute(
        commercial,
        'COORDENADOR',
      );
      const totalCoordinatorLiquid = generateValueLiquid(
        commercial,
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
    };
    loadCommercialData();
  }, []);
  useEffect(() => {
    const loadImpost = async () => {
      const response = await api.get('/installment');
      const commercial = response.data.filter(item => item.calculation && item);
      const impost = generateImpostValue(commercial);
      setTaxCollected(formatPrice(impost));
    };
    loadImpost();
  }, []);
  useEffect(() => {
    const loadDivision = async () => {
      const responseDivisions = await api.get('/calculator/division_types');
      const disivionTypes = responseDivisions.data;
      const response = await api.get('/installment');
      const commercial = response.data.filter(
        item => item.calculation && item.calculation,
      );

      const data = disivionTypes.map(division => {
        const value = generateDivionValue(commercial, division.id);
        return {
          id: division.id,
          name: division.name,
          value: formatPrice(value),
        };
      });

      setDivisions(data);
    };
    loadDivision();
  }, []);
  return (
    <Container>
      <Header />
      <Content>
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
