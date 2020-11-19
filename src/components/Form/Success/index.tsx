import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';

import { SuccesImage } from '../../../assets/images';
import { SuccessContainer, ButtonGroup } from './styles';

interface ISuccessProps {
  typeSale: 'new' | 'used';
}

const SuccesForm: React.FC<ISuccessProps> = ({ typeSale }) => {
  const { submitFormNew, submitFormUsed } = useForm();
  useEffect(() => {
    const submitFom = async () => {
      if (typeSale === 'new') {
        try {
          submitFormNew();
          toast.success('Venda cadastrada');
        } catch (err) {
          console.log(err);
          toast.error('Problema  ao cadastar');
        }
      }
      if (typeSale === 'used') {
        try {
          submitFormUsed();
          toast.success('Venda cadastrada');
        } catch (err) {
          console.log(err);
          toast.error('Problema  ao cadastar');
        }
      }
    };
    submitFom();
  }, [submitFormNew, submitFormUsed, typeSale]);
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
