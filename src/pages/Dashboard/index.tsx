import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from '../../components/Dashboard/Card';
import DashbordLayout from '../Layouts/dashboard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import {GiStairsGoal} from 'react-icons/gi';
import Select from '../../components/SelectSimple';
import { optionYear } from '../../utils/loadOptions';
import { formatPrice } from '../../utils/format';
import BarGraphics from '../../components/Dashboard/Graphics/Bar';
import PieGraphic from '../../components/Dashboard/Graphics/Pie';

import { 
  Container, 
  Filter, 
  Avatar, 
  AvatarName, 
  Main, 
  CardContainer, 
  GraficContainer
} from './styled';
import { 
  labelsMonth, 
  transformValue, 
  transformPorcent,
} from '../../utils/dashboard';
import { useFetch } from '../../hooks/useFetch';

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
}

const Dashboard: React.FC = () => {
  const {userAuth} = useAuth();
  const [selectedYear, setSelectedYear] = useState('2020');
  const {data} = useFetch<IDashboardData>(`/dashboard/sellers?user=${userAuth.id}&ano=${Number(selectedYear)}`);

  const types = [data?.sales.types.new || 0, data?.sales.types.used || 0];
  const typeRealty = data?.sales.properties.filter(item => item.quantity > 0).map(item => (
    {label: item.property, value: item.quantity}
  ));

  const origins = data?.sales.origins.filter(item => item.value > 0).map(item => (
    {label: item.origin, value: item.value}
  ));

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  }

  const years = optionYear.map(item => (
    {label: item.label, value: String(item.value)}
  ))


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
            
          </GraficContainer>
          <GraficContainer>
            <BarGraphics 
              labels={labelsMonth} 
              title="Vendas ao Longo do ano" 
              formatter={transformValue} 
              data={data?.vgv.sales.months.map(item => item.vgv) || []} 
            />
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

export default Dashboard;