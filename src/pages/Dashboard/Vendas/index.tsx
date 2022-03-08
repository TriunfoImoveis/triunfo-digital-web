import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import DashboardCard from '../../../components/Dashboard/Card';
import DashbordLayout from '../../Layouts/dashboard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { GiStairsGoal } from 'react-icons/gi';
import Select from '../../../components/SelectSimple';
import { optionYear } from '../../../utils/loadOptions';
import { formatPrice } from '../../../utils/format';
import BarGraphics from '../../../components/Dashboard/Graphics/Bar';
import PieGraphic from '../../../components/Dashboard/Graphics/Pie';

import {
  Container,
  Filter,
  Avatar,
  AvatarName,
  Main,
  CardContainer,
  GraficContainer
} from '../styled';
import {
  labelsMonth,
  transformValue,
  transformPorcent,
  transformNumberInString
} from '../../../utils/dashboard';
import { useFetch } from '../../../hooks/useFetch';
import { useFilter } from '../../../context/FilterContext';
import api from '../../../services/api';

interface IDashboardData {
  quantity: {
    sales: number;
    captivators: number;
  },
  ticket_medium: {
    sales: number;
    captivators: number;
  },
  comission: {
    total: number;
    months: {
      month: string;
      vgv: number;
    }[]
  };
  vgv: {
    sales: {
      total: number;
      months: {
        month: string;
        vgv: number;
      }[]
    }
    captivators: {
      total: number;
      months: {
        month: string;
        vgv: number;
      }[]
    }
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

interface IRealtor {
  id: string;
  name: string;
  avatar_url: string;
}

interface ISubsidiary {
  id: string;
  name: string;
  city: string;
}

const DashboardVendas: React.FC = () => {
  const { userAuth } = useAuth();
  const { handleSetYear, year, selectedSubsidiary, selectedRealtor, handleSetSelectedSubsidiaries, handleSetSelectedRealtors } = useFilter();
  const [url, setUrl] = useState('');
  const [realtors, setRealtors] = useState<IRealtor[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const { data } = useFetch<IDashboardData>(url);

  const getSubsidiaries = useCallback(async () => {
    const response = await api.get(`/subsidiary`);
    setSubsidiaries(response.data);
  }, []);

  const getAllRealtors = useCallback(async (subsidiary: string) => {
    const response = await api.get(`/users?city=${subsidiary}&office=Corretor`);
    setRealtors(response.data);
  }, []);

  useEffect(() => {
    const { office } = userAuth;
    if (office.name !== 'Corretor') {
      getSubsidiaries();
      getAllRealtors(selectedSubsidiary);
    }
  }, [userAuth, getSubsidiaries, getAllRealtors, selectedSubsidiary]);
  useEffect(() => {
    if (userAuth.office.name === 'Corretor') {
      setUrl(`/dashboard/sellers?user=${userAuth.id}&ano=${Number(year)}`);
    } else {
      setUrl(`/dashboard/sellers?user=${selectedRealtor}&ano=${Number(year)}`);
    }
  }, [userAuth.office.name, userAuth.id, year, selectedRealtor]);

  const optionsRealtors = realtors.map(realtor => ({ label: realtor.name, value: realtor.id }));
  const optionsSubsidiary = subsidiaries.map(subsidiary => ({ label: subsidiary.name, value: subsidiary.city }));


  const types = [data?.sales.types.new || 0, data?.sales.types.used || 0];
  const typeRealty = data?.sales.properties.filter(item => item.quantity > 0).map(item => (
    { label: item.property, value: item.quantity }
  ));

  const origins = data?.sales.origins.filter(item => item.value > 0).map(item => (
    { label: item.origin, value: item.value }
  ));

  const neighborhoods = data?.sales.neighborhoods.filter(item => item.quantity > 0).map(item => ({ label: item.neighborhood, value: item.quantity}));

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetYear(Number(event.target.value));
  }

  const years = optionYear.map(item => (
    { label: item.label, value: String(item.value) }
  ));

  const mobileSales = data?.vgv.sales.months.map(item => (
    { label: item.month, value: item.vgv }
  ));

  const handleSelectedSubsidiary = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedSubsidiaries(value);
  }, [handleSetSelectedSubsidiaries]);

  const handleSelectedRealtor = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedRealtors(value);
  }, [handleSetSelectedRealtors]);

  return (
    <DashbordLayout>
      <Container>
        <Filter>
          {userAuth.office.name === 'Corretor' && (
            <>
              <Avatar>
                <img
                  src={userAuth.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                  alt={userAuth.name || 'Corretor'}
                />
              </Avatar>
              <AvatarName>{userAuth.name}</AvatarName>
            </>
          )}

          {userAuth.office.name !== 'Corretor' && (
            <>
              {realtors.map(item => item.id === selectedRealtor && (
                <>
                  <Avatar>
                    <img
                      src={item.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                      alt={item.name || 'Corretor'}
                    />
                  </Avatar>
                  <AvatarName>{item.name}</AvatarName>
                </>
              ))}

            </>
          )}
          <Select
            options={years}
            nameLabel='Ano'
            defaultValue={''}
            onChange={handleSelectedYear}
          />

          {userAuth.office.name !== 'Corretor' && (
            <>
              {userAuth.office.name !== 'Diretor' && (
                <Select
                  options={optionsSubsidiary}
                  nameLabel='Filiais'
                  defaultValue={''}
                  onChange={handleSelectedSubsidiary}
                />
              )}
              <Select
                options={optionsRealtors}
                nameLabel='Corretores'
                defaultValue={''}
                onChange={handleSelectedRealtor}
              />
            </>
          )}
        </Filter>
        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="VGV Total" value={formatPrice(data?.vgv.sales.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value={formatPrice(data?.ticket_medium.sales || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Comissão" value={formatPrice(data?.comission.total || 0)} />
            <DashboardCard icon={GiStairsGoal} title="Meta" value={formatPrice(Number(userAuth.goal))} />
          </CardContainer>
          <GraficContainer>
            <div className="desktop">
              <BarGraphics
                labels={labelsMonth}
                title="Vendas ao Longo do ano"
                formatter={transformValue}
                data={data?.vgv.sales.months.map(item => item.vgv) || []}
              />
            </div>


            <div className="mobile">
              <BarGraphics
                labels={mobileSales?.filter(item => item.value > 0).map(item => item.label) || []}
                title="Vendas ao Longo do ano"
                formatter={transformValue}
                data={mobileSales?.filter(item => item.value > 0).map(item => item.value) || []}
              />
            </div>
          </GraficContainer>
          <GraficContainer>
            <PieGraphic
              title='Class. do Imóvel'
              labels={['Novos', 'Usados']}
              data={types}
              formatter={transformPorcent}
            />
            <PieGraphic
              title='Tipo do Imóvel'
              labels={typeRealty?.map(item => item.label) || []}
              data={typeRealty?.map(item => item.value) || []}
              formatter={transformPorcent}
            />
          </GraficContainer>
          <GraficContainer>
            <BarGraphics
              title='Bairros que mais vendem'
              labels={neighborhoods?.map(item => item.label) || []}
              data={neighborhoods?.map(item => item.value) || []}
              formatter={transformNumberInString}
            />
          </GraficContainer>
          <GraficContainer>
            <BarGraphics
              title='Origem da Venda'
              labels={origins?.map(item => item.label) || []}
              data={origins?.map(item => item.value) || []}
              formatter={transformValue}
            />
          </GraficContainer>
        </Main>
      </Container>
    </DashbordLayout>
  );
}

export default DashboardVendas;