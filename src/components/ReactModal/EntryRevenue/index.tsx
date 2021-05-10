import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { CgSync } from 'react-icons/cg';
import { GrFormEdit } from 'react-icons/gr';
import { toast } from 'react-toastify';
import Modal from '..';
import Input from '../../Input';

import Button from '../../Button';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';

import { Container, Header, InputGroup } from './styles';
import InputDisabled from '../../InputDisabled';
import api from '../../../services/api';
import ReactSelect from '../../ReactSelect';
import { valiateDate } from '../../../utils/validateDate';
import { useAuth } from '../../../context/AuthContext';

type RevenueType = {
  id: string;
  revenue_type: string;
  due_date: string;
  description: string;
  value: number;
  tax_rate: number;
  invoice_value: number;
  invoiceValueBRL: string;
  valueBRL: string;
  status: string;
  city: string;
  cliente_name: string;
};

type Cities = {
  id: string;
  name: string;
};

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  revenue: RevenueType;
}

const EntryRevenue: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  revenue,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [edit, setEdit] = useState(false);
  const [pay, setPay] = useState(false);
  const [cities, setCities] = useState<Cities[]>([]);
  const { userAuth } = useAuth();

  const unmaskedFormData = () => {
    formRef.current?.setFieldValue(
      'due_date',
      DateYMD(formRef.current?.getFieldValue('due_date')),
    );
    formRef.current?.setFieldValue(
      'value_integral',
      unMaked(formRef.current?.getFieldValue('value_integral')),
    );
    formRef.current?.setFieldValue(
      'tax_rate',
      unMaked(formRef.current?.getFieldValue('tax_rate') || '0'),
    );
    formRef.current?.setFieldValue(
      'invoice_value',
      unMaked(formRef.current?.getFieldValue('invoice_value') || '0'),
    );
  };
  useEffect(() => {
    const loadCity = async () => {
      const response = await api.get('/subsidiary');
      const { data } = response;
      const cities = data.map(item => {
        return {
          id: item.id,
          name: item.city,
        };
      });
      setCities(cities);
    };
    loadCity();
  }, []);

  const optionsCities = cities.map(city => {
    return {
      label: city.name,
      value: city.name,
    };
  });
  const optionsbank = userAuth.bank_data.map(bank => {
    return {
      label: bank.bank_name,
      value: bank.id,
    };
  });

  const handleSubmit = async data => {
    formRef.current?.setErrors({});
    try {
      if (pay) {
        const schema = Yup.object({
          pay_date: Yup.string()
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Informe a data de vencimento'),
          bank_data: Yup.string().required('Selecione a conta bancária'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        formRef.current?.setFieldValue(
          'pay_date',
          DateYMD(formRef.current?.getFieldValue('pay_date')),
        );
        const dateForm = formRef.current?.getData();
        await api.patch(`/revenue/paid/${revenue.id}`, dateForm);
        toast.success('Entrada cadastrada com sucesso!');
        window.location.reload();
      } else {
        const schema = Yup.object({
          revenue_type: Yup.string().required('Tipo Obrigatório'),
          description: Yup.string().required('Descrição Obrigatória'),
          due_date: Yup.string()
            .min(12, 'Formato da Data DD/MM/AAAA')
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Informe a data de vencimento'),
          value_integral: Yup.string().required('valor Obrigatório'),
          tax_rate: Yup.string(),
          invoice_value: Yup.string(),
          client: Yup.string().required('valor Obrigatório'),
          subsidiary: Yup.string().required('Selecione a cidade'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        unmaskedFormData();
        const dateForm = formRef.current?.getData();
        await api.put(`/revenue/paid/${revenue.id}`, dateForm);
        toast.success('Entrada cadastrada com sucesso!');
        window.location.reload();
      }
    } catch (err) {
      if (err.request) {
        toast.error('Erro no servidor');
      } else if (err.response) {
        toast.error('Erro no servidor');
      }
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Header>
            <h3>Detalhes</h3>
            <button type="button" onClick={() => setEdit(!edit)}>
              editar
              <GrFormEdit size={25} />
            </button>
          </Header>
          {!edit ? (
            <>
              <InputGroup>
                <InputDisabled label="Tipo" data={revenue.revenue_type} />
                <InputDisabled label="Status" data={revenue.status} />
              </InputGroup>
              <InputGroup>
                <InputDisabled label="Descrição" data={revenue.description} />
                <InputDisabled label="Cliente" data={revenue.cliente_name} />
              </InputGroup>

              <InputDisabled label="Vencimento" data={revenue.due_date} />
              <InputDisabled label="Valor" data={revenue.valueBRL} />
              <InputGroup>
                <InputDisabled
                  label="Taxa de Imposto"
                  data={String(revenue.tax_rate)}
                />
                <InputDisabled
                  label="Valor da Nota"
                  data={revenue.invoiceValueBRL}
                />
              </InputGroup>

              <InputDisabled label="Filial" data={revenue.city} />
              {pay && (
                <InputGroup>
                  <Input
                    mask="date"
                    name="pay_date"
                    label="Data do pagamento"
                  />
                  <ReactSelect
                    label="Conta de Entrada"
                    name="bank_data"
                    options={optionsbank}
                  />
                </InputGroup>
              )}
            </>
          ) : (
            <>
              <Input
                name="revenue_type"
                label="Tipo"
                defaultValue={revenue.revenue_type}
              />
              <Input
                name="description"
                label="Descrição"
                defaultValue={revenue.description}
              />
              <Input
                mask="date"
                name="due_date"
                label="Vencimento"
                defaultValue={revenue.due_date}
              />
              <Input
                mask="currency"
                name="value_integral"
                label="Valor"
                defaultValue={revenue.valueBRL}
              />
              <InputGroup>
                <Input
                  name="tax_rate"
                  label="Taxa de Imposto"
                  defaultValue={String(revenue.tax_rate)}
                />
                <Input
                  mask="currency"
                  name="invoice_value"
                  label="Valor da Nota"
                  defaultValue={revenue.invoiceValueBRL}
                />
              </InputGroup>
              <Input
                name="client"
                label="Cliente"
                defaultValue={revenue.cliente_name}
              />
              <ReactSelect
                label="Filial"
                name="subsidiary"
                options={optionsCities}
                placeholder="Filial"
                defaultInputValue={revenue.city}
              />
            </>
          )}
        </Form>
        {edit ? (
          <Button
            className="add-button"
            onClick={() => formRef.current?.submitForm()}
          >
            <CgSync />
            Atualizar
          </Button>
        ) : pay ? (
          <Button
            className="add-button"
            onClick={() => formRef.current?.submitForm()}
          >
            <CgSync />
            Confirmar
          </Button>
        ) : (
          <Button className="add-button" onClick={() => setPay(!pay)}>
            <CgSync />
            Dar baixa
          </Button>
        )}
      </Container>
    </Modal>
  );
};

export default EntryRevenue;
