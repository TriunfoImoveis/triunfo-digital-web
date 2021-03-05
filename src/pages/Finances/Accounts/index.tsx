import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { SiOneplus } from 'react-icons/si';
import {
  FinancesIcons,
  CalculatorIcon,
  Search,
  Filter as FilterIcon,
  DropDownIcon,
} from '../../../assets/images';

import ModalAddAccount from '../../../components/ReactModal/AddAccount';

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
  Footer,
  ButtonGroup,
  BalanceAmount,
} from './styles';

const Account: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

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
              <Tabs
                id="tab-container"
                className="tab-container"
                activeKey={typeTab}
                onSelect={tab => handleSetTab(tab)}
                variant="tabs"
              >
                <TabBootstrap eventKey="fix" title="Contas Fixas">
                  <TitlePane>Contas Fixas</TitlePane>
                  <Table cols={6}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Conta de saída</th>
                        <th>Valor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>R$ 50.000,00</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="variable" title="Contas Variáveis">
                  <TitlePane>Contas Variáveis</TitlePane>
                  <Table cols={6}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Conta de saída</th>
                        <th>Valor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Fortaleza</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                      <tr>
                        <td>Teresina</td>
                        <td>Energia</td>
                        <td>10/03/2021</td>
                        <td>84548-8</td>
                        <td>R$ 1.400.00</td>
                        <td className="PAGO">PAGO</td>
                      </tr>
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>R$ 50.000,00</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
              </Tabs>
            </AccountContainer>
          </Content>
          <Footer>
            <ButtonGroup>
              <Link to="/financeiro/caixa">
                <FinancesIcons />
                <span>Caixa</span>
              </Link>

              <Link to="/financeiro/calculadora">
                <CalculatorIcon />
                <span>Calculadora</span>
              </Link>

              <button type="button" onClick={toggleModal}>
                <SiOneplus />
                <span>Adiconar nova conta</span>
              </button>
            </ButtonGroup>
          </Footer>
          <ModalAddAccount isOpen={modalOpen} setIsOpen={toggleModal} />
        </Container>
      </Background>
    </AdmLayout>
  );
};

export default Account;
