import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import Switch from 'react-switch';
import { getMonth, getYear, isToday, parseISO } from 'date-fns';
import { AddEntry } from '../../../assets/images';

import FinancesLayout from '../../Layouts/FinancesLayout';
import ModalAddEntrySale from '../../../components/ReactModal/AddEntrySales';
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
  const [city, setCity] = useState('São Luís');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2021);
  const [checkedDay, setCheckedDay] = useState(true);
  const [totalDispatcherEntry, setTotalDispatcherEntry] = useState('R$ 0,00');
  const [totalSalesEntry, setTotalSalesEntry] = useState('R$ 0,00');
  const [totalCreditEntry, setTotalCreditEntry] = useState('R$ 0,00');
  const [totalAccount, setTotalAccount] = useState('R$ 0,00');
  const [salesEntry, setSalesEntry] = useState<BalanceData[]>([]);
  const [creditEntry, setCreditEntry] = useState<BalanceData[]>([]);
  const [account, setAccount] = useState<Account[]>([]);
  const [dispatcherEntry, setDispatcherEntry] = useState<ForwardingAgentData[]>(
    [],
  );

  const [modalSaleEntry, setModalSaleEnrey] = useState(false);
  const [modalCreditEntry, setModalCreditEnrey] = useState(false);
  const [modalDespEntry, setModalDespEnrey] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadingSalesEntry = async () => {
      const response = await api.get(`/installment?city=${city}&status=PAGO`);
      if (checkedDay) {
        const entry = response.data
          .filter(item => item.calculation !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: `${item.installment_number}° Parcela, ${
              item.sale.realty.enterprise
            } de ${money(Number(item.sale.realty_ammount))}`,
            brute_value:
              item.calculation !== null ? Number(item.calculation.balance) : 0,
            brute_valueBRL:
              item.calculation !== null
                ? money(Number(item.calculation.balance))
                : '--------',
            value_note:
              item.calculation !== null
                ? money(Number(item.calculation.note_value))
                : '------',
            tax_rate:
              item.calculation !== null
                ? item.calculation.tax_rate_nf
                : '------',
            bank: item.bank_data ? item.bank_data : '-----',
            realtors: item.sale.sale_has_sellers
              .map(realtor => realtor.name)
              .toString(),
            client: item.sale.client_buyer.name,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
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
          .filter(item => item.calculation !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: `${item.installment_number}° Parcela, ${
              item.sale.realty.enterprise
            } de ${money(Number(item.sale.realty_ammount))}`,
            brute_value:
              item.calculation !== null ? Number(item.calculation.balance) : 0,
            brute_valueBRL:
              item.calculation !== null
                ? money(Number(item.calculation.balance))
                : '--------',
            value_note:
              item.calculation !== null
                ? money(Number(item.calculation.note_value))
                : '------',
            tax_rate:
              item.calculation !== null
                ? item.calculation.tax_rate_nf
                : '------',
            bank: item.bank_data ? item.bank_data : '-----',
            realtors: item.sale.sale_has_sellers
              .map(realtor => realtor.name)
              .toString(),
            client: item.sale.client_buyer.name,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalSalesEntry(money(Number(total)));
        } else {
          setTotalSalesEntry(money(0));
        }

        setSalesEntry(dataFormated);
      } else {
        const entry = response.data
          .filter(item => item.calculation !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: `${item.installment_number}° Parcela, ${
              item.sale.realty.enterprise
            } de ${money(Number(item.sale.realty_ammount))}`,
            brute_value:
              item.calculation !== null ? Number(item.calculation.balance) : 0,
            brute_valueBRL:
              item.calculation !== null
                ? money(Number(item.calculation.balance))
                : '--------',
            value_note:
              item.calculation !== null
                ? money(Number(item.calculation.note_value))
                : '------',
            tax_rate:
              item.calculation !== null
                ? item.calculation.tax_rate_nf
                : '------',
            bank: item.bank_data ? item.bank_data : '-----',
            realtors: item.sale.sale_has_sellers
              .map(realtor => realtor.name)
              .toString(),
            client: item.sale.client_buyer.name,
          };
        });
        if (entry.length > 0) {
          const arrayValues = dataFormated.map(item => item.brute_value);
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
  }, [city, month, checkedDay, year]);

  useEffect(() => {
    const loadingDispachEntry = async () => {
      const response = await api.get(`/revenue`);
      if (checkedDay) {
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data.account,
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
      } else if (month > 0) {
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data.account,
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
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.due_date),
            city,
            description: item.description,
            client: item.description,
            liquid_value: item.value_liquid,
            liquid_valueBRL: money(Number(item.value_liquid)),
            bank: item.bank_data.account,
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
  }, [city, month, checkedDay, year]);
  useEffect(() => {
    const loadingCreditEntry = async () => {
      const response = await api.get(`/revenue`);
      if (checkedDay) {
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data.name ? item.bank_data.name : '-----',
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
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data.name ? item.bank_data.name : '-----',
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
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            brute_value: Number(item.value_liquid),
            brute_valueBRL: money(Number(item.value_liquid)),
            value_note: item.invoice_value ? item.invoice_value : '------',
            tax_rate: item.tax_rate ? item.tax_rate : '------',
            bank: item.bank_data.name ? item.bank_data.name : '-----',
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
  }, [city, month, checkedDay, year]);
  useEffect(() => {
    const loadingCreditEntry = async () => {
      const response = await api.get(`/expense`);
      if (checkedDay) {
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data.bank_name,
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
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data.bank_name,
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
        const entry = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.pay_date !== null && item)
          .filter(item => {
            const parsedDate = parseISO(item.pay_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });
        const dataFormated = entry.map(item => {
          return {
            id: item.id,
            due_date: DateBRL(item.pay_date),
            city,
            description: item.description,
            value: Number(item.value_paid),
            valueBRL: money(Number(item.value_paid)),
            user: item.user.name,
            bank: item.bank_data.bank_name,
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
    loadingCreditEntry();
  }, [city, month, checkedDay, year]);

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
    switch (typeTabEntry) {
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
    typeTabEntry,
    toogleModalSaleEntry,
    toogleModalDespEntry,
    toogleModalCreditEntry,
  ]);

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
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
    <FinancesLayout>
      <Container>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Cidade: </span>
                <select defaultValue={city} onChange={handleSelectCity}>
                  <option value="São Luís">São Luís</option>
                  <option value="Fortaleza">Fortaleza</option>
                  <option value="Teresina">Teresina</option>
                </select>
              </FiltersBottonItems>
              <FiltersBottonItems>
                <span>Ano: </span>
                <select
                  disabled={checked}
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
                  disabled={checked}
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

        <Content>
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
        <Footer>
          <ButtonGroup>
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
    </FinancesLayout>
  );
};

export default Balance;
