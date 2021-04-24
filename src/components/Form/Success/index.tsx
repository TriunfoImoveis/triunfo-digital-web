import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';

import { SuccesImage, ErrorRegisterSale } from '../../../assets/images';
import { SuccessContainer, ButtonGroup, FailedRegisterSale } from './styles';
import api from '../../../services/api';

interface ISuccessProps {
  typeSale: 'new' | 'used';
}

const SuccesForm: React.FC<ISuccessProps> = ({ typeSale }) => {
  const { formData } = useForm();
  const [loading, setLoading] = useState(false);
  const [statusError, setStatusError] = useState(true);

  useEffect(() => {
    const submitFom = async () => {
      if (typeSale === 'new') {
        try {
          setLoading(true);
          const response = await api.post('/sale/new', formData);
          if (!response.data) {
            throw new Error();
          }
          toast.success('Venda cadastrada');
        } catch (err) {
          setStatusError(true);
          if (err.response) {
            toast.error(`${err.response.data.message}`);
          } else if (err.request) {
            toast.error('Error de Rede, verifique sua conexão');
          } else {
            toast.error('Erro interno do servidor, contate o suporte');
          }
        } finally {
          setLoading(false);
        }
      }
      if (typeSale === 'used') {
        try {
          setLoading(true);
          const response = await api.post('/sale/used', formData);
          if (!response.data) {
            throw new Error();
          }
          toast.success('Venda cadastrada');
        } catch (err) {
          setStatusError(true);
          if (err.response) {
            toast.error(`${err.response.data.message}`);
          } else if (err.request) {
            toast.error('Error de Rede, verifique sua conexão');
          } else {
            toast.error('Erro interno do servidor, contate o suporte');
          }
        } finally {
          setLoading(false);
        }
      }
    };
    submitFom();
  }, [typeSale, formData]);
  return (
    <SuccessContainer>
      {loading ? (
        <h1>Cadastrando a venda</h1>
      ) : (
        <>
          {statusError ? (
            <FailedRegisterSale>
              <h1>Falhou! Tente Novamente</h1>
              <ErrorRegisterSale />
              <ButtonGroup>
                <Link to="/actions" className="next">
                  Tentar novamente
                </Link>
              </ButtonGroup>
            </FailedRegisterSale>
          ) : (
            <>
              <h1>Cadastro concluído</h1>
              <SuccesImage />
              <strong>Agora é so aguardar!</strong>
              <p>O nosso financeiro veficar as informções e validar a venda!</p>
              <p>Aguarde em ate 48h úteis, para a confirmação!</p>
              <ButtonGroup>
                <Link to="/actions" className="cancel">
                  cadastrar nova venda
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
