import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';
import { useForm } from '../../../context/FormContext';

import Select from '../../Select';
import Button from '../../Button';

import {
  Container,
  InputGroup,
  ButtonGroup,
  InputForm,
  InputFormMask,
} from './styles';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<ISaleNewData> = ({ nextStep, prevStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [numberInput, setNumberInputs] = useState({});
  const { updateFormData } = useForm();

  const optionsEstadoCivil = [
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  const optionsGenero = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Outros', value: 'outro' },
  ];

  const optionsQuantFilhos = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4 ' },
  ];

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        // mudar os nomes da validação
        const schema = Yup.object().shape({
          name_client: Yup.string().required('Nome Obrigatório'),
          cpf: Yup.string()
            .max(14, 'Informe o cpf corretamente')
            .required('CPF obrigatório'),
          data_nasc: Yup.string().required('Data de nascimento obrigatória'),
          estado_civil: Yup.string().required('Estado Civil Obrigatório'),
          genero: Yup.string().required('Genero Obrigatório'),
          quant_filhos: Yup.string().required(
            'Quantidade de filhos Obrigatória',
          ),
          profissao: Yup.string().required('Profissão Obrigatória'),
          telefone: Yup.string().required('Telefone obrigatório'),
          whatsapp: Yup.string().required('Whatsapp obrigatório'),
          email: Yup.string()
            .email('informe um email Válido')
            .required('E-mail Obrigatório'),
          origin: Yup.string().required('Origem do cliente obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const newData = Object.assign(data, numberInput);
        updateFormData(newData);
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }

        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [updateFormData, nextStep, numberInput],
  );

  const handleNumberInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      const valueFormated = value.replace(/([^\d+,])+/gim, '');
      setNumberInputs({ ...numberInput, [id]: valueFormated });
    },
    [numberInput],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <InputFormMask
            id="cpf"
            mask="999.999.999-99"
            name="client_buyer.cpf"
            placeholder="CPF"
            onChange={handleNumberInput}
          />
          <InputForm
            type="date"
            name="client_buyer.date_birth"
            placeholder="Data Nasc."
          />
        </InputGroup>
        <InputForm name="client_buyer.name" placeholder="Nome" />
        <InputGroup>
          <Select
            name="client_buyer.civil_status"
            options={optionsEstadoCivil}
            icon={IoMdArrowDropdown}
            nameLabel="o Estado Civíl"
          />
          <Select
            name="client_buyer.gender"
            options={optionsGenero}
            icon={IoMdArrowDropdown}
            nameLabel="o genero"
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="client_buyer.number_children"
            options={optionsQuantFilhos}
            icon={IoMdArrowDropdown}
            nameLabel="a Quantidade de Filhos"
          />
          <InputForm
            name="client_buyer.occupation"
            type="text"
            placeholder="Profissão"
          />
        </InputGroup>
        <InputGroup>
          <InputFormMask
            id="telefone"
            mask="(99) 99999-9999"
            name="client_buyer.phone"
            type="text"
            placeholder="Telefone"
            onChange={handleNumberInput}
          />
          <InputFormMask
            id="whatsapp"
            mask="+55 (99) 99999-9999"
            name="client_buyer.whatsapp"
            type="text"
            placeholder="Whatsapp"
            onChange={handleNumberInput}
          />
        </InputGroup>
        <InputForm
          name="client_buyer.email"
          type="email"
          placeholder="E-mail"
        />
        <Select
          name="origin"
          options={[{ label: 'OLX', value: 'OLX' }]}
          icon={IoMdArrowDropdown}
          nameLabel="a Origem"
        />
        <ButtonGroup>
          <Button type="button" className="cancel" onClick={() => prevStep()}>
            Voltar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step2;
