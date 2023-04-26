import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import Input from '../Input';
import Button from '../Button';

import { Container, InputGroup } from './styles';
import api from '../../services/api';
import { DateYMD, unMaked } from '../../utils/unMasked';
import { valiateDate } from '../../utils/validateDate';
import getValidationErros from '../../utils/getValidationErros';
import { DateBRL, formatPrice } from '../../utils/format';
import axios from 'axios';

type Options = {
  label: string;
  value: string;
};

type Exit = {
  value: string;
  pay_date: string;
  value_paid: string;
};
type EditExitProps = {
  accountId: string;
};

const EditExit: React.FC<EditExitProps> = ({ accountId }) => {
  const [account, setAccount] = useState({} as Exit);
  const [isLoadingAddAccount, setIsLoadingAddAccount] = useState(false);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const loadAccount = async () => {
      const response = await api.get(`/expense/${accountId}`);
      const account = response.data;
      setAccount({
        value: formatPrice(account.value),
        pay_date: DateBRL(account.pay_date),
        value_paid: formatPrice(account.value_paid)
      });
    };
    loadAccount();
  }, [accountId]);

  const handleSubmit = async data => {
    formRef.current?.setErrors({});
    try {
      setIsLoadingAddAccount(true);
      const schema = Yup.object({
        pay_date: Yup.string()
          .test('validateDate', 'Data Invalida', function valid(value) {
            const { path, createError } = this;
            const isValid = valiateDate(value);
            return isValid || createError({ path, message: 'Data Invalida' });
          })
          .required('Informe a data de vencimento'),
        value: Yup.string().required('Valor da conta'),
        value_paid:  Yup.string().required('Valor da conta')
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
      const formData = {
        pay_date: DateYMD(data.pay_date),
        value: Number(unMaked(data.value)),
        value_paid:  Number(unMaked(data.value))
      };
      await api.put(`/expense/${accountId}`, formData);
      toast.success('Conta atualizada com sucesso');
    } catch (err) {
      if (axios?.isAxiosError(err)) {
        if (err.request) {
          toast.error('Erro no servidor');
        } else if (err.response) {
          toast.error('Erro no servidor');
        } 
      } else if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      toast.error('Houve um error, contate o suporte!');
    } finally {
      setIsLoadingAddAccount(false);
    }
  };
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            name="pay_date"
            label="Data do pagamento"
            mask="date"
            defaultValue={account.pay_date}
          />
          <Input name="value" label="Valor" mask='currency' defaultValue={account.value} />
          <Input name="value_paid" label="Valor Pago" mask='currency' defaultValue={account.value_paid} />
        </InputGroup>       
      </Form>
      <Button
        className="add-button"
        onClick={() => formRef.current?.submitForm()}
      >
        <BsCheck />
        {!isLoadingAddAccount ? 'Atualizar dados' : '...Atualizando'}
      </Button>
    </Container>
  );
};

export default EditExit;
