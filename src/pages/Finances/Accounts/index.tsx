import React from 'react';
import { Link } from 'react-router-dom';
import {
  FinancesIcons,
  CalculatorIcon,
  Search,
  Filter as FilterIcon,
  DropDownIcon,
} from '../../../assets/images';

import AdmLayout from '../../Layouts/Adm';

import {
  Container,
  Header,
  Background,
  Content,
  Filters,
  Filter,
  AccountContainer,
  TitlePane,
  Table,
  Entry,
  Footer,
  ButtonGroup,
} from './styles';

const Balance: React.FC = () => {
  return (
    <AdmLayout>
      <Background>
        <Container>
          <Header>
            <h1>Contas</h1>
          </Header>
          <Content>
            <Filters>
              <Filter>
                <Search />
                <input placeholder="Buscar" />
              </Filter>
              <Filter className="filter">
                <FilterIcon />
                <select name="">
                  <option value="Todos">Filtrar por</option>
                </select>
                <DropDownIcon />
              </Filter>
              <Filter>
                <span>Filial</span>
                <select name="">
                  <option value="São Luís">São Luís</option>
                  <option value="Teresina">Teresina</option>
                  <option value="Fortaleza">Fortaleza</option>
                </select>
                <DropDownIcon />
              </Filter>
            </Filters>
            <AccountContainer>
              <Entry>
                <TitlePane>Contas Fixas</TitlePane>
                <Table cols={4}>
                  <thead>
                    <tr>
                      <th>Conta</th>
                      <th>Data de Pag.</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="PAGO">Pago</td>
                    </tr>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="VENCIDA">Pago</td>
                    </tr>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="PENDENTE">Pago</td>
                    </tr>
                    <tr className="total-row">
                      <td className="border-none" />
                      <td className="border-none">Saldo total</td>
                      <td className="total">R$ 25.0000,00</td>
                      <td className="border-none" />
                    </tr>
                  </tbody>
                </Table>
              </Entry>

              <Entry>
                <TitlePane>Contas Variáveis</TitlePane>
                <Table cols={4}>
                  <thead>
                    <tr>
                      <th>Conta</th>
                      <th>Data de Pag.</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="PAGO">Pago</td>
                    </tr>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="VENCIDA">Pago</td>
                    </tr>
                    <tr>
                      <td>Energia</td>
                      <td>06/03/2021</td>
                      <td>R$ 1.000,00</td>
                      <td className="PENDENTE">Pago</td>
                    </tr>
                    <tr className="total-row">
                      <td className="border-none" />
                      <td className="border-none">Saldo total</td>
                      <td className="total">R$ 25.0000,00</td>
                      <td className="border-none" />
                    </tr>
                  </tbody>
                </Table>
              </Entry>
            </AccountContainer>
          </Content>
          <Footer>
            <ButtonGroup>
              <Link to="#top">
                <FinancesIcons />
                <span>Contas</span>
              </Link>

              <Link to="#top">
                <CalculatorIcon />
                <span>Calculadora</span>
              </Link>
            </ButtonGroup>
          </Footer>
        </Container>
      </Background>
    </AdmLayout>
  );
};

export default Balance;
