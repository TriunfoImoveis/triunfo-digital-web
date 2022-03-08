import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import DashbordLayout from '../../Layouts/dashboardTime';

import {
  Container,
  Filter,
  Main,
  CardContainer,
  GraficContainer,
} from '../styled';
import DashboardCard from '../../../components/Dashboard/Card';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { formatPrice } from '../../../utils/format';
import Select from '../../../components/SelectSimple';
import { useFilter } from '../../../context/FilterContext';
import { optionYear } from '../../../utils/loadOptions';
import { useFetch } from '../../../hooks/useFetch';
import api from '../../../services/api';
import BarGraphics from '../../../components/Dashboard/Graphics/Bar';
import { calculationPorcent, transformPorcent, transformValue } from '../../../utils/dashboard';
import PieGraphic from '../../../components/Dashboard/Graphics/Pie';


interface IDashboardData {
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
    quantity: number;
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




const DashboardTime: React.FC = () => {
  const {
    handleSetYear,
    year
  } = useFilter();

  const [realtors, setRealtors] = useState<IRealtorData[]>([]);
  const [realtorCity1, setRealtorCity1] = useState<IRealtorData[]>([]);
  const [realtorCity2, setRealtorCity2] = useState<IRealtorData[]>([]);
  const [realtorCity3, setRealtorCity3] = useState<IRealtorData[]>([]);

  const [city1, setCity1] = useState<ISubsidiary>({} as ISubsidiary);
  const [city2, setCity2] = useState<ISubsidiary>({} as ISubsidiary);
  const [city3, setCity3] = useState<ISubsidiary>({} as ISubsidiary);

  const { data: realtorsSLZ } = useFetch<IRealtorData[]>(`/ranking?city=${`São Luís`}&year=${year}&user=Corretor`);
  const { data: realtorsFTZ } = useFetch<IRealtorData[]>(`/ranking?city=Fortaleza&year=${year}&user=Corretor`);
  const { data: realtorsTRZ } = useFetch<IRealtorData[]>(`/ranking?city=Teresina&year=${year}&user=Corretor`);

  const getSubsidiaries = useCallback(async () => {
    const response = await api.get('/subsidiary');
    setCity1(response.data[0]);
    setCity2(response.data[1]);
    setCity3(response.data[2]);

  }, [])
  useEffect(() => {
    getSubsidiaries();
  }, [getSubsidiaries]);

  const { data: subsidiary1 } = useFetch<IDashboardData>(`/dashboard/subsidiaries?subsidiary=${city1.id}&year=${year}`);
  const { data: subsidiary2 } = useFetch<IDashboardData>(`/dashboard/subsidiaries?subsidiary=${city2.id}&year=${year}`);
  const { data: subsidiary3 } = useFetch<IDashboardData>(`/dashboard/subsidiaries?subsidiary=${city3.id}&year=${year}`);


  const qtdSale = useMemo(() => {
    let quanty = 0;
    if (subsidiary1 && subsidiary2 && subsidiary3 !== undefined) {
      quanty = subsidiary1?.vgv.quantity + subsidiary2?.vgv.quantity + subsidiary3?.vgv.quantity;
    }

    return quanty;
  }, [subsidiary1, subsidiary2, subsidiary3]);

  const ticketMedium = useMemo(() => {
    let ticket = 0;
    if (subsidiary1 && subsidiary2 && subsidiary3 !== undefined) {
      ticket = subsidiary1?.ticket_medium + subsidiary2?.ticket_medium + subsidiary3?.ticket_medium;
    }

    return ticket;
  }, [subsidiary1, subsidiary2, subsidiary3]);


  const years = optionYear.map(item => (
    { label: item.label, value: String(item.value) }
  ));

  const allTypes = useMemo(() => {
    let type = {
      new: 0,
      used: 0
    }
    if (subsidiary1 && subsidiary2 && subsidiary3 !== undefined) {
      const novo = ((subsidiary1.sales.types.new || 0) + (subsidiary2.sales.types.new || 0) + (subsidiary3.sales.types.new || 0)) / 3;
      const usado =  ((subsidiary1.sales.types.used || 0) + (subsidiary2.sales.types.used || 0) + (subsidiary3.sales.types.used || 0)) / 3;

      const total = novo + usado;

      const novoPorcent = calculationPorcent(novo, total);
      const usadoPorcent = calculationPorcent(usado, total);
      type = {
        new: novoPorcent,
        used: usadoPorcent
      }
    }
    return type;
  }, [subsidiary1, subsidiary2, subsidiary3]);

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetYear(Number(event.target.value));
  }

  const allRealtors = useCallback(() => {
    if (realtorsSLZ !== undefined && realtorsFTZ !== undefined && realtorsTRZ !== undefined) {
      const realtors = realtorsSLZ.concat(realtorsFTZ, realtorsTRZ);
      setRealtorCity1(realtorsSLZ)
      setRealtorCity2(realtorsTRZ)
      setRealtorCity3(realtorsFTZ)
      setRealtors(realtors);
    }
  }, [realtorsSLZ, realtorsFTZ, realtorsTRZ]);

  useEffect(() => {
    allRealtors()
  }, [allRealtors]);

  const ranking = useMemo(() => {
    return realtors.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: Number(r.vgv),
    }));
  }, [realtors]);

  const ranking1 = useMemo(() => {
    return realtorCity1.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: Number(r.vgv),
    }));
  }, [realtorCity1]);
  const ranking2 = useMemo(() => {
    return realtorCity2.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: Number(r.vgv),
    }));
  }, [realtorCity2]);
  const ranking3 = useMemo(() => {
    return realtorCity3.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: Number(r.vgv),
    }));
  }, [realtorCity3]);
  
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
        </Filter>

        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title={`VGV ${city1.city}`} value={formatPrice(subsidiary1?.vgv.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Imóveis vendidos" value={String(qtdSale || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title={`VGV ${city2.city}`} value={formatPrice(subsidiary2?.vgv.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value={formatPrice(ticketMedium || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title={`VGV ${city3.city}`} value={formatPrice(subsidiary3?.vgv.total || 0)} />
          </CardContainer>

          <GraficContainer>
            <BarGraphics
              labels={[ranking[0]?.name, ranking[1]?.name, ranking[2]?.name]}
              title="Top 3 Corretor da rede"
              formatter={transformValue}
              data={ranking?.map(item => Number(item.vgv)) || []}
            />
            <BarGraphics
              labels={[ranking1[0]?.name, ranking1[1]?.name, ranking1[2]?.name]}
              title={`Top 3 Corretor ${city1.city}`}
              formatter={transformValue}
              data={ranking1?.map(item => Number(item.vgv)) || []}
            />
            <BarGraphics
              labels={[ranking2[0]?.name, ranking2[1]?.name, ranking2[2]?.name]}
              title={`Top 3 Corretor ${city2.city}`}
              formatter={transformValue}
              data={ranking2?.map(item => Number(item.vgv)) || []}
            />

            <BarGraphics
              labels={[ranking3[0]?.name, ranking3[1]?.name, ranking3[2]?.name]}
              title={`Top 3 Corretor ${city3.city}`}
              formatter={transformValue}
              data={ranking3?.map(item => Number(item.vgv)) || []}
            />

          </GraficContainer>
          <GraficContainer>
            <PieGraphic
              title='Class. do Imóvel'
              labels={['Construtoras', 'Usados']}
              data={[allTypes.new, allTypes.used]}
              formatter={transformPorcent}
            />
          </GraficContainer>
        </Main>
      </Container>
    </DashbordLayout>
  );
}

export default DashboardTime;