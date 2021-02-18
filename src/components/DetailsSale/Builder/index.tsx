import React, { useEffect, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Sync } from '../../../assets/images';

import InputDisable from '../../InputDisabled';
import Select from '../../ReactSelect';

import api from '../../../services/api';

import { SaleData, Legend, ButtonGroup } from '../styles';
import getValidationErros from '../../../utils/getValidationErros';

interface IBuilderProps {
  status: string;
  builder: {
    id: string;
    name: string;
  };
  uf: string;
}

interface IBuilder {
  id: string;
  name: string;
}

interface FormData {
  builder: string;
}

interface Params {
  id: string;
}

const Builder: React.FC<IBuilderProps> = ({ builder, status, uf }) => {
  const formRef = useRef<FormHandles>(null);
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [builders, setBuilders] = useState<IBuilder[]>([]);
  const history = useHistory();
  const { id } = useParams<Params>();

  useEffect(() => {
    const loadBuilder = async () => {
      const response = await api.get(`/builder?uf=${uf}`);
      setBuilders(response.data);
    };
    loadBuilder();
  }, [uf]);
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        builder: Yup.string().required('Construtora obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/sale/${id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            '@TriunfoDigital:token',
          )}`,
        },
      });

      toast.success('Dados da Venda atualizadas!');
      history.push('/adm/lista-vendas');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      toast.error('ERROR!, verifique as informações e tente novamente');
    } finally {
      setLoading(false);
    }
  };

  const optionsBuilders = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  }));
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>CONSTRUTORA</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <InputDisable label="" data={builder?.name} />
          ) : (
            <Select name="builder" options={optionsBuilders} />
          )}
          {!edit && (
            <ButtonGroup>
              <button type="submit">
                <Sync />
                <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
              </button>
            </ButtonGroup>
          )}
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default Builder;
