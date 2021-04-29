import React, { useState, useCallback } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
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
import ModalAddEntrySale from '../../../components/ReactModal/AddEntrySales';
import ModalAddEntryCredit from '../../../components/ReactModal/AddEntryCredit';
import ModalAddEntryDesp from '../../../components/ReactModal/AddEntryDesp';

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
  Footer,
  ButtonGroup,
  SwitchButton,
} from './styles';
import TableBoxFinances from '../../../components/Finances/TableBoxFinances';

const Balance: React.FC = () => {
  const [typeTab, setTypeTab] = useState('sales');
  const [isBankVisible, setIsBankVisible] = useState(true);
  const [modalSaleEntry, setModalSaleEnrey] = useState(false);
  const [modalCreditEntry, setModalCreditEnrey] = useState(false);
  const [modalDespEntry, setModalDespEnrey] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const toogleModalSaleEntry = useCallback(() => {
    setModalSaleEnrey(!modalSaleEntry);
  }, [modalSaleEntry]);
  const toogleModalDespEntry = useCallback(() => {
    setModalDespEnrey(!modalDespEntry);
  }, [modalDespEntry]);
  const toogleModalCreditEntry = useCallback(() => {
    setModalCreditEnrey(!modalCreditEntry);
  }, [modalCreditEntry]);

  const handleSelectModalAddEntry = useCallback(() => {
    switch (typeTab) {
      case 'sales': {
        toogleModalSaleEntry();
        break;
      }
      case 'credit': {
        toogleModalCreditEntry();
        break;
      }
      case 'forwardingAgent': {
        toogleModalDespEntry();
        break;
      }

      default:
        break;
    }
  }, [
    typeTab,
    toogleModalSaleEntry,
    toogleModalDespEntry,
    toogleModalCreditEntry,
  ]);

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
          <SwitchButton>
            <span>Saídas</span>
            <Switch
              onChange={handleChange}
              checked={checked}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#DC3545"
              offColor="#DC3545"
            />
            <span>Entradas</span>
          </SwitchButton>
          <BalanceContainer>
            {checked ? (
              <TableBoxFinances
                typeTab={typeTab}
                handleSetTab={handleSetTab}
                title="Entradas"
              />
            ) : (
              <TableBoxFinances
                typeTab={typeTab}
                handleSetTab={handleSetTab}
                title="Saídas"
              />
            )}
          </BalanceContainer>
        </Content>
        <Footer>
          <ButtonGroup>
            <Link to="/financeiro/contas">
              <FinancesIcons />
              <span>Contas</span>
            </Link>

            <Link to="/financeiro/calculadora">
              <CalculatorIcon />
              <span>Calculadora</span>
            </Link>
            <button type="button" onClick={handleSelectModalAddEntry}>
              <AddEntry />
              <span>Nova Entrada</span>
            </button>
          </ButtonGroup>
        </Footer>
      </Container>
      <ModalAddEntrySale
        isOpen={modalSaleEntry}
        setIsOpen={toogleModalSaleEntry}
      />
      <ModalAddEntryDesp
        isOpen={modalDespEntry}
        setIsOpen={toogleModalDespEntry}
      />
      <ModalAddEntryCredit
        isOpen={modalCreditEntry}
        setIsOpen={toogleModalCreditEntry}
      />
    </AdmLayout>
  );
};

export default Balance;
