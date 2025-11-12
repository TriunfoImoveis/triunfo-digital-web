import React, {
  useRef,
  useCallback,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin, ButtonGroup } from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';

import { useFetchFinances } from '../../../hooks/useFetchFinances';
import { BiCheck } from 'react-icons/bi';

interface IRoteparams {
  id: string;
}

interface INeighboorhood {
  id: string;
  name: string;
  active: boolean;
}

const UpdateProfession: React.FC = () => {
  const { id } = useParams<IRoteparams>();

  const { data: profession } = useFetchFinances<INeighboorhood>({
    url: `/professions/${id}`,
  });

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const updateProfession = useCallback(async () => {
    const data = formRef.current?.getData();
    try {
      await api.put(`/professions/${id}`, data);
      toast.success('Dados da Profissão Atualizadas com sucesso');
      window.location.reload();
    } catch (error) {
      toast.error('ERRO!');
    }
  }, [id]);
  const deleteProfession = useCallback(async () => {
    try {
      await api.put(
        `/professions/${id}`,
        {
          ...profession,
          active: false,
        },
      );
      toast.success('Profissão desativada com sucesso');
      history.push('/adm/config/profissoes');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, profession, id]);
  const activateProfession = useCallback(async () => {
    try {
       await api.put(
        `/professions/${id}`,
        {
          ...profession,
          active: true,
        },
      );
      toast.success('Profissão Ativada com sucesso');
      history.push('/adm/config/profissoes');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, profession, id]);


  return (
    <AdmLayout>
      <Container>
        <h1>Novo Bairro</h1>
        <Form
          ref={formRef}
          onSubmit={updateProfession}
          initialData={profession}
        >
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DO BAIRRO</legend>
              <Input label="Nome" name="name" />
            </fieldset>
          </InfoLogin>

          <ButtonGroup>
            <button type="submit">
              <Sync />
              <span>Atualizar</span>
            </button>
            {profession && profession.active ? (
              <button type="button" onClick={deleteProfession}>
                <Garb />
                <span>Desativar</span>
              </button>
            ) : (
              <button type="button" onClick={activateProfession}>
                <BiCheck size={50} />
                <span>Ativar</span>
              </button>
            )}
          </ButtonGroup>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default UpdateProfession;
