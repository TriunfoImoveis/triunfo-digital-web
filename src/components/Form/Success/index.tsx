import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../../context/FormContext';

import { SuccesImage } from '../../../assets/images';
import { SuccessContainer, ButtonGroup } from './styles';

const SuccesForm: React.FC = () => {
  const { submitForm } = useForm();
  useEffect(() => {
    submitForm();
  }, [submitForm]);
  return (
    <SuccessContainer>
      <h1>Cadastro concluído</h1>
      <SuccesImage />
      <ButtonGroup>
        <Link to="/ranking" className="cancel">
          Ver o Ranking
        </Link>
        <Link to="/actions" className="next">
          Sair
        </Link>
      </ButtonGroup>
    </SuccessContainer>
  );
};

export default SuccesForm;
