import React from 'react';
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
  labelClassImovel, 
  transformPorcent,
  labelTipoImovel
} from '../../utils/dashboard';

const Dashboard: React.FC = () => {
  const {userAuth} = useAuth();


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

          <Select options={optionYear} nameLabel='Ano' />
        </Filter>
        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="VGV Total" value="R$ 12M" />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value="R$ 1M" />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Comissão" value="R$ 100K" />
            <DashboardCard icon={GiStairsGoal} title="Meta" value={formatPrice(Number(userAuth.goal))} />
          </CardContainer>
          <GraficContainer>
            
          </GraficContainer>
          <GraficContainer>
            <BarGraphics 
              labels={labelsMonth} 
              title="Vendas ao Longo do ano" 
              formatter={transformValue} 
              data={labelsMonth.map(() => 10000000)} 
            />
          </GraficContainer>
          <GraficContainer>
            <PieGraphic 
              title='Class. do Imóvel' 
              labels={labelClassImovel} 
              data={[60, 20, 20]}
              formatter={transformPorcent}
             />
             <PieGraphic 
              title='Tipo do Imóvel' 
              labels={labelTipoImovel} 
              data={[93, 7]}
              formatter={transformPorcent}
             />
             <PieGraphic 
              title='Origem' 
              labels={labelTipoImovel} 
              data={[93, 7]}
              formatter={transformPorcent}
             />
          </GraficContainer> 
        </Main>
      </Container>
    </DashbordLayout>
  );
}

export default Dashboard;