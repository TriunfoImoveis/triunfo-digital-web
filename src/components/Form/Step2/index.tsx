import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';
import { unMaked } from '../../../utils/unMasked';
import { useForm } from '../../../context/FormContext';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<ISaleNewData> = ({ nextStep, prevStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
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

  const unMaskValue = useCallback(() => {
    const cpf = unMaked(formRef.current?.getFieldValue('client_buyer.cpf'));
    formRef.current?.setFieldValue('client_buyer.cpf', cpf);
    const phone = unMaked(formRef.current?.getFieldValue('client_buyer.phone'));
    formRef.current?.setFieldValue('client_buyer.phone', phone);
    const whatsapp = unMaked(
      formRef.current?.getFieldValue('client_buyer.whatsapp'),
    );
    formRef.current?.setFieldValue('client_buyer.whatsapp', whatsapp);
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMaskValue();
    const data = formRef.current?.getData();
    try {
      setLoading(true);
      // mudar os nomes da validação
      const schema = Yup.object().shape({
        client_buyer: Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          cpf: Yup.string()
            .max(14, 'Informe o cpf corretamente')
            .required('CPF obrigatório'),
          date_birth: Yup.string().required('Data de nascimento obrigatória'),
          civil_status: Yup.string().required('Estado Civil Obrigatório'),
          gender: Yup.string().required('Genero Obrigatório'),
          number_children: Yup.string().required(
            'Quantidade de filhos Obrigatória',
          ),
          occupation: Yup.string().required('Profissão Obrigatória'),
          phone: Yup.string().required('Telefone obrigatório'),
          whatsapp: Yup.string().required('Whatsapp obrigatório'),
          email: Yup.string()
            .email('informe um email Válido')
            .required('E-mail Obrigatório'),
        }),
        origin: Yup.string().required('Origem do cliente obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      updateFormData(data || {});
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
  }, [updateFormData, nextStep, unMaskValue]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Scope path="client_buyer">
          <InputGroup>
            <InputForm mask="cpf" name="cpf" placeholder="CPF" />
            <InputForm type="date" name="date_birth" placeholder="Data Nasc." />
          </InputGroup>
          <InputForm name="name" placeholder="Nome" />
          <InputGroup>
            <Select
              name="civil_status"
              options={optionsEstadoCivil}
              icon={IoMdArrowDropdown}
              nameLabel="o Estado Civíl"
            />
            <Select
              name="gender"
              options={optionsGenero}
              icon={IoMdArrowDropdown}
              nameLabel="o genero"
            />
          </InputGroup>
          <InputGroup>
            <Select
              name="number_children"
              options={optionsQuantFilhos}
              icon={IoMdArrowDropdown}
              nameLabel="a Quantidade de Filhos"
            />
            <InputForm name="occupation" type="text" placeholder="Profissão" />
          </InputGroup>
          <InputGroup>
            <InputForm
              id="phone"
              mask="fone"
              name="phone"
              type="text"
              placeholder="Telefone"
            />
            <InputForm
              id="whatsapp"
              mask="whats"
              name="whatsapp"
              type="text"
              placeholder="Whatsapp"
            />
          </InputGroup>
          <InputForm name="email" type="email" placeholder="E-mail" />
        </Scope>
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
