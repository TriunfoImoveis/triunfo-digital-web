import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
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
import { useAuth } from '../../../../../context/AuthContext';

interface ISale {
  id: string;
  realty_ammount: string;
  sale_date: string;
  sale_has_sellers: {
    name: string;
    avatar_url: string;
  }[];
}

const VisionDirector: React.FC = () => {
  const {
    status,
    name,
    handleSetStatus,
    handleSetName,
    month,
    handleSetMonth,
  } = useFilter();
  const { userAuth } = useAuth();
  const { city } = userAuth.subsidiary;
  const [url, setUrl] = useState(`/sale?city=${city}&status=${status}`);
  const { data: sales } = useFetch<ISale[]>(url);

  const listSales = useMemo(() => {
    if (!sales) {
      return [];
    }
    const salesFormatted = sales?.map(s => ({
      id: s.id,
      name: 'Teste',
      vgv: formatPrice(Number(s.realty_ammount)),
      dateSale: DateBRL(s.sale_date),
      sallers: {
        name: s.sale_has_sellers[0].name,
        avatar_url: s.sale_has_sellers[0].avatar_url,
      },
    }));
    if (month === 0) {
      return salesFormatted;
    }
    const salesFiltredMonth = sales.filter(sale => {
      const parsedDate = parseISO(sale.sale_date);
      const monthDateSale = getMonth(parsedDate) + 1;
      if (!(monthDateSale === month)) {
        // eslint-disable-next-line
        return;
      }
      return {
        ...sale,
        sale_date: parsedDate,
      };
    });

    const salesFiltred = salesFiltredMonth.map(s => ({
      id: s.id,
      name: 'Teste',
      vgv: formatPrice(Number(s.realty_ammount)),
      dateSale: DateBRL(s.sale_date),
      sallers: {
        name: s.sale_has_sellers[0].name,
        avatar_url: s.sale_has_sellers[0].avatar_url,
      },
    }));

    return salesFiltred;
  }, [sales, month]);
  const handleSelectedStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetStatus(event.target.value);
    setUrl(`/sale?city=${city}&status=${event.target.value}`);
  };

  const searchRealtorByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      handleSetName(name);
      if (name.length > 0) {
        setUrl(`/sale?city=${city}&status=${status}&name=${name}`);
      } else {
        setUrl(`/sale?city=${city}&status=${status}`);
      }
      return;
    },
    [handleSetName, city, status],
  );

  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetMonth(Number(event.currentTarget.value));
  };

  return (
    <AdmLayout>
      <form>
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
                <span>Status da Venda: </span>
                <select defaultValue={status} onChange={handleSelectedStatus}>
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
            </FilterButtonGroup>
            <FiltersBottonItems>
              <Link
                to={`/adm/relatorio-vendas?city=${city}&status=${status}&name=${name}`}
                target="_blank"
              >
                Ir ao relatório
              </Link>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <Content>
        {!sales ? (
          <LoadingContainer>
            <Loader type="Bars" color="#c32925" height={100} width={100} />
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
                    <FaPlus size={15} color="#c32925" />
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

export default VisionDirector;
