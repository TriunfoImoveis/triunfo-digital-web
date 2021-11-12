import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import Modal from '..';
import Select from '../../ReactSelect';
import Input from '../../Input';
import { Container } from './styles';
import Button from '../../Button';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import {unMaked} from '../../../utils/unMasked';


interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}
interface IAddEntryAndExitsForm {
  tipo_despesa: string;
  descricao: string;
  valor: string;
  escritorio: string;
  conta: string;
}

const AddEntryAndExits: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const [escritorio, setEscritorio] = useState([]);
  const [contaBanco, setContaBanco] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEscritorio = useCallback(async () => {
    const response = await api.get('/escritorio');
    const options = response.data.map(item => (
      { label: item.nome, value: item.id }
    ));
    setEscritorio(options);
  }, []);

  const getContaBanco = useCallback(async () => {
    const response = await api.get('/conta');
    const options = response.data.map(item => (
      { label: item.nome_banco, value: item.id }
    ));
    setContaBanco(options);
  }, []);

  useEffect(() => {
    getEscritorio();
  }, [getEscritorio]);

  useEffect(() => {
    getContaBanco();
  }, [getContaBanco]);


  const createEntryOrExits = useCallback(async (data: IAddEntryAndExitsForm) => {
    const payload = {
      ...data,
      valor: Number(unMaked(data.valor)),
    };
    try {
      await api.post('/despesa',payload);
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
        tipo_despesa: Yup.string().required('Tipo de despesa obrigatório'),
        descricao: Yup.string().required('Descrição obrigatório'),
        valor: Yup.string().required('Valor é obrigatório'),
        escritorio: Yup.string().required('Sede obrigatória'),
        conta: Yup.string().required('Conta bancária obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      createEntryOrExits(data);
      setLoading(false);
      setIsOpen();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
      setLoading(false);
    }
  }, [setIsOpen, createEntryOrExits]);

  const optionsTipoDespesa = [{ label: 'ENTRADA', value: 'ENTRADA' }, { label: 'SAIDA', value: 'SAIDA' }];
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Adiconar Entrada / Saída</h3>
            <Select
              name="tipo_despesa"
              label="Tipo de Despesa"
              options={optionsTipoDespesa}
            />
            <Input name="descricao" label="Descrição" />
            <Input name="valor" label="Valor" mask="currency" />
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
        </Container>
    </Modal>
  );
};

export default AddEntryAndExits;
