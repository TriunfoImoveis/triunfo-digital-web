import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { CgSync } from 'react-icons/cg';
import { GrFormEdit } from 'react-icons/gr';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Modal from '..';
import Input from '../../Input';

import Button from '../../Button';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';

import { Container, Header, InputGroup } from './styles';
import InputDisabled from '../../InputDisabled';
import api from '../../../services/api';
import ReactSelect from '../../ReactSelect';

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

  const handleSubmit = useCallback(async data => {
    console.log(data);
    formRef.current?.setErrors({});
    // try {
    //   const schema = Yup.object({
    //     installments: Yup.array().of(
    //       Yup.object().shape({
    //         value: Yup.string().required('Informe o valor da parcela'),
    //         due_date: Yup.string().required('Informe a data de vencimento'),
    //       }),
    //     ),
    //   });
    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });
    //   const installments = data.installments.map(installment => ({
    //     installment_number: installment.installment_number,
    //     value: unMaked(installment.value),
    //     due_date: DateYMD(installment.due_date),
    //   }));
    //   const newData = { installments };
    //   handleEditInstallments(newData);
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     const erros = getValidationErros(err);
    //     formRef.current?.setErrors(erros);
    //   }
    // }
  }, []);

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
                <Input mask="date" name="pay_date" label="Data do pagamento" />
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
        ) : (
          <Button className="add-button" onClick={() => setPay(!pay)}>
            <CgSync />
            {pay ? 'Confirmar' : 'Dar baixa'}
          </Button>
        )}
      </Container>
    </Modal>
  );
};

export default EntryRevenue;
