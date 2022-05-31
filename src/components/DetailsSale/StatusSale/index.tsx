import React, { useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Select from '../../ReactSelect';
import InputDisabled from '../../InputDisabled';
import { Sync } from '../../../assets/images';
import { statusSaleOptions } from '../../../utils/loadOptions';
import { ButtonGroup, Legend, SaleData } from '../styles';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';


interface StatusSaleProps {
  statusSale: string;
}

interface Params {
  id: string;
}

interface FormData {
  status: string;
}
const StatusSale: React.FC<StatusSaleProps> = ({ statusSale }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<Params>();

  const handleUpdateStatus: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        status: Yup.string().required('status da venda obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/sale/${id}`, data);

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
  return (
    <Form ref={formRef} onSubmit={handleUpdateStatus}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>STATUS DA VENDA</legend>
            {statusSale !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color={theme.colors.primary} />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {!edit ? (
            <InputDisabled label="Status da venda" data={statusSale} />
          ) : (
            <Select
              name="status"
              label="Status da Venda"
              options={statusSaleOptions}
            />
          )}
          {edit && (
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

export default StatusSale;
