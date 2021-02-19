import React, { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import {
  BradescoIcon,
  Search,
  Filter as FilterIcon,
  DropDownIcon,
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
} from './styles';

const Balance: React.FC = () => {
  const [isBankVisible, setIsBankVisible] = useState(true);

  return (
    <AdmLayout>
      <Container>
        <Header>
          <SaldBanksContainer>
            <SaldBanksHeader showBanks={Number(isBankVisible)}>
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
                <TitlePane>Recebimentos Futuros</TitlePane>
                <Table>
                  <thead>
                    <tr>
                      <th>Vendedor</th>
                      <th>Data</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                    <tr>
                      <td>Corretor</td>
                      <td>29/11/2021</td>
                      <td>R$ 25.0000,00</td>
                    </tr>
                  </tbody>
                </Table>
              </TabBootstrap>
              <TabBootstrap eventKey="forwardingAgent" title="Despachante">
                <TitlePane>Recebimentos Futuros</TitlePane>
              </TabBootstrap>
              <TabBootstrap eventKey="credit" title="Crédito">
                <TitlePane>Recebimentos Futuros</TitlePane>
              </TabBootstrap>
            </Tabs>
          </BalanceContainer>
        </Content>
      </Container>
    </AdmLayout>
  );
};

export default Balance;
