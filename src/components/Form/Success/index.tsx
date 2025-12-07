import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';

import { SuccesImage, ErrorRegisterSale } from '../../../assets/images';
import { SuccessContainer, ButtonGroup, FailedRegisterSale } from './styles';
import api from '../../../services/api';
import Button from '../../Button';

interface ISuccessProps {
  typeSale: 'new' | 'used';
}

const SuccesForm: React.FC<ISuccessProps> = ({ typeSale }) => {
  const { formData, setStepIndex, clearAll } = useForm();
  const hasSubmitted = React.useRef(false);
  const [loading, setLoading] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
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
          if ((err as any).response) {
            toast.error(`${(err as any).response.data.message}`);
          } else if ((err as any).request) {
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
          if ((err as any).response) {
            toast.error(`${(err as any).response.data.message}`);
          } else if ((err as any).request) {
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
  }, [typeSale, formData, clearAll, setStepIndex]);
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
                <Button
                  type="button"
                  className="next"
                  onClick={() => {
                    clearAll();
                    setStepIndex(0);
                    hasSubmitted.current = false;
                  }}
                >
                  Tentar novamente
                </Button>
              </ButtonGroup>
            </FailedRegisterSale>
          ) : (
            <>
              <h1>Cadastro concluído</h1>
              <SuccesImage />
              <strong>Agora é só aguardar!</strong>
              <p>
                O nosso financeiro veficar as informações e validar a venda!
              </p>
              <p>Aguarde em ate 48h úteis, para a confirmação!</p>
              <ButtonGroup>
                <Button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    clearAll();
                    setStepIndex(0);
                    hasSubmitted.current = false;
                    history.push('/actions');
                  }}
                >
                  Cadastrar nova venda
                </Button>
                <Button
                  type="button"
                  className="next"
                  onClick={() => {
                    clearAll();
                    setStepIndex(0);
                    hasSubmitted.current = false;
                    history.push('/menu');
                  }}
                >
                  Sair
                </Button>
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </SuccessContainer>
  );
};

export default SuccesForm;
