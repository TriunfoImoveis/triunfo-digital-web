import React from 'react';

import Button from '../../Button';
import { SuccesImage } from '../../../assets/images';
import { SuccessContainer, ButtonGroup } from './styles';

const SuccesForm: React.FC = () => {
  return (
    <SuccessContainer>
      <h1>Cadastro concluído</h1>
      <SuccesImage />
      <ButtonGroup>
        <Button type="button" className="cancel">
          Ver o Ranking
        </Button>
        <Button type="button" className="next">
          Sair
        </Button>
      </ButtonGroup>
    </SuccessContainer>
  );
};

export default SuccesForm;
