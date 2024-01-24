import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { getMonth, parseISO } from 'date-fns';
import AdmLayout from '../../../../Layouts/Adm';
import { Search } from '../../../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
  FilterButtonGroup,
} from '../../styles';
import { formatPrice, DateBRL } from '../../../../../utils/format';
import { useFilter } from '../../../../../context/FilterContext';
import { useFetch } from '../../../../../hooks/useFetch';
import NotFound from '../../../../../components/Errors/NotFound';
import { filterYear } from '../../../../../utils/filters';
import { optionYear, states } from '../../../../../utils/loadOptions';

import theme from '../../../../../styles/theme';



interface ISale {
  id: string;
  realty_ammount: string;
  sale_date: string;
  sale_has_sellers: {
    name: string;
    avatar_url: string;
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

const GeneralVision: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = getMonth(new Date()) + 1;
  const {
    city,
    status,
    name,
    handleSetStatus,
    handleSetName,
    subsidiary,
    handleSetFiliais,
    selectedFiliais
  } = useFilter();
  const [url, setUrl] = useState(`/sale`);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [params, setParams] = useState({
    status,
    month: currentMonth,
    year: currentYear   
  } as IParamsFilterSales);
  const { data: sales } = useFetch<ISale[]>(url, params);
  const { data: subsidiaries } = useFetch<ISubsidiary[]>(`/subsidiary`);
  const optionsYear = optionYear.filter(year => year.value <= currentYear);

  const listSales = useMemo(() => {
    if (!sales) {
      return [];
    }
    const salesFormatted = sales?.map(s => ({
      id: s.id,
      name: 'Teste',
      vgv: formatPrice(Number(s.realty_ammount)),
      sale_date: s.sale_date,
      dateSale: DateBRL(s.sale_date),
      sallers: {
        name: s.sale_has_sellers[0].name,
        avatar_url: s.sale_has_sellers[0].avatar_url,
      },
    }));

    return salesFormatted;
  }, [sales]);

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
    [handleSetName, subsidiary, status],
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
                placeholder="Buscar por corretor"
                onChange={searchRealtorByName}
              />
            </Input>
          </FiltersTop>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <span>Estado: </span>
                <select defaultValue={city} onChange={handleSelectSubsidiaries}>
                  <option value={''}>Todas</option>
                  {subsidiaries &&subsidiaries.map(subsidiary => (
                    <option key={subsidiary.id} value={subsidiary.id}>{subsidiary.name}</option>
                  ))}
                </select>
              </FiltersBottonItems>
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
            </FilterButtonGroup>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <Content>
        {!sales ? (
          <LoadingContainer>
            <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
          </LoadingContainer>
        ) : listSales.length === 0 ? (
          <NotFound />
        ) : (
          <SaleTableContainer>
            <SaleHeader>
              <HeaderItem />
              <HeaderItem>Nome</HeaderItem>
              <HeaderItem>Valor</HeaderItem>
            </SaleHeader>
            {listSales?.map(sale => (
              <SaleBody key={sale.id}>
                <SaleItem className="avatar">
                  <img
                    src={
                      sale.sallers.avatar_url || 'https://imgur.com/I80W1Q0.png'
                    }
                    alt={sale.sallers.name}
                  />
                </SaleItem>
                <SaleItem>{sale.sallers.name}</SaleItem>
                <SaleItem>{sale.vgv}</SaleItem>
                <SaleItem>{sale.dateSale}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-vendas/${sale.id}`}>
                    <FaPlus size={15} color={theme.colors.primary} />
                    Detalhes
                  </Link>
                </SaleItem>
              </SaleBody>
            ))}
          </SaleTableContainer>
        )}
      </Content>
    </AdmLayout>
  );
};

export default GeneralVision;
