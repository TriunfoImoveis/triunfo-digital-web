import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import Modal from '..';
import Select from '../../ReactSelect';
import CreatableSelect from '../../ReactSelect/Creatable';
import Input from '../../Input';
import { Container } from './styles';
import Button from '../../Button';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import { unMaked, DateYMD } from '../../../utils/unMasked';
import { useAuth } from '../../../context/AuthContext';


interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

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

const AddEntryAndExits: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
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



  const createEntryOrExits = useCallback(async (data: IAddEntryAndExitsForm) => {
    const payload = {
      ...data,
      tipo_despesa: "ENTRADA",
      valor: Number(unMaked(data.valor)),
      data_pagamento: DateYMD(data.data_pagamento)
    };
    try {
      await api.post('/despesa', payload);
      toast.success(`Cadastro de ${data.tipo_despesa} realiza com sucesso!`);
    } catch (err) {
      toast.error(`${err}`);
    }
  }, []);

  const handleSubmit = useCallback(async (data: IAddEntryAndExitsForm) => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        descricao: Yup.string().required('Descrição obrigatório'),
        valor: Yup.string().required('Valor é obrigatório'),
        escritorio: Yup.string().required('Sede obrigatória'),
        conta: Yup.string().required('Conta bancária obrigatória'),
        grupo: Yup.string().required('Grupo obrigatória'),
        data_pagamento: Yup.string().required('data de obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await createEntryOrExits(data);
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
  }, [createEntryOrExits]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Adicionar Entrada / Saída</h3>
          <Input name="descricao" label="Descrição" />
          <Input name="data_pagamento" label="Data" mask="date" />
          <Input name="valor" label="Valor" mask="currency" />
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
          <BsCheck />
          {loading ? 'Cadastrando....' : 'Adicionar entradas/saídas'}
        </Button>
      </Container>
    </Modal>
  );
};

export default AddEntryAndExits;
