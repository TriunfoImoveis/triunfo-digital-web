import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, Content} from './styled';

interface DashboardCardProps {
  icon: React.ComponentType<IconBaseProps>;
  title: string;
  value: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({icon: Icon, title, value}) => {
  return (
    <Container>
      <Icon size={30} color="#C32925" />
      <Content>
        <strong>{title}</strong>
        <span>{value}</span>
      </Content>
    </Container>
  );
}

export default DashboardCard;