import React from 'react';
import DashboardCard from '../../components/Dashboard/Card';
import DashbordLayout from '../Layouts/dashboard';
import { MdMoneyOff } from 'react-icons/md';
import { Container } from './styled';

const Dashboard: React.FC = () => {
  return (
    <DashbordLayout>
      <Container>
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
        <DashboardCard icon={MdMoneyOff} title="VGV" value="R$ 10.000.000,00" />
      </Container>
    </DashbordLayout>)
}

export default Dashboard;