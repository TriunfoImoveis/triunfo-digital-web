import React, { useEffect, useState } from 'react';

import { Container } from './styles';

interface ITabNavigatorContainer {
  step: number;
  typeSale: 'new' | 'used';
}

const TabNavigator: React.FC<ITabNavigatorContainer> = ({ step, typeSale }) => {
  const [textStep, setTextStep] = useState('');

  useEffect(() => {
    if (typeSale === 'new') {
      switch (step) {
        case 1:
          setTextStep('Informações sobre o Imóvel');
          break;
        case 2:
          setTextStep('Dados do Cliente');
          break;
        case 3:
          setTextStep('Corretores, Cordenação e Diretoria');
          break;
        case 4:
          setTextStep('Finanças');
          break;
        case 5:
          setTextStep('Venda!!');
          break;
        default:
          break;
      }
    }
    if (typeSale === 'used') {
      switch (step) {
        case 1:
          setTextStep('Informações sobre o Imóvel');
          break;
        case 2:
          setTextStep('Dados do Cliente Comprador');
          break;
        case 3:
          setTextStep('Dados do Cliente Vendedor');
          break;
        case 4:
          setTextStep('Corretores, Cordenação e Diretoria');
          break;
        case 5:
          setTextStep('Finanças');
          break;
        case 6:
          setTextStep('Venda!!');
          break;
        default:
          break;
      }
    }
  }, [step, typeSale]);
  return (
    <Container>
      <span>{textStep}</span>
    </Container>
  );
};

export default TabNavigator;
