import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import DashboardCard from '../../../components/Dashboard/Card';
import DashbordLayout from '../../Layouts/dashboard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import {GiStairsGoal} from 'react-icons/gi';
import Select from '../../../components/SelectSimple';
import { optionYear } from '../../../utils/loadOptions';
import { formatPrice } from '../../../utils/format';

import { 
  Container, 
  Filter, 
  Avatar, 
  AvatarName, 
  Main, 
  CardContainer,
  GraficContainer, 
} from '../styled';
import PieGraphic from '../../../components/Dashboard/Graphics/Pie';
import { transformPorcent } from '../../../utils/dashboard';
import { useFilter } from '../../../context/FilterContext';
import api from '../../../services/api';
import Loading from '../Vendas/Loading';

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
    origins: {
        origin: string;
        value: number;
    }[]
  } 
  client: {
    genders: {
				gender: string;
				percentage: number;
    }[]
    civil_status: {
      status: string;
			percentage: number;
    }[]
    avg_number_children: number;
    age_groups: {
      age: string;
			percentage: number;
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

const CURRENT_YEAR = new Date().getFullYear();

const DashboardPersona: React.FC = () => {
  const { userAuth } = useAuth();
  const { selectedSubsidiary, selectedRealtor, handleSetSelectedSubsidiaries, handleSetSelectedRealtors } = useFilter();
  const [year, setYear] = useState(CURRENT_YEAR);
  const [realtors, setRealtors] = useState<IRealtor[]>([]);
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
    const response = await api.get(`/users?subsidiary=${subsidiary}&office=Corretor`);
    setRealtors(response.data);
    if (selectedRealtor === ''){
      handleSetSelectedRealtors(response.data[0].id)
    }
  }, [selectedRealtor, handleSetSelectedRealtors]);

  useEffect(() => {
    if (userAuth.office.name === 'Corretor') {
      getDashboardData(userAuth.id, year);
    }

    if (userAuth.office.name !== 'Corretor') {
      getSubsidiaries();
      getAllRealtors(selectedSubsidiary);
      getDashboardData(userAuth.id, year);
    }
  }, 
  [
    userAuth.office.name, 
    userAuth.id, 
    year, 
    selectedRealtor, 
    getAllRealtors, 
    getDashboardData, 
    getSubsidiaries, 
    selectedSubsidiary
  ]);

  if (Object.values(data).length === 0 || isLoading) {
    return <Loading />
  }

  const optionsRealtors = realtors.map(realtor => ({ label: realtor.name, value: realtor.id }));
  const optionsSubsidiary = subsidiaries.map(subsidiary => ({ label: subsidiary.name, value: subsidiary.id }));


  const gender = data?.client.genders.filter(item => item.percentage > 0).map(item => (
    {label: item.gender, value: item.percentage}
  ));

  const civilStatus = data?.client.civil_status.filter(item => item.percentage > 0).map(item => (
    {label: item.status, value: item.percentage}
  ));

  const age = data?.client.age_groups.filter(item => item.percentage > 0).map(item => (
    {label: item.age, value: item.percentage}
  ));

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  }

  const years = optionYear.map(item => (
    {label: item.label, value: String(item.value)}
  ));

  const handleSelectedSubsidiary = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedSubsidiaries(value);
  };

  const handleSelectedRealtor = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    handleSetSelectedRealtors(value);
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
            defaultValue={year}
            onChange={handleSelectedYear}
          />

          {userAuth.office.name !== 'Corretor' && (
            <>
              {userAuth.office.name !== 'Diretor' && (
                <Select
                  options={optionsSubsidiary}
                  nameLabel='Filiais'
                  defaultValue={selectedSubsidiary}
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
            <PieGraphic 
              title='Gênero' 
              labels={gender?.map(item => item.label) || []} 
              data={gender?.map(item => item.value) || []}
              formatter={transformPorcent}
             />
             <PieGraphic 
              title='Estado civil' 
              labels={civilStatus?.map(item => item.label) || []} 
              data={civilStatus?.map(item => item.value) || []}
              formatter={transformPorcent}
             />
          </GraficContainer>
          <GraficContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Número de Filhos" value={String(data?.client.avg_number_children)} />
          </GraficContainer>
          <GraficContainer>
            <PieGraphic 
                title='Idade' 
                labels={age?.map(item => item.label) || []} 
                data={age?.map(item => item.value) || []}
                formatter={transformPorcent}
             />
          </GraficContainer>
        </Main>
      </Container>
    </DashbordLayout>
  );
}

export default DashboardPersona;