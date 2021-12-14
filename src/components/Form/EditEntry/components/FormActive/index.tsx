import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import CreatableSelect from '../../../../ReactSelect/Creatable';
import Input from '../../../../Input';
import Select from '../../../../ReactSelect';
import Button from '../../../../Button';
import api from '../../../../../services/api';
import { useAuth } from '../../../../../context/AuthContext';
import getValidationErros from '../../../../../utils/getValidationErros';

interface Options {
  label: string;
  value: string;
}

interface IAddEntryAndExitsForm {
  tipo_despesa: string;
  data_pagamento: string;
  descricao: string;
  grupo: string;
  valor: string;
  escritorio: string;
  conta: string;
}

type Entry = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

type FormActiveProps = {
  entry: Entry;
}

const FormActive: React.FC<FormActiveProps> = ({ entry }) => {
  const {id} = entry; 
  const formRef = useRef<FormHandles>(null);
  const { userAuth } = useAuth();
  const [escritorio, setEscritorio] = useState([]);
  const [contaBanco, setContaBanco] = useState<Options[]>([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);


  const getGroups = useCallback(async () => {
    const response = await api.get('/expense/groups');
    const options = response.data.map(item => ({
      label: item.name, value: item.id
    }))
    setGroups(options);
  }, []);
  const getEscritorio = useCallback(async () => {
    const response = await api.get('/subsidiary');
    const options = response.data.map(item => (
      { label: item.name, value: item.id }
    ));
    setEscritorio(options);
  }, []);

  const getContaBanco = useCallback(() => {
    const options = userAuth.bank_data.map(item => (
      { label: `${item.bank_name} - ${item.account}`, value: item.id }
    ));
    setContaBanco(options);
  }, [userAuth.bank_data]);

  useEffect(() => {
    getEscritorio();
  }, [getEscritorio]);

  useEffect(() => {
    getContaBanco();
  }, [getContaBanco]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

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
    setGroups(options);
  };

  const update = useCallback(async (data: IAddEntryAndExitsForm) => {
    const payload = {
      ...data,
    };
    try {
      await api.put(`/despesa/${id}`, payload);
      toast.success(`Atualização realizada com sucesso!`);
    } catch (err) {
      toast.error(`${err}`);
    }
  }, [id]);

  const handleSubmit = useCallback(async (data: IAddEntryAndExitsForm) => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        descricao: Yup.string(),
        valor: Yup.string(),
        escritorio: Yup.string(),
        conta: Yup.string(),
        grupo: Yup.string(),
        data_pagamento: Yup.string()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await update(data);
      setLoading(false);
      document.location.reload();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
      setLoading(false);
    }
  }, [update]);
  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="descricao" label="Descrição" defaultValue={entry.descricao} />
        <Input name="data_pagamento" label="Data" mask="date" defaultValue={entry.data} />
        <Input name="valor" label="Valor" mask="currency" defaultValue={entry.valor} />
        <CreatableSelect
          label="Grupo"
          name="grupo"
          isClearable
          allowCreateWhileLoading={isLoadingGroup}
          isDisabled={isLoadingGroup}
          isLoading={isLoadingGroup}
          onCreateOption={handleCreateGroup}
          options={groups}
        />
        <Select
          name="escritorio"
          label="Sede"
          options={escritorio}
        />
        <Select
          name="conta"
          label="Conta bancaria"
          options={contaBanco}
        />
      </Form>
      <Button
        className="add-button"
        onClick={() => formRef.current?.submitForm()}
      >
        <BsCheckBox />
        {loading ? 'Cadastrando....' : 'Adicionar entradas/saídas'}
      </Button>
    </>
  );
}

export default FormActive;