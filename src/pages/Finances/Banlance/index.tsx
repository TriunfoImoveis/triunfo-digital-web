import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import Switch from 'react-switch';
import { Form } from '@unform/web';
import { AddEntry } from '../../../assets/images';
import theme from '../../../styles/theme';

import FinancesLayout from '../../Layouts/FinancesLayout';
import ModalAddEntryCredit from '../../../components/ReactModal/AddEntryCredit';
import ModalAddEntryDesp from '../../../components/ReactModal/AddEntryDesp';

import {
  Container,
  Content,
  BalanceContainer,
  Footer,
  ButtonGroup,
  SwitchButton,
  FiltersContainer,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
} from './styles';
import TableBoxFinances from '../../../components/Finances/TableBoxFinances';
import api from '../../../services/api';
import { DateBRL } from '../../../utils/format';
import { money } from '../../../utils/masked';
import TableBoxFinancesAccount from '../../../components/Finances/TableBoxFinancesAccounts';
import {
  filterMonth,
  filterTimeSlot,
  filterYear,
  generateValueBruteSubsidiary,
  generateValueBruteSubsidiaryLiquid,
} from '../../../utils/filters';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

type BalanceData = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  client: string;
  realtors: string;
  brute_value: string;
  brute_valueBRL: string;
  value_note: string;
  tax_rate: string;
  bank: string;
};
type EntryData = {
  id: string;
  pay_date: string;
  city: string;
  description: string;
  paying_source: string;
  brute_value: string;
  brute_valueBRL: string;
  tax_rate: string;
  value_note: string;
  empressBrute: string;
  empressLiquidBRL: string;
  empressLiquid: string;
  bank: string;
};
type ForwardingAgentData = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  client: string;
  liquid_value: string;
  liquid_valueBRL: string;
  bank: string;
};

type Account = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  value: number;
  valueBRL: string;
  user: string;
  bank: string;
};
const Balance: React.FC = () => {
  const [typeTabEntry, setTypeTabEntry] = useState('sales');
  const [typeTabAccount, setTypeTabAccount] = useState('account');
  const [city, setCity] = useState('');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2021);
  const [totalDispatcherEntry, setTotalDispatcherEntry] = useState('R$ 0,00');
  const [totalSalesEntry, setTotalSalesEntry] = useState('R$ 0,00');
  const [totalCreditEntry, setTotalCreditEntry] = useState('R$ 0,00');
  const [totalAccount, setTotalAccount] = useState('R$ 0,00');
  const [salesEntry, setSalesEntry] = useState<EntryData[]>([]);
  const [creditEntry, setCreditEntry] = useState<BalanceData[]>([]);
  const [account, setAccount] = useState<Account[]>([]);
  const [dispatcherEntry, setDispatcherEntry] = useState<ForwardingAgentData[]>(
    [],
  );

  const [modalCreditEntry, setModalCreditEnrey] = useState(false);
  const [modalDespEntry, setModalDespEnrey] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isTimeSlot, setIsTimeSlot] = useState(false);
  const [dateInitial, setDateInitial] = useState('');
  const [dateFinal, setDateFinal] = useState('');


  const orderByAscAccount = useCallback(function (a: Account, b: Account) {
    let data1 = new Date(a.due_date);
    let data2 = new Date(b.due_date);
    return data1 > data2 ? 0 : -1;
  }, []);

  const orderByAscSale = useCallback(function (a: EntryData, b: EntryData) {
    let data1 = new Date(a.pay_date);
    let data2 = new Date(b.pay_date);
    return data1 > data2 ? 0 : -1;
  }, []);

  const orderByAscCredit = useCallback(function (a: BalanceData, b: BalanceData) {
    let data1 = new Date(a.due_date);
    let data2 = new Date(b.due_date);
    return data1 > data2 ? 0 : -1;
  }, []);

  const orderByAscFowardAgent = useCallback(function (a: ForwardingAgentData, b: ForwardingAgentData) {
    let data1 = new Date(a.due_date);
    let data2 = new Date(b.due_date);
    return data1 > data2 ? 0 : -1;
  }, []);

  useEffect(() => {
    const loadingSalesEntry = async () => {
      const url = city === '' ? `/installment?status=LIQUIDADA` : `/installment?city=${city}&status=LIQUIDADA`
      const response = await api.get(url);
      if (isTimeSlot && dateInitial.length !== 0) {
        const entry = response.data.filter(item =>
          filterTimeSlot(item.calculation.pay_date, dateInitial, dateFinal),
        ).sort(orderByAscSale);
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.calculation.pay_date),
            city: item.sale.sale_has_sellers[0].subsidiary.city,
            description: `${item.installment_number}° Parcela - ${item.sale.realty.enterprise}`,
            paying_source: `${item.sale.sale_type === 'NOVO'
              ? item.sale.builder.name
              : item.sale.client_buyer.name
              }`,
            brute_value: item.value ? Number(item.value) : 0,
            brute_valueBRL: item.value ? money(Number(item.value)) : 'R$ 0,00',
            tax_rate: item.calculation.tax_rate_nf
              ? item.calculation.tax_rate_nf
              : '0%',
            value_note: item.calculation.note_value
              ? money(Number(item.calculation.note_value))
              : 'R$ 0,00',
            empressBrute: money(generateValueBruteSubsidiary(item)),
            empressLiquidBRL: money(generateValueBruteSubsidiaryLiquid(item)),
            empressLiquid: generateValueBruteSubsidiaryLiquid(item),
            bank: item.calculation.bank_data
              ? `${item.calculation.bank_data.account}`
              : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.empressLiquid);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalSalesEntry(money(Number(total)));
        } else {
          setTotalSalesEntry(money(0));
        }

        setSalesEntry(dataFormated);
      } else if (month > 0) {
        const entry = response.data
          .filter(item => filterMonth(item.calculation.pay_date, month))
          .filter(item => filterYear(item.calculation.pay_date, year));
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.calculation.pay_date),
            city: item.sale.sale_has_sellers[0].subsidiary.city,
            description: `${item.installment_number}° Parcela - ${item.sale.realty.enterprise}`,
            paying_source: `${item.sale.sale_type === 'NOVO'
              ? item.sale.builder.name
              : item.sale.client_buyer.name
              }`,
            brute_value: item.value ? Number(item.value) : 0,
            brute_valueBRL: item.value ? money(Number(item.value)) : 'R$ 0,00',
            tax_rate: item.calculation.tax_rate_nf
              ? item.calculation.tax_rate_nf
              : '0%',
            value_note: item.calculation.note_value
              ? money(Number(item.calculation.note_value))
              : 'R$ 0,00',
            empressBrute: money(generateValueBruteSubsidiary(item)),
            empressLiquidBRL: money(generateValueBruteSubsidiaryLiquid(item)),
            empressLiquid: generateValueBruteSubsidiaryLiquid(item),
            bank: item.calculation.bank_data
              ? `${item.calculation.bank_data.account}`
              : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.empressLiquid);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalSalesEntry(money(Number(total)));
        } else {
          setTotalSalesEntry(money(0));
        }

        setSalesEntry(dataFormated);
      } else {
        const entry = response.data.filter(item =>
          filterYear(item.calculation.pay_date, year),
        );
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.calculation.pay_date),
            city: item.sale.sale_has_sellers[0].subsidiary.city,
            description: `${item.installment_number}° Parcela - ${item.sale.realty.enterprise}`,
            paying_source: `${item.sale.sale_type === 'NOVO'
              ? item.sale.builder.name
              : item.sale.client_buyer.name
              }`,
            brute_value: item.value ? Number(item.value) : 0,
            brute_valueBRL: item.value ? money(Number(item.value)) : 'R$ 0,00',
            tax_rate: item.calculation.tax_rate_nf
              ? item.calculation.tax_rate_nf
              : '0%',
            value_note: item.calculation.note_value
              ? money(Number(item.calculation.note_value))
              : 'R$ 0,00',
            empressBrute: money(generateValueBruteSubsidiary(item)),
            empressLiquidBRL: money(generateValueBruteSubsidiaryLiquid(item)),
            empressLiquid: generateValueBruteSubsidiaryLiquid(item),
            bank: item.calculation.bank_data
              ? `${item.calculation.bank_data.account}`
              : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.empressLiquid);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalSalesEntry(money(total));
        } else {
          setTotalSalesEntry(money(0));
        }

        setSalesEntry(dataFormated);
      }
    };
    loadingSalesEntry();
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, orderByAscSale]);

  useEffect(() => {
    const loadingDispachEntry = async () => {
      const response = await api.get(`/revenue`);
      const dispachEntry = response.data
        .filter(item => {
          if (item.subsidiary.city === city) {
            return item;
          } else if (city === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
        .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
        .filter(item => item.pay_date !== null && item).sort(orderByAscFowardAgent);
      if (isTimeSlot && dateInitial.length !== 0) {
        const entry = dispachEntry.filter(item =>
          filterTimeSlot(item.pay_date, dateInitial, dateFinal),
        );

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.liquid_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDispatcherEntry(money(total));
        } else {
          setTotalDispatcherEntry(money(0));
        }

        setDispatcherEntry(dataFormated);
      } else if (!isTimeSlot && month > 0) {
        const entry = dispachEntry
          .filter(item => filterMonth(item.pay_date, month))
          .filter(item => filterYear(item.pay_date, year));

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.liquid_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDispatcherEntry(money(total));
        } else {
          setTotalDispatcherEntry(money(0));
        }

        setDispatcherEntry(dataFormated);
      } else {
        const entry = dispachEntry.filter(item =>
          filterYear(item.pay_date, year),
        );

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.liquid_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDispatcherEntry(money(Number(total)));
        } else {
          setTotalDispatcherEntry(money(0));
        }

        setDispatcherEntry(dataFormated);
      }
    };
    loadingDispachEntry();
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, orderByAscFowardAgent]);
  useEffect(() => {
    const loadingCreditEntry = async () => {
      const response = await api.get(`/revenue`);
      const entryCredit = response.data
        .filter(item => {
          if (item.subsidiary.city === city) {
            return item;
          } else if (city === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
        .filter(item => item.revenue_type.includes('CREDITO') && item)
        .filter(item => item.pay_date !== null && item).sort(orderByAscCredit);

      if (isTimeSlot && dateInitial.length !== 0) {
        const entry = entryCredit.filter(item =>
          filterTimeSlot(item.pay_date, dateInitial, dateFinal),
        );

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
            client: item.client,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCreditEntry(money(total));
        } else {
          setTotalCreditEntry(money(0));
        }

        setCreditEntry(dataFormated);
      } else if (month > 0) {
        const entry = entryCredit
          .filter(item => filterMonth(item.pay_date, month))
          .filter(item => filterYear(item.pay_date, year));

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
            client: item.client,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCreditEntry(money(total));
        } else {
          setTotalCreditEntry(money(0));
        }

        setCreditEntry(dataFormated);
      } else {
        const entry = entryCredit.filter(item =>
          filterYear(item.pay_date, year),
        );
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data ? `${item.bank_data.account}` : '-----',
            client: item.client,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCreditEntry(money(total));
        } else {
          setTotalCreditEntry(money(0));
        }

        setCreditEntry(dataFormated);
      }
    };
    loadingCreditEntry();
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, orderByAscCredit]);

  useEffect(() => {
    const loadingAccounts = async () => {
      const response = await api.get(`/expense`);
      const despense = response.data
        .filter(item => {
          if (item.subsidiary.city === city) {
            return item;
          } else if (city === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
        .filter(item => item.pay_date !== null && item).sort(orderByAscAccount);
      if (isTimeSlot && dateInitial.length !== 0) {
        const entry = despense.filter(item =>
          filterTimeSlot(item.pay_date, dateInitial, dateFinal),
        );

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data ? item.bank_data.account : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalAccount(money(Number(total)));
        } else {
          setTotalAccount(money(0));
        }

        setAccount(dataFormated);
      } else if (month > 0) {
        const entry = despense
          .filter(item => filterMonth(item.pay_date, month))
          .filter(item => filterYear(item.pay_date, year));

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data ? item.bank_data.account : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalAccount(money(Number(total)));
        } else {
          setTotalAccount(money(0));
        }

        setAccount(dataFormated);
      } else {
        const entry = despense.filter(item => filterYear(item.pay_date, year));
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city: item.subsidiary.city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data ? item.bank_data.account : '-----',
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalAccount(money(Number(total)));
        } else {
          setTotalAccount(money(0));
        }

        setAccount(dataFormated);
      }
    };
    loadingAccounts();
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, orderByAscAccount]);

  const toogleIsTimeSlot = useCallback(() => {
    setIsTimeSlot(!isTimeSlot);
  }, [isTimeSlot]);

  const handleSetTabEntry = (tabName: string | null) => {
    if (tabName) {
      setTypeTabEntry(tabName);
    }
  };
  const handleSetTabAccount = (tabName: string | null) => {
    if (tabName) {
      setTypeTabAccount(tabName);
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const toogleModalDespEntry = useCallback(() => {
    setModalDespEnrey(!modalDespEntry);
  }, [modalDespEntry]);
  const toogleModalCreditEntry = useCallback(() => {
    setModalCreditEnrey(!modalCreditEntry);
  }, [modalCreditEntry]);

  const handleSelectModalAddEntry = useCallback(() => {
    switch (typeTabEntry) {
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
    typeTabEntry,
    toogleModalDespEntry,
    toogleModalCreditEntry,
  ]);

  const handleSubmit = ({ date_initial, date_final }) => {
    setDateInitial(date_initial);
    setDateFinal(date_final);
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };
  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };

  return (
    <FinancesLayout>
      <Container>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Cidade: </span>
                <select defaultValue={city} onChange={handleSelectCity}>
                  <option value="">Todas</option>
                  <option value="São Luís">São Luís</option>
                  <option value="Fortaleza">Fortaleza</option>
                  <option value="Teresina">Teresina</option>
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
                      disabled={isTimeSlot}
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

        <Content>
          <SwitchButton>
            <span>Saídas</span>
            <Switch
              onChange={handleChange}
              checked={checked}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor={theme.colors.gold}
              offColor={theme.colors.gold}
            />
            <span>Entradas</span>
          </SwitchButton>
          <BalanceContainer>
            {checked ? (
              <TableBoxFinances
                typeTab={typeTabEntry}
                handleSetTab={handleSetTabEntry}
                title="Entradas"
                salesEntry={salesEntry}
                salesEntryTotal={totalSalesEntry}
                dispatcherEntry={dispatcherEntry}
                dispatcherEntryTotal={totalDispatcherEntry}
                creditEntry={creditEntry}
                creditEntryTotal={totalCreditEntry}
              />
            ) : (
              <TableBoxFinancesAccount
                typeTab={typeTabAccount}
                handleSetTab={handleSetTabAccount}
                title="Saídas"
                account={account}
                accountTotal={totalAccount}
              />
            )}
          </BalanceContainer>
        </Content>
        {typeTabEntry !== 'sales' && (
          <Footer>
            <ButtonGroup>
              <button type="button" onClick={handleSelectModalAddEntry}>
                <AddEntry />
                <span>Nova Entrada</span>
              </button>
            </ButtonGroup>
          </Footer>
        )}

      </Container>
      <ModalAddEntryDesp
        isOpen={modalDespEntry}
        setIsOpen={toogleModalDespEntry}
      />
      <ModalAddEntryCredit
        isOpen={modalCreditEntry}
        setIsOpen={toogleModalCreditEntry}
      />
    </FinancesLayout>
  );
};

export default Balance;
