import React from 'react';

import { Container } from './styles';

interface ITabNavigatorContainer {
  step: number; // 1-based index
  title: string;
}

const TabNavigator: React.FC<ITabNavigatorContainer> = ({ step, title }) => {
  return (
    <Container>
      <span>{`${step}. ${title}`}</span>
    </Container>
  );
};

export default TabNavigator;
