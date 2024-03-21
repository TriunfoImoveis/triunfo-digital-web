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
import { useFilter } from '../../../context/FilterContext';
import api from '../../../services/api';
import Loading from './Loading';

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

interface IDashboardSalesParms {
  user: string;
  ano?: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const DashboardVendas: React.FC = () => {
  const { userAuth } = useAuth();
  const {selectedRealtor, handleSetSelectedSubsidiaries, handleSetSelectedRealtors } = useFilter();
  const [realtors, setRealtors] = useState<IRealtor[]>([]);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [data, setData] = useState<IDashboardData>({} as IDashboardData)
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardData = useCallback(async (user, currentYear) => {
    setIsLoading(true);
    const response = await api.get<IDashboardData>('/dashboard/sellers', {
      params: {
        user,
        ano: currentYear
      }
    })
    setData(response.data)
    setIsLoading(false);
  }, [])
  const getSubsidiaries = useCallback(async () => {
    const response = await api.get(`/subsidiary`);
    setSubsidiaries(response.data);
  }, []);

  const getAllRealtors = useCallback(async (subsidiary: string) => {
    const response = await api.get<IRealtor[]>(`/users`, {
      params: {
        subsidiary,
        office: 'Corretor'
      }
    });
    setRealtors(response.data);
  }, []);
  const getAllRealtorsAndGetDashboardData = useCallback(async (subsidiary: string) => {
    const response = await api.get<IRealtor[]>(`/users`, {
      params: {
        subsidiary,
        office: 'Corretor'
      }
    });
    setRealtors(response.data);
    const fristRealtorId = response.data[0].id;
    await getDashboardData(fristRealtorId, year);
  }, [getDashboardData, year]);

  useEffect(() => {
    const { office, subsidiary } = userAuth;
    if (office.name === 'Corretor') {
      getDashboardData(userAuth.id, year);
    }

    if 
      (
        office.name.includes('Diretor') ||
        office.name.includes('Gerente') || 
        office.name.includes('Presidente')
      ) {
        getSubsidiaries();
        getAllRealtorsAndGetDashboardData(subsidiary.id);
    }
  }, [userAuth, getDashboardData, getSubsidiaries, getAllRealtors, year, getAllRealtorsAndGetDashboardData]);
  
  if (Object.values(data).length === 0 || isLoading) {
    return <Loading />
  }

  const optionsRealtors = realtors.map(realtor => ({ label: realtor.name, value: realtor.id }));
  const optionsSubsidiary = subsidiaries.map(subsidiary => ({ label: subsidiary.name, value: subsidiary.id }));


  const types = data ? [data?.sales.types.new || 0, data?.sales.types.used || 0] : [0, 0];
  const typeRealty = data?.sales.properties.filter(item => item.quantity > 0).map(item => (
    { label: item.property, value: item.quantity }
  ));

  const origins = data?.sales.origins.filter(item => item.value > 0).map(item => (
    { label: item.origin, value: item.value }
  ));

  const neighborhoods = data?.sales.neighborhoods.filter(item => item.quantity > 0).map(item => ({ label: item.neighborhood, value: item.quantity}));

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  }

  const years = optionYear.map(item => (
    { label: item.label, value: String(item.value) }
  ));

  const mobileSales = data?.vgv.sales.months.map(item => (
    { label: item.month, value: item.vgv }
  ));

  const handleSelectedSubsidiary = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedSubsidiaries(value);
    await getAllRealtorsAndGetDashboardData(value)
  };

  const handleSelectedRealtor = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedRealtors(value);
    await getDashboardData(value, year);
  };

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
            defaultValue={year.toString()}
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
                defaultValue={selectedRealtor}
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