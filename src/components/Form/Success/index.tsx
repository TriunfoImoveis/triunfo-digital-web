import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const submitFom = async () => {
      setLoading(true);
      if (typeSale === 'new') {
        try {
          await submitFormNew();
          setLoading(false);
          toast.success('Venda cadastrada');
        } catch (err) {
          setLoading(false);
          toast.error('Problema  ao cadastar');
        }
      }
      if (typeSale === 'used') {
        try {
          await submitFormUsed();
          toast.success('Venda cadastrada');
        } catch (err) {
          toast.error('Problema  ao cadastar');
        }
      }
    };
    submitFom();
  }, [submitFormNew, submitFormUsed, typeSale]);
  return (
    <SuccessContainer>
      {loading ? (
        <h1>Cadastrando a venda</h1>
      ) : (
        <>
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
        </>
      )}
    </SuccessContainer>
  );
};

export default SuccesForm;
