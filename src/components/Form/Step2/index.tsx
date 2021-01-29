import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';
import { unMaked, DateYMD } from '../../../utils/unMasked';
import { FoneMask, WhatsMask } from '../../../utils/masked';
import { DateBRL } from '../../../utils/format';
import { useForm } from '../../../context/FormContext';
import api from '../../../services/api';

import Select from '../../ReactSelect';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';
import { valiateDate } from '../../../utils/validateDate';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeClient: 'buyer' | 'salesman';
}

interface IClientData {
  name: string;
  date_birth: string;
  email: string;
  phone: string;
  whatsapp: string;
  occupation: string;
  civil_status: string;
  number_children: number;
  gender: string;
}

const Step2: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeClient }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [client, setCliente] = useState<IClientData>({} as IClientData);
  const [disabled, setDisable] = useState(true);
  const { updateFormData } = useForm();

  useEffect(() => {
    setDisable(true);
    setCliente({} as IClientData);
    return () => {
      setDisable(true);
      setCliente({} as IClientData);
    };
  }, []);
  const searchClientoForCPF = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setCliente({} as IClientData);
      const cpf = event.target.value;
      if (cpf.length === 11) {
        try {
          const unMaskedCPF = unMaked(cpf);
          const response = await api.get(`/client?cpf=${unMaskedCPF}`);
          const {
            name,
            date_birth,
            email,
            phone,
            whatsapp,
            occupation,
            civil_status,
            number_children,
            gender,
          } = response.data;
          setDisable(true);
          setCliente({
            name,
            date_birth: DateBRL(date_birth),
            email,
            phone: FoneMask(phone),
            whatsapp: WhatsMask(whatsapp),
            occupation,
            civil_status,
            number_children,
            gender,
          } as IClientData);
        } catch (error) {
          setCliente({} as IClientData);
          setDisable(false);
        }
      }
    },
    [],
  );
  const optionsEstadoCivil = [
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  const optionsGenero = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' },
    { label: 'Outros', value: 'OUTROS' },
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
              .min(
                11,
                'Informe o cpf corretamente, cpf deve conter 11 digitos, sem traços ou pontos',
              )
              .max(14, 'Informe o cpf corretamente')
              .required('CPF obrigatório'),
            date_birth: Yup.string()
              .test('validateDate', 'Data Invalida', function valid(value) {
                const { path, createError } = this;
                const isValid = valiateDate(value);
                return (
                  isValid || createError({ path, message: 'Data Invalida' })
                );
              })
              .required('Data de nascimento obrigatória'),
            civil_status: Yup.string().required('Estado Civil Obrigatório'),
            gender: Yup.string().required('Genero Obrigatório'),
            number_children: Yup.string().required(
              'Quantidade de filhos Obrigatória',
            ),
            occupation: Yup.string().required('Profissão Obrigatória'),
            phone: Yup.string()
              .min(11, 'O numero precisa ter pelo menos 11 números')
              .max(14, 'Digite um numero de telefone válido')
              .required('Telefone obrigatório'),
            whatsapp: Yup.string()
              .min(11, 'O numero precisa ter pelo menos 11 digitos')
              .max(14, 'Digite um numero de telefone válido')
              .required('Whatsapp obrigatório'),
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
              .min(14, 'Informe o cpf corretamente')
              .required('CPF obrigatório'),
            date_birth: Yup.string()
              .min(12, 'Formato da Data DD/MM/AAAA')
              .test('validateDate', 'Data Invalida', function valid(value) {
                const { path, createError } = this;
                const isValid = valiateDate(value);
                return (
                  isValid || createError({ path, message: 'Data Invalida' })
                );
              })
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
      updateFormData(data || {});
      nextStep();
      setCliente({} as IClientData);
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
                defaultValue={client.date_birth}
              />
            </InputGroup>
            <InputForm
              label="Nome Completo"
              name="name"
              readOnly={disabled}
              defaultValue={client.name}
            />
            <InputGroup>
              {disabled ? (
                <>
                  <InputForm
                    label="Estado Civíl"
                    name="civil_status"
                    readOnly={disabled}
                    defaultValue={client.civil_status}
                  />
                  <InputForm
                    label="Gênero"
                    name="gender"
                    readOnly={disabled}
                    defaultValue={client.gender}
                  />
                </>
              ) : (
                <>
                  <Select
                    name="civil_status"
                    placeholder="Infome o Estado Civíl"
                    options={optionsEstadoCivil}
                    label="Estado Civíl"
                    isDisabled={disabled}
                    defaultInputValue={client.civil_status}
                  />
                  <Select
                    name="gender"
                    placeholder="Infome o Genêno"
                    options={optionsGenero}
                    label="Gênero"
                    isDisabled={disabled}
                    defaultInputValue={client.gender}
                  />
                </>
              )}
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Números de Filhos"
                name="number_children"
                type="number"
                maxlength={2}
                readOnly={disabled}
                defaultValue={client.number_children}
              />
              <InputForm
                label="Profissão"
                name="occupation"
                type="text"
                readOnly={disabled}
                defaultValue={client.occupation}
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
                defaultValue={client.phone}
              />
              <InputForm
                label="Whatsapp"
                id="whatsapp"
                mask="whats"
                name="whatsapp"
                type="text"
                maxlength={11}
                readOnly={disabled}
                defaultValue={client.whatsapp}
              />
            </InputGroup>
            <InputForm
              label="E-mail"
              name="email"
              type="email"
              readOnly={disabled}
              defaultValue={client.email}
            />
          </Scope>
        )}
        {typeClient === 'salesman' && (
          <Scope path="client_seller">
            <InputGroup>
              <InputForm
                label="CPF"
                mask="cpf"
                name="cpf"
                maxlength={11}
                onChange={searchClientoForCPF}
              />
              <InputForm
                label="Data de Nascimento"
                type="date"
                name="date_birth"
                readOnly={disabled}
                defaultValue={client.date_birth}
              />
            </InputGroup>
            <InputForm
              label="Nome Completo"
              name="name"
              readOnly={disabled}
              defaultValue={client.name}
            />
            <InputGroup>
              <Select
                name="civil_status"
                options={optionsEstadoCivil}
                nameLabel="Estado Civíl"
                disabled={disabled}
                defaultInputValue={client.civil_status}
              />
              <Select
                name="gender"
                options={optionsGenero}
                nameLabel="Gênero"
                disabled={disabled}
                defaultInputValue={client.gender}
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                label="Número de Filhos"
                name="number_children"
                type="number"
                maxlength={2}
                readOnly={disabled}
                defaultValue={client.number_children}
              />
              <InputForm
                label="Profissão"
                name="occupation"
                type="text"
                readOnly={disabled}
                defaultValue={client.occupation}
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
                defaultValue={client.phone}
              />
              <InputForm
                label="Whatsapp"
                id="whatsapp"
                mask="whats"
                name="whatsapp"
                type="text"
                maxlength={11}
                readOnly={disabled}
                defaultValue={client.whatsapp}
              />
            </InputGroup>
            <InputForm
              label="E-mail"
              name="email"
              type="email"
              readOnly={disabled}
              defaultValue={client.email}
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
