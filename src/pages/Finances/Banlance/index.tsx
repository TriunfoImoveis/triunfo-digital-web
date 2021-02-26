import React, { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FinancesIcons,
  CalculatorIcon,
  BradescoIcon,
  Search,
  Filter as FilterIcon,
  DropDownIcon,
  AddEntry,
} from '../../../assets/images';

import AdmLayout from '../../Layouts/Adm';

import {
  Container,
  Header,
  SaldBanks,
  SaldBanksHeader,
  SaldBanksContainer,
  Content,
  Filters,
  Filter,
  BalanceContainer,
  TitlePane,
  Table,
  Footer,
  ButtonGroup,
  BalanceAmount,
} from './styles';

const Balance: React.FC = () => {
  const [isBankVisible, setIsBankVisible] = useState(true);

  return (
    <AdmLayout>
      <Container>
        <Header>
          <SaldBanksContainer>
            <SaldBanksHeader>
              <h1>Saldo dos Bancos</h1>
              <button
                type="button"
                onClick={() => setIsBankVisible(!isBankVisible)}
              >
                {isBankVisible ? (
                  <IoMdArrowDropup size={30} color="#C32925" />
                ) : (
                  <IoMdArrowDropdown size={30} color="#C32925" />
                )}
              </button>
            </SaldBanksHeader>
            {isBankVisible && (
              <SaldBanks>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                      <th>
                        <div>
                          <BradescoIcon />
                          <span>Bradesco</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                      <td>R$ 1.000,00</td>
                    </tr>
                  </tbody>
                </table>
              </SaldBanks>
            )}
          </SaldBanksContainer>
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
          <BalanceContainer>
            <Tabs
              id="tab-container"
              className="tab-container"
              defaultActiveKey="sales"
              variant="tabs"
            >
              <TabBootstrap eventKey="sales" title="Vendas">
                <TitlePane>Caixa de Entrada</TitlePane>
                <Table cols={8}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Filial</th>
                      <th>Descrição</th>
                      <th>Nome do Cliente</th>
                      <th>Valor bruto</th>
                      <th>Valor da nota</th>
                      <th>Taxa de imposto</th>
                      <th>Conta de entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                  </tbody>
                </Table>
                <BalanceAmount>
                  <p>
                    <span>Saldo Total</span>
                    <strong>R$ 50.000,00</strong>
                  </p>
                </BalanceAmount>
              </TabBootstrap>
              <TabBootstrap eventKey="forwardingAgent" title="Despachante">
                <TitlePane>Caixa de Entrada</TitlePane>
                <Table cols={6}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Filial</th>
                      <th>Descrição</th>
                      <th>Nome do Cliente</th>
                      <th>Valor bruto</th>
                      <th>Conta de entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>578769-6</td>
                    </tr>
                  </tbody>
                </Table>
                <BalanceAmount>
                  <p>
                    <span>Saldo Total</span>
                    <strong>R$ 50.000,00</strong>
                  </p>
                </BalanceAmount>
              </TabBootstrap>
              <TabBootstrap eventKey="credit" title="Crédito">
                <TitlePane>Recebimentos Futuros</TitlePane>
                <Table cols={8}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Filial</th>
                      <th>Descrição</th>
                      <th>Nome do Cliente</th>
                      <th>Valor bruto</th>
                      <th>Valor da nota</th>
                      <th>Taxa de imposto</th>
                      <th>Conta de entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                    <tr>
                      <td>29/11/2021</td>
                      <td>São Luis</td>
                      <td>Ilha Prime</td>
                      <td>---</td>
                      <td>R$ 10.000,00</td>
                      <td>---</td>
                      <td>---</td>
                      <td>578769-6</td>
                    </tr>
                  </tbody>
                </Table>
                <BalanceAmount>
                  <p>
                    <span>Saldo Total</span>
                    <strong>R$ 50.000,00</strong>
                  </p>
                </BalanceAmount>
              </TabBootstrap>
            </Tabs>
          </BalanceContainer>
        </Content>
        <Footer>
          <ButtonGroup>
            <Link to="/financeiro/contas">
              <FinancesIcons />
              <span>Contas</span>
            </Link>

            <Link to="#top">
              <CalculatorIcon />
              <span>Calculadora</span>
            </Link>
            <button type="button">
              <AddEntry />
              <span>Nova Entrada</span>
            </button>
          </ButtonGroup>
        </Footer>
      </Container>
    </AdmLayout>
  );
};

export default Balance;