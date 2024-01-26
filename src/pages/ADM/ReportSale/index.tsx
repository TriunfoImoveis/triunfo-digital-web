import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import ExportReport from '../../../components/ReactModal/ExportReport';
import { DateBRL, formatPrice } from '../../../utils/format';
import AdmLayout from '../../Layouts/Adm';
import { AiOutlineDownload } from "react-icons/ai";


import {
  TableSaleWrapper,
  Footer,
  Header,
  Table,
  Body,
  FiltersContainer,
  FiltersTop,
  Input,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
} from './styles';
import { Search } from '../../../assets/images';
import { getMonth } from 'date-fns';
import { useFilter } from '../../../context/FilterContext';
import { useFetch } from '../../../hooks/useFetch';
import { optionYear } from '../../../utils/loadOptions';
import { useAuth } from '../../../context/AuthContext';
import { isFullAccessAdmin } from './utils';

interface IReport {
  id: string;
  builder?: string;
  sallers: string[];
  captivators?: string[];
  sale_date: string;
  client_buyer: string;
  realty: string;
  type_sale: string;
  realty_ammount: string;
  percentage_sale: string;
}

interface ISallers {
  name: string;
}
interface ISaleData {
  id: string;
  bonus?: string;
  builder: {
    id: string;
    name: string;
  };
  client_buyer: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  installments: {
    due_date: string;
    id: string;
    installment_number: number;
    value: string;
  }[];
  client_seller?: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  commission: string;
  company?: {
    id: string;
    name: string;
    percentage: number;
  };
  origin: {
    id: string;
    name: string;
  };
  payment_type: {
    id: string;
    name: string;
  };
  percentage_company: number;
  percentage_sale: number;
  realty: {
    city: string;
    enterprise: string;
    id: string;
    neighborhood: string;
    property: {
      id: string;
      name: string;
    };
    state: string;
    unit: string;
  };
  realty_ammount: string;
  sale_date: string;
  sale_has_captivators: Array<ISallers>;
  sale_has_sellers: Array<ISallers>;
  sale_type: string;
  status: string;
  user_coordinator?: {
    id: string;
    name: string;
  };

  users_directors: {
    id: string;
    name: string;
  }[];
}

interface ISubsidiary {
  id: string;
  city: string;
  state: string;
  name: string;
}

interface IParamsFilterSales {
  name?: string;
  subsidiaryId?: string;
  status?: string;
  year?: number | string;
  month?: number | string;
}

const ReportSale: React.FC = () => {
  const [modalCreateReoport, setModalCreateReoport] = useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = getMonth(new Date()) + 1;
  const {userAuth} = useAuth();
  const isFullAcess = isFullAccessAdmin(userAuth.office.name);
    const {
    status,
    handleSetStatus,
    handleSetName,
    handleSetFiliais,
  } = useFilter();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const { data: subsidiaries } = useFetch<ISubsidiary[]>(`/subsidiary`);
  const optionsYear = optionYear.filter(year => year.value <= currentYear);
  const [params, setParams] = useState({
    subsidiaryId: !isFullAcess ? userAuth.subsidiary.id : '',
    status,
    month: currentMonth,
    year: currentYear   
  } as IParamsFilterSales);
  const { data: sales } = useFetch<ISaleData[]>('/sale', params);

  const formatSale = (sales: ISaleData[]): IReport[] => {
    const saleFormated = sales.map(sale => ({
      id: sale.id,
      sallers: sale.sale_has_sellers.map(salle => salle.name),
      sale_date: DateBRL(sale.sale_date),
      client_buyer: sale.client_buyer.name,
      builder: sale.sale_type === 'NOVO' ? sale.builder.name : '',
      realty: sale.realty.enterprise,
      realty_ammount: formatPrice(Number(sale.realty_ammount)),
      percentage_sale: sale.percentage_sale.toString(),
      type_sale: sale.sale_type,
    }));
    return saleFormated;
  };

  const listSales = useMemo(() => {
    if (!sales) {
      return [];
    }
   
    const salesFormatted = formatSale(sales);
    return salesFormatted;
  }, [sales]);

  

  const toogleCreateReportModal = useCallback(() => {
    setModalCreateReoport(!modalCreateReoport);
  }, [modalCreateReoport]);

  

  const handleSelectSubsidiaries = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetFiliais(event.target.value);
    const subsidiaryId = event.target.value
    setParams(prevState => ({
      ...prevState,
      subsidiaryId
    }))
  };
  const handleSelectedStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetStatus(event.target.value);
    const status = event.target.value
    setParams(prevState => ({
      ...prevState,
      status
    }))
  };

  const searchRealtorByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      handleSetName(name);
      if (name.length > 0) {
        setParams(prevState => ({
          ...prevState,
          name
        }))
      } else {
        setParams(prevState => ({
          ...prevState,
          name: ''
        }))
      }
      return;
    },
    [handleSetName],
  );

  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.currentTarget.value));
    const month = Number(event.currentTarget.value)
    setParams(prevState => ({
      ...prevState,
      month: month === 0 ? '' : month
    }))

  };

  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.currentTarget.value));
    const year = Number(event.currentTarget.value)
    setParams(prevState => ({
      ...prevState,
      year: year === 0 ? '' : year
    }))
  };

  return (
    <AdmLayout>
      <form style={{ width: '100%' }}>
        <FiltersContainer>
          <FiltersTop>
            <Input>
              <Search />
              <input
                type="text"
                placeholder="Nome do corretor"
                onChange={searchRealtorByName}
              />
            </Input>
          </FiltersTop>
          <FiltersBotton>
            <FilterButtonGroup>
              { isFullAcess&& (
                <FiltersBottonItems>
                <span>Estado: </span>
                <select defaultValue={''} onChange={handleSelectSubsidiaries}>
                  <option value={''}>Todas</option>
                  {subsidiaries && subsidiaries.map(subsidiary => (
                    <option key={subsidiary.id} value={subsidiary.id}>{subsidiary.name}</option>
                  ))}
                </select>
              </FiltersBottonItems>
              )}
              <FiltersBottonItems>
                <span>Status da Venda: </span>
                <select defaultValue={status} onChange={handleSelectedStatus}>
                  <option value={''}>Todas</option>
                  <option value="NAO_VALIDADO">NÃO VALIDADO</option>
                  <option value="PENDENTE">PENDENTE DE PAGAMENTO</option>
                  <option value="PAGO_TOTAL">PAGO</option>
                  <option value="CAIU">CAIU</option>
                </select>
              </FiltersBottonItems>
              <FiltersBottonItems>
                <span>Mês: </span>
                <select defaultValue={month} onChange={handleSelectDate}>
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
                <span>Ano: </span>
                <select defaultValue={year} onChange={handleSelectYear}>
                  <option value={''}>Todas</option>
                  {optionsYear.map(year => (
                    <option value={year.value}>{year.value}</option>
                  ))}
                </select>
              </FiltersBottonItems>
              <FiltersBottonItems>
                <span>Baixar relatório</span>
                <button type="button" onClick={toogleCreateReportModal}>
                  <AiOutlineDownload size={30} color='#BAA05C' />
                </button>
              </FiltersBottonItems>
            </FilterButtonGroup>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <TableSaleWrapper>
        <Table>
          <Header>
            <th>Vendedor</th>
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
            {listSales.map(sale => (
              <tr>
                <td>{sale.type_sale === 'NOVO' ? sale.builder : '-'}</td>
                <td>{sale.type_sale || '-'}</td>
                <td>{sale.sale_date || '-'}</td>
                <td>{sale.client_buyer || '-'}</td>
                <td>{sale.realty || '-'}</td>
                <td>{sale.realty_ammount || '-'}</td>
                <td>{sale.percentage_sale || '-'}</td>
                <td>{sale.sallers[0]}</td>
                <td>-</td>
              </tr>
            ))}
          </Body>
        </Table>
      </TableSaleWrapper>
      <Footer>
        <button type="button">Voltar</button>
      </Footer>
      <ExportReport
        params={params}
        isOpen={modalCreateReoport}
        setIsOpen={toogleCreateReportModal}
      />
    </AdmLayout>
  );
};

export default ReportSale;
