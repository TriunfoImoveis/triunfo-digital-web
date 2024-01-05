import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import Select from '../ReactSelect';

import { Container, InputGroup } from './styles';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { valiateDate } from '../../utils/validateDate';
import getValidationErros from '../../utils/getValidationErros';
import { DateYMD, unMaked } from '../../utils/unMasked';
import axios from 'axios';

type ConfirmAccountProps = {
  accountId: string;
};

const ConfirmAccount: React.FC<ConfirmAccountProps> = ({ accountId }) => {
  const [isLoadingAddAccount, setIsLoadingAddAccount] = useState(false);
  const { userAuth } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const optionsBankData = userAuth.bank_data.map(bank => ({
    label: `${bank.account} - ${bank.bank_name}`,
    value: bank.id,
  }));

  const handleSubmit = async data => {
    formRef.current?.setErrors({});
    try {
      setIsLoadingAddAccount(true);
      const schema = Yup.object({
        value_paid: Yup.string().required('Valor Pago obrigatório'),
        pay_date: Yup.string()
          .test('validateDate', 'Data Invalida', function valid(value) {
            const { path, createError } = this;
            const isValid = valiateDate(value);
            return isValid || createError({ path, message: 'Data Invalida' });
          })
          .required('Informe a data do pagamento'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formData = {
        value_paid: unMaked(data.value_paid),
        pay_date: DateYMD(data.pay_date),
        bank_data: data.bank_data,
      };
      await api.patch(`/expense/paid/${accountId}`, formData);
      toast.success('Confirmação de pagamento feito com sucesso');
      history.push('/financeiro/contas');
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
          <Input name="value_paid" label="Valor Pago" mask="currency" />
        </InputGroup>
        <InputGroup>
          <Input name="pay_date" label="Data do Pagamento" mask="date" />
        </InputGroup>
        <InputGroup>
          <Select
            label="Conta Bancária"
            name="bank_data"
            options={optionsBankData}
          />
        </InputGroup>
      </Form>
      <Button
        className="add-button"
        colorsText='#FFF'
        onClick={() => formRef.current?.submitForm()}
      >
        <BsCheck />
        {!isLoadingAddAccount ? 'Dar a baixa' : '...liquidando'}
      </Button>
    </Container>
  );
};

export default ConfirmAccount;
