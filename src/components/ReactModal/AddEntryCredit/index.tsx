import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Modal from '..';
import Select from '../../ReactSelect';
import Input from '../../Input';
import { Container, InputGroup } from './styles';
import Button from '../../Button';
import api from '../../../services/api';
import { valiateDate } from '../../../utils/validateDate';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

type Subsidiary = {
  id: string;
  name: string;
};

const AddEntryCredit: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [subsidiaries, setSubsidiary] = useState<Subsidiary[]>([]);
  useEffect(() => {
    const loadingSubsidaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiary(response.data);
    };
    loadingSubsidaries();
  }, []);

  const optionsSubsidiary = subsidiaries.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          subsidiary: Yup.string().required('Origem obrigatória'),
          description: Yup.string().required('Descrição obrigatória'),
          client: Yup.string().required('Cliente obrigatória'),
          value_integral: Yup.string().required('Valor Bruto obrigatória'),
          due_date: Yup.string()
            .max(12, 'Formato da Data DD/MM/AAAA')
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Data do vencimento obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          ...data,
          revenue_type: 'CREDITO',
          value_integral: unMaked(data.value_integral),
          due_date: DateYMD(data.due_date),
        };

        await api.post('/revenue', formData);
        toast.success('Entrada adicionada');
        history.push('/financeiro/futuro');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }

        toast.error('ERROR!, verifique as informações e tente novamente');
      }
      setIsOpen();
    },
    [setIsOpen, history],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Adicionar nova entrada de Crédito</h3>
          <InputGroup>
            <Select
              name="subsidiary"
              label="Origem"
              options={optionsSubsidiary}
            />
          </InputGroup>
          <InputGroup>
            <Input name="description" label="Descrição" />
          </InputGroup>
          <InputGroup>
            <Input name="client" label="Nome do Cliente" />
          </InputGroup>
          <InputGroup>
            <Input name="value_integral" label="Valor bruto" mask="currency" />
            <Input name="due_date" label="Data do Vencimento" mask="date" />
          </InputGroup>
        </Form>
        <Button
          className="add-button"
          onClick={() => formRef.current?.submitForm()}
        >
          <BsCheck />
          Adicionar entrada
        </Button>
      </Container>
    </Modal>
  );
};

export default AddEntryCredit;
