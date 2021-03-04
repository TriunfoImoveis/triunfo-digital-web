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
                        <th>Data</th>
                        <th>Conta de Saída</th>
                        <th>Valor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>São Luís</td>
                        <td>Conta de Energia</td>
                        <td>04/03/2021</td>
                        <td>7824587-8</td>
                        <td>R$ 180,00</td>
                        <td className="PAGO">Pago</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Conta de Energia</td>
                        <td>04/03/2021</td>
                        <td>7824587-8</td>
                        <td>R$ 180,00</td>
                        <td className="PAGO">Pago</td>
                      </tr>
                      <tr>
                        <td>São Luís</td>
                        <td>Conta de Energia</td>
                        <td>04/03/2021</td>
                        <td>7824587-8</td>
                        <td>R$ 180,00</td>
                        <td className="PAGO">Pago</td>
                      </tr>
                      <tr className="total-row">
                        <td>São Luís</td>
                        <td>Conta de Energia</td>
                        <td>04/03/2021</td>
                        <td>7824587-8</td>
                        <td>R$ 180,00</td>
                        <td className="PAGO">Pago</td>
                      </tr>
                      <tr className="total-row">
                        <td className="border-none" />
                        <td className="border-none" />
                        <td className="border-none" />
                        <td className="border-none">Saldo total</td>
                        <td className="total">R$ 25.0000,00</td>
                        <td className="border-none" />
                      </tr>
                    </tbody>
                  </Table>
                </TabBootstrap>
                <TabBootstrap eventKey="variable" title="Contas Variáveis">
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
                </TabBootstrap>
              </Tabs>
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
