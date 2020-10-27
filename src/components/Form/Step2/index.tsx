import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SiGooglecalendar } from 'react-icons/si';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';

interface ISaleNewData {
  SaleNewData(data: object): void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<ISaleNewData> = ({ SaleNewData, nextStep, prevStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

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
        const schema = Yup.object().shape({});
        await schema.validate(data, {
          abortEarly: false,
        });

        SaleNewData(data);
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
    [SaleNewData, nextStep],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm name="name_client" placeholder="Nome" />
        <InputGroup>
          <InputForm
            id="cpf"
            type="tel"
            name="cpf"
            placeholder="CPF"
            pattern="[0-9]{11}"
          />
          <InputForm
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
          <InputForm name="telefone" type="text" placeholder="Telefone" />
          <InputForm name="whatsapp" type="text" placeholder="Whatsapp" />
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
