import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SiGooglecalendar } from 'react-icons/si';
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
  const { updateFormData, formData } = useForm();

  const optionsEstadoCivil = [
    { label: 'Casado', value: 'Casado' },
    { label: 'Solteiro', value: 'Solteiro' },
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Viuvo', value: 'viuvo' },
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
        const schema = Yup.object().shape({
          name_client: Yup.string().required('Nome Obrigatório'),
          cpf: Yup.string()
            .max(14, 'Informe o cpf corretamente')
            .required('CPF obrigatório'),
          data_nasc: Yup.string().required('Data Obrigatória'),
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
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        updateFormData(data);
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
    [updateFormData, nextStep],
  );

  return (
    <Container>
      {console.log(formData)}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm name="name_client" placeholder="Nome" />
        <InputGroup>
          <InputFormMask mask="999.999.999-99" name="cpf" placeholder="CPF" />
          <InputFormMask
            mask="99/99/9999"
            icon={SiGooglecalendar}
            name="data_nasc"
            placeholder="Data Nasc."
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="estado_civil"
            options={optionsEstadoCivil}
            icon={IoMdArrowDropdown}
            nameLabel="o Estado Civíl"
          />
          <Select
            name="genero"
            options={optionsGenero}
            icon={IoMdArrowDropdown}
            nameLabel="o genero"
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="quant_filhos"
            options={optionsQuantFilhos}
            icon={IoMdArrowDropdown}
            nameLabel="a Quantidade de Filhos"
          />
          <InputForm name="profissao" type="text" placeholder="Profissão" />
        </InputGroup>
        <InputGroup>
          <InputFormMask
            mask="(99) 99999-9999"
            name="telefone"
            type="text"
            placeholder="Telefone"
          />
          <InputFormMask
            mask="+55 (99) 99999-9999"
            name="whatsapp"
            type="text"
            placeholder="Whatsapp"
          />
        </InputGroup>
        <InputForm name="email" type="email" placeholder="E-mail" />
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
