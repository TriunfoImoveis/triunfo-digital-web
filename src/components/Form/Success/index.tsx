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
  const [statusError, setStatusError] = useState(false);
  useEffect(() => {
    const submitFom = () => {
      setLoading(true);
      if (typeSale === 'new') {
        try {
          submitFormNew();

          toast.success('Venda cadastrada');
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setStatusError(true);
          if (err.response) {
            toast.error(`${err.response.data.message}`);
          } else if (err.request) {
            toast.error('Error de Rede, verifique sua conexão');
          } else {
            toast.error('Erro interno do servidor, contate o suporte');
          }
        }
      }
      if (typeSale === 'used') {
        try {
          submitFormUsed();
          setLoading(false);
          toast.success('Venda cadastrada');
        } catch (err) {
          setLoading(false);
          setStatusError(true);
          if (err.response) {
            toast.error(`${err.response.data.message}`);
          } else if (err.request) {
            toast.error('Error de Rede, verifique sua conexão');
          } else {
            toast.error('Erro interno do servidor, contate o suporte');
          }
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
          {statusError ? (
            <>
              <h1>Falhou! Tente Novamente</h1>
              <SuccesImage />
              <ButtonGroup>
                <Link to="/ranking" className="cancel">
                  Ver o Ranking
                </Link>
                <Link to="/actions" className="next">
                  Tentar novamente
                </Link>
              </ButtonGroup>
            </>
          ) : (
            <>
              <h1>Cadastro concluído</h1>
              <SuccesImage />
              <ButtonGroup>
                <Link to="/ranking" className="cancel">
                  Ver o Ranking
                </Link>
                <Link to="/menu" className="next">
                  Sair
                </Link>
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </SuccessContainer>
  );
};

export default SuccesForm;
