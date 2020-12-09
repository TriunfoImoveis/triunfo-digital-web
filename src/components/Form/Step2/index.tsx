import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';
import { unMaked, DateYMD } from '../../../utils/unMasked';
import { useForm } from '../../../context/FormContext';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeClient: 'buyer' | 'salesman';
}

const Step2: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeClient }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(true);
  const { updateFormData } = useForm();

  const searchClientoForCPF = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const cpf = event.target.value;
      if (cpf.length < 11) {
        return;
      }

      setTimeout(() => {
        setDisable(!disabled);
      }, 1000);
    },
    [disabled],
  );
  const optionsEstadoCivil = [
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  const optionsGenero = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
  ];

  const unMaskValue = useCallback(() => {
    if (typeClient === 'buyer') {
      const cpf = unMaked(formRef.current?.getFieldValue('client_buyer.cpf'));
      formRef.current?.setFieldValue('client_buyer.cpf', cpf);
      const date_birth = DateYMD(
        formRef.current?.getFieldValue('client_buyer.date_birth'),
      );
      formRef.current?.setFieldValue('client_buyer.date_birth', date_birth);
      const phone = unMaked(
        formRef.current?.getFieldValue('client_buyer.phone'),
      );
      formRef.current?.setFieldValue('client_buyer.phone', phone);
      const whatsapp = unMaked(
        formRef.current?.getFieldValue('client_buyer.whatsapp'),
      );
      formRef.current?.setFieldValue('client_buyer.whatsapp', whatsapp);
      const numberChildren = Number(
        formRef.current?.getFieldValue('client_buyer.number_children'),
      );
      formRef.current?.setFieldValue(
        'client_buyer.number_children',
        numberChildren,
      );
    } else {
      const cpf = unMaked(formRef.current?.getFieldValue('client_seller.cpf'));
      formRef.current?.setFieldValue('client_seller.cpf', cpf);
      const date_birth = DateYMD(
        formRef.current?.getFieldValue('client_buyer.date_birth'),
      );
      formRef.current?.setFieldValue('client_buyer.date_birth', date_birth);
      const phone = unMaked(
        formRef.current?.getFieldValue('client_seller.phone'),
      );
      formRef.current?.setFieldValue('client_seller.phone', phone);
      const whatsapp = unMaked(
        formRef.current?.getFieldValue('client_seller.whatsapp'),
      );
      formRef.current?.setFieldValue('client_seller.whatsapp', whatsapp);
      const numberChildren = Number(
        formRef.current?.getFieldValue('client_seller.number_children'),
      );
      formRef.current?.setFieldValue(
        'client_buyer.number_children',
        numberChildren,
      );
    }
  }, [typeClient]);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMaskValue();
    const data = formRef.current?.getData();
    try {
      setLoading(true);
      if (typeClient === 'buyer') {
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
        });
        await schema.validate(data, {
          abortEarly: false,
        });
      } else {
        const schema = Yup.object().shape({
          client_seller: Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório'),
            cpf: Yup.string()
              .max(14, 'Informe o cpf corretamente')
              .required('CPF obrigatório'),
            date_birth: Yup.string()
              .max(12, 'Formato da Data DD/MM/AAAA')
              .required('Data de nascimento obrigatória'),
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
        });
        await schema.validate(data, {
          abortEarly: false,
        });
      }
      console.log(data);
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
  }, [updateFormData, nextStep, unMaskValue, typeClient]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {typeClient === 'buyer' && (
          <Scope path="client_buyer">
            <InputGroup>
              <InputForm
                label="CPF"
                mask="cpf"
                name="cpf"
                maxlength={11}
                onChange={searchClientoForCPF}
              />
              <InputForm
                mask="date"
                label="Data de Nascimento"
                name="date_birth"
                readOnly={disabled}
              />
            </InputGroup>
            <InputForm label="Nome Completo" name="name" readOnly={disabled} />
            <InputGroup>
              <Select
                name="civil_status"
                options={optionsEstadoCivil}
                nameLabel="Estado Civíl"
                disabled={disabled}
              />
              <Select
                name="gender"
                options={optionsGenero}
                nameLabel="Gênero"
                disabled={disabled}
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Números de Filhos"
                name="number_children"
                type="number"
                maxlength={2}
                readOnly={disabled}
              />
              <InputForm
                label="Profissão"
                name="occupation"
                type="text"
                readOnly={disabled}
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Telefone"
                id="phone"
                mask="fone"
                name="phone"
                type="text"
                maxlength={11}
                readOnly={disabled}
              />
              <InputForm
                label="Whatsapp"
                id="whatsapp"
                mask="whats"
                name="whatsapp"
                type="text"
                maxlength={11}
                readOnly={disabled}
              />
            </InputGroup>
            <InputForm
              label="E-mail"
              name="email"
              type="email"
              readOnly={disabled}
            />
          </Scope>
        )}
        {typeClient === 'salesman' && (
          <Scope path="client_seller">
            <InputGroup>
              <InputForm label="CPF" mask="cpf" name="cpf" maxlength={11} />
              <InputForm
                label="Data de Nascimento"
                type="date"
                name="date_birth"
                readOnly={disabled}
              />
            </InputGroup>
            <InputForm label="Nome Completo" name="name" readOnly={disabled} />
            <InputGroup>
              <Select
                name="civil_status"
                options={optionsEstadoCivil}
                nameLabel="Estado Civíl"
                disabled={disabled}
              />
              <Select
                name="gender"
                options={optionsGenero}
                nameLabel="Gênero"
                disabled={disabled}
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Número de Filhos"
                name="number_children"
                type="number"
                maxlength={2}
                readOnly={disabled}
              />
              <InputForm
                label="Profissão"
                name="occupation"
                type="text"
                readOnly={disabled}
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Telefone"
                id="phone"
                mask="fone"
                name="phone"
                type="text"
                maxlength={11}
                readOnly={disabled}
              />
              <InputForm
                label="Whatsapp"
                id="whatsapp"
                mask="whats"
                name="whatsapp"
                type="text"
                maxlength={11}
                readOnly={disabled}
              />
            </InputGroup>
            <InputForm
              label="E-mail"
              name="email"
              type="email"
              readOnly={disabled}
            />
          </Scope>
        )}
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
