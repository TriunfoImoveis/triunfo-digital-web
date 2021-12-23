import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from '../../components/Dashboard/Card';
import DashbordLayout from '../Layouts/dashboard';
import { MdMoneyOff } from 'react-icons/md';
import { Container, Filter, Avatar, AvatarName, Main, CardContainer } from './styled';
import Select from '../../components/SelectSimple';
import {optionsMonth, optionYear} from '../../utils/loadOptions';

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

          <Select options={optionsMonth} nameLabel='Mês' />
          <Select options={optionYear} nameLabel='Ano' />
        </Filter>
        <Main>
          <CardContainer>
            <DashboardCard icon={MdMoneyOff} title="VGV Total" value="R$ 10.000.000,00" />
            <DashboardCard icon={MdMoneyOff} title="Ticket Médio" value="R$ 10.000.000,00" />
            <DashboardCard icon={MdMoneyOff} title="Comissão" value="R$ 10.000.000,00" />
            <DashboardCard icon={MdMoneyOff} title="Meta" value="R$ 10.000.000,00" />
          </CardContainer>
        </Main>
      </Container>
    </DashbordLayout>)
}

export default Dashboard;