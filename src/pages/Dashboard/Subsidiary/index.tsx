import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import DashbordLayout from '../../Layouts/dashboard';

import {
  Container,
  Filter,
  Main,
  CardContainer,
  GraficContainer,
  DivDesktop
} from '../styled';
import DashboardCard from '../../../components/Dashboard/Card';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { GiStairsGoal } from 'react-icons/gi';
import { formatPrice } from '../../../utils/format';
import BarGraphics from '../../../components/Dashboard/Graphics/Bar';
import { labelsMonth, transformPorcent, transformValue, transformNumberInString } from '../../../utils/dashboard';
import PieGraphic from '../../../components/Dashboard/Graphics/Pie';
import HorizontalBar from '../../../components/Dashboard/Graphics/HorizontalBar';
import Ranking from './components/Ranking';
import { useFetch } from '../../../hooks/useFetch';
import Select from '../../../components/SelectSimple';
import { useFilter } from '../../../context/FilterContext';
import { optionYear } from '../../../utils/loadOptions';
import api from '../../../services/api';


interface IDashboardData {
  quantity_sales: number;
  ticket_medium: number;
  comission: {
    total: number;
    months: {
      month: string;
      vgv: number;
    }[];
  }
  vgv: {
    total: number;
    months: {
      month: string;
      vgv: number;
    }[]
  }
  sales: {
    types: {
      new: number;
      used: number;
    }
    properties: {
      property: string;
      quantity: number;
    }[];
    neighborhoods: {
      neighborhood: string;
      quantity: number;
    }[];
    origins: {
      origin: string;
      value: number;
    }[]
  }
}

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}

interface ISubsidiary {
  id: string;
  name: string;
  city: string;
}


const DashboardSubsidiary: React.FC = () => {
  const {
    handleSetYear,
    year,
    selectedSubsidiary,
    handleSetSelectedSubsidiaries,
    city,
    handleSetCity
  } = useFilter();

  const { data } = useFetch<IDashboardData>(`/dashboard/subsidiaries?subsidiary=${selectedSubsidiary}&year=${year}`);
  const { data: rankingData } = useFetch<IRealtorData[]>(`/ranking?year=${year}&city=${city}&user=Corretor`);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const getSubsidiaries = useCallback(async () => {
    const response = await api.get(`/subsidiary`);
    setSubsidiaries(response.data);
  }, []);

  useEffect(() => {
    getSubsidiaries();
  }, [getSubsidiaries]);

  const ranking = useMemo(() => {
    return rankingData?.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [rankingData]);

  const optionsSubsidiary = useMemo(
    () => subsidiaries
      .map(subsidiary => ({ label: subsidiary.name, value: subsidiary.id })),
    [subsidiaries]
  );

  const neighborhoods = useMemo(() => data?.sales.neighborhoods
    .filter(item => item.quantity > 0)
    .map(item => ({ label: item.neighborhood, value: item.quantity })), [data]);

  const types = useMemo(() => [data?.sales.types.new || 0, data?.sales.types.used || 0], [data]);

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetYear(Number(event.target.value));
  }

  const handleSelectedSubsidiary = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedSubsidiaries(value);
  }, [handleSetSelectedSubsidiaries]);

  useMemo(() => {
    if (selectedSubsidiary !== '') {
      const subsidiary = subsidiaries.find(item => item.id === selectedSubsidiary && item);
      handleSetCity(subsidiary?.city || '');
    }
  }, [subsidiaries, selectedSubsidiary, handleSetCity]);

  const years = optionYear.map(item => (
    { label: item.label, value: String(item.value) }
  ));

  return (
    <DashbordLayout>
      <Container>
        <Filter>
          <Select
            options={years}
            nameLabel='Ano'
            defaultValue={''}
            onChange={handleSelectedYear}
          />

          <Select
            options={optionsSubsidiary}
            nameLabel='Filiais'
            defaultValue={selectedSubsidiary}
            onChange={handleSelectedSubsidiary}
          />
        </Filter>

        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="VGV Total" value={formatPrice(data?.vgv.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Qtde de Imóveis" value={String(data?.quantity_sales || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value={formatPrice(data?.ticket_medium || 0)} />
            <DashboardCard icon={GiStairsGoal} title="Comissão" value={formatPrice(data?.comission.total || 0)} />
          </CardContainer>


          <GraficContainer>
            <DivDesktop width="70%">
              <BarGraphics
                labels={labelsMonth}
                title="Vendas ao Longo do ano"
                formatter={transformValue}
                data={data?.vgv.months.map(item => item.vgv) || []}
              />

            </DivDesktop>


            <DivDesktop width="30%">
              <HorizontalBar
                title='Quantidade de vendas por bairro'
                labels={neighborhoods?.map(item => item.label) || []}
                data={neighborhoods?.map(item => item.value) || []}
                formatter={transformNumberInString}
              />
            </DivDesktop>


            <div className="mobile">
              <BarGraphics
                labels={labelsMonth}
                title="Vendas ao Longo do ano"
                formatter={transformValue}
                data={[100000, 30000]}
              />
            </div>
          </GraficContainer>

          <GraficContainer>
            <DivDesktop width="60%" >
              <Ranking data={ranking || []} />
            </DivDesktop>
            <DivDesktop width="40%">
              <PieGraphic
                title='Class. do Imóvel'
                labels={['Construtoras', 'Usados']}
                data={types}
                formatter={transformPorcent}
              />
            </DivDesktop>
          </GraficContainer>
        </Main>
      </Container>
    </DashbordLayout>
  );
}

export default DashboardSubsidiary;