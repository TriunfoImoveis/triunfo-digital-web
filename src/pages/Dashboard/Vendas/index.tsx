import React, { ChangeEvent } from 'react';
import { useAuth } from '../../../context/AuthContext';
import DashboardCard from '../../../components/Dashboard/Card';
import DashbordLayout from '../../Layouts/dashboard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import {GiStairsGoal} from 'react-icons/gi';
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
} from '../../../utils/dashboard';
import { useFetch } from '../../../hooks/useFetch';
import { useFilter } from '../../../context/FilterContext';

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

const DashboardVendas: React.FC = () => {
  const {userAuth} = useAuth();
  const {handleSetYear, year} = useFilter();
  const {data} = useFetch<IDashboardData>(`/dashboard/sellers?user=${userAuth.id}&ano=${Number(year)}`);

  const types = [data?.sales.types.new || 0, data?.sales.types.used || 0];
  const typeRealty = data?.sales.properties.filter(item => item.quantity > 0).map(item => (
    {label: item.property, value: item.quantity}
  ));

  const origins = data?.sales.origins.filter(item => item.value > 0).map(item => (
    {label: item.origin, value: item.value}
  ));

  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetYear(Number(event.target.value));
  }

  const years = optionYear.map(item => (
    {label: item.label, value: String(item.value)}
  ));

  const mobileSales = data?.vgv.sales.months.map(item => (
    {label: item.month, value: item.vgv }
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
            defaultValue={year} 
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