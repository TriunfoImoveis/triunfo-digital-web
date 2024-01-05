import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import CreatableSelect from '../ReactSelect/Creatable';
import Input from '../Input';
import Select from '../ReactSelect';
import Button from '../Button';

import { Container, InputGroup } from './styles';
import api from '../../services/api';
import InputDisabled from '../InputDisabled';
import { useAuth } from '../../context/AuthContext';
import { DateYMD, unMaked } from '../../utils/unMasked';
import { valiateDate } from '../../utils/validateDate';
import getValidationErros from '../../utils/getValidationErros';
import axios from 'axios';

type Options = {
  label: string;
  value: string;
};

const AccountFixed: React.FC = () => {
  const [optionsSubsidiary, setOptionsSubsiary] = useState<Options[]>([]);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [isLoadingAddAccount, setIsLoadingAddAccount] = useState(false);
  const [optionsGroup, setOptionsGroup] = useState<Options[]>([]);
  const { userAuth } = useAuth();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const loadingSubsidaries = async () => {
      const response = await api.get('/subsidiary');
      const options = response.data.map(item => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionsSubsiary(options);
    };
    loadingSubsidaries();
  }, []);
  useEffect(() => {
    const loadingGroups = async () => {
      const response = await api.get('/expense/groups');
      const options = response.data.map(item => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionsGroup(options);
    };
    loadingGroups();
  }, []);

  const handleCreateNewGroup = async (group: string) => {
    await api.post('/expense/groups', {
      name: group,
    });
    const response = await api.get('/expense/groups');
    const newOptions = response.data.map(op => {
      return {
        label: op.name,
        value: op.id,
      };
    });
    return newOptions;
  };
  const handleCreateGroup = async (newValue: any) => {
    setIsLoadingGroup(true);
    const options = await handleCreateNewGroup(newValue);
    setIsLoadingGroup(false);
    setOptionsGroup(options);
  };

  const handleSubmit = async data => {
    formRef.current?.setErrors({});
    try {
      setIsLoadingAddAccount(true);
      const schema = Yup.object({
        description: Yup.string().required('Descrição Obrigatória'),
        due_date: Yup.string()
          .test('validateDate', 'Data Invalida', function valid(value) {
            const { path, createError } = this;
            const isValid = valiateDate(value);
            return isValid || createError({ path, message: 'Data Invalida' });
          })
          .required('Informe a data de vencimento'),
        value: Yup.string().required('Valor da conta'),
        group: Yup.string().required('Selecione um grupo'),
        subsidiary: Yup.string().required('Selecione a origem'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formData = {
        ...data,
        expense_type: 'FIXA',
        due_date: DateYMD(data.due_date),
        repeat: Number(data.repeat) || 1,
        value: Number(unMaked(data.value)),
        user: userAuth.id,
      };
      await api.post('/expense', formData);
      toast.success('Conta Cadastrada com sucesso');
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
          <Select
            name="subsidiary"
            label="Origem"
            options={optionsSubsidiary}
          />
          <Input name="description" label="Descrição" />
        </InputGroup>
        <InputGroup>
          <Input name="value" label="Valor" mask="currency" />
        </InputGroup>
        <InputGroup>
          <Input name="due_date" label="Data de Inicio" mask="date" />
          <Input
            name="repeat"
            label="Quantidades de Repetições"
            type="number"
            min={1}
            max={50}
          />
        </InputGroup>
        <InputGroup>
          <CreatableSelect
            label="Grupo da Conta"
            name="group"
            isClearable
            allowCreateWhileLoading={isLoadingGroup}
            isDisabled={isLoadingGroup}
            isLoading={isLoadingGroup}
            onCreateOption={handleCreateGroup}
            options={optionsGroup}
          />
          <InputDisabled label="Usuário" data={userAuth.name} />
        </InputGroup>
      </Form>
      <Button
        className="add-button"
        colorsText='#FFF'
        onClick={() => formRef.current?.submitForm()}
      >
        <BsCheck />
        {!isLoadingAddAccount ? 'Adicionar conta' : '...Cadastrando'}
      </Button>
    </Container>
  );
};

export default AccountFixed;
