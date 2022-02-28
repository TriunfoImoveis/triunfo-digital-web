import React, { useMemo } from 'react';
import DashbordLayout from '../../Layouts/dashboard';

import {
  Container,
  Filter,
  Avatar,
  AvatarName,
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

interface IDashboardData {
  quantity_sales: number;
  ticket_medium: number;
  comission: number;
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


const DashboardSubsidiary: React.FC = () => {
  const { data } = useFetch<IDashboardData>('/dashboard/subsidiaries?subsidiary=825712b9-4441-40b9-ba58-b0b420e522fe&year=2021');
  const { data: rankingData } = useFetch<IRealtorData[]>('/ranking?year=2021&city=S%C3%A3o%20Lu%C3%ADs&user=Corretor');
  
  const ranking = useMemo(() => {
    return rankingData?.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [rankingData]);

  const neighborhoods = data?.sales.neighborhoods
  .filter(item => item.quantity > 0)
  .map(item => ({ label: item.neighborhood, value: item.quantity}));
  const types = [data?.sales.types.new || 0, data?.sales.types.used || 0];


  return (
    <DashbordLayout>
      <Container>
        <Filter>
          <Avatar>
            <img
              src="https://www.triunfoimoveis.com/wp-content/uploads/2021/12/TRIUNFO-IMOVEIS-logovestical2.png"
              alt="logo triunfo"
            />
          </Avatar>
          <AvatarName>Filial</AvatarName>
        </Filter>

        <Main>
          <CardContainer>
            <DashboardCard icon={RiMoneyDollarCircleFill} title="VGV Total" value={formatPrice(data?.vgv.total || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Qtde de Imóveis" value={String(data?.quantity_sales || 0)} />
            <DashboardCard icon={RiMoneyDollarCircleFill} title="Ticket Médio" value={formatPrice(data?.ticket_medium || 0)} />
            <DashboardCard icon={GiStairsGoal} title="Comissão" value={formatPrice(data?.comission || 0)} />
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
              <Ranking data={ranking || []}/>
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