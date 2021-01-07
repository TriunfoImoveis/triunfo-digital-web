import React, { useEffect } from 'react';
import { RouteProps, useLocation } from 'react-router-dom';
import AdmLayout from '../../Layouts/Adm';

import {
  Export,
  TableSaleWrapper,
  Footer,
  Header,
  Table,
  Body,
} from './styles';

type ReportProps = RouteProps;
const ReportSale: React.FC<ReportProps> = ({ location }) => {
  return (
    <AdmLayout>
      {console.log(location)}
      <Export>
        <button type="button">Exportar para PDF</button>
      </Export>
      <TableSaleWrapper>
        <Table>
          <Header>
            <th>Vendedor/Construtora</th>
            <th>Tipo</th>
            <th>Lançado em</th>
            <th>Comprador</th>
            <th>Imovél</th>
            <th>Valor de Venda</th>

            <th>% da Venda</th>
            <th>Corrertor</th>
            <th>Coordenação</th>
          </Header>
          <Body>
            <tr>
              <td>WC</td>
              <td>USADO</td>
              <td>18/08/2020</td>
              <td>Maria das Neves</td>
              <td>Vila Lagoa</td>
              <td>R$ 280.000,00</td>
              <td>5</td>
              <td>Rafael Serejo</td>
              <td>Rossilene Samapio</td>
            </tr>
          </Body>
        </Table>
      </TableSaleWrapper>
      <Footer>
        <button type="button">Voltar</button>
      </Footer>
    </AdmLayout>
  );
};

export default ReportSale;
