import React, { ChangeEvent, useState } from 'react';
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
import { useFetch } from '../../../hooks/useFetch';
import PieGraphic from '../../../components/Dashboard/Graphics/Pie';
import { transformPorcent } from '../../../utils/dashboard';

interface IDashboardData {
  quantity: {
    sales: number;
    captivators: number;
  },
  ticket_medium: {
    sales: number;
    captivators: number;
  },
  comission: number;
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

const DashboardPersona: React.FC = () => {
  const {userAuth} = useAuth();
  const [selectedYear, setSelectedYear] = useState('2020');
  const {data} = useFetch<IDashboardData>(`/dashboard/sellers?user=${userAuth.id}&ano=${Number(selectedYear)}`);

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
    setSelectedYear(event.target.value);
  }

  const years = optionYear.map(item => (
    {label: item.label, value: String(item.value)}
  ));

  return (
    <DashbordLayout>
      <Container>
        <Filter>
          <Avatar>
            <img
              src={userAuth.avatar_url || 'https://imgur.com/I80W1Q0.png'}
              alt={userAuth.name || 'Corretor'}
            />
          </Avatar>
          <AvatarName>{userAuth.name}</AvatarName>

          <Select 
            options={years}  
            nameLabel='Ano' 
            defaultValue={selectedYear} 
            onChange={handleSelectedYear}/>
        </Filter>
        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="VGV Total" value={formatPrice(data?.vgv.sales.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value={formatPrice(data?.ticket_medium.sales || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Comissão" value={formatPrice(data?.comission || 0)} />
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