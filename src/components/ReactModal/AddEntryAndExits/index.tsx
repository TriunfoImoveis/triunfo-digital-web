import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import Modal from '..';
import Select from '../../ReactSelect';
import Input from '../../Input';
import { Container } from './styles';
import Button from '../../Button';
import api from '../../../services/api';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddEntryAndExits: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const [escritorio, setEscritorio] = useState([]);
  const [contaBanco, setContaBanco] = useState([]);

  const getEscritorio = useCallback(async () => {
    const response = await api.get('/escritorio');
    const options = response.data.map(item => (
      {label: item.nome, value: item.id}
    ));
    setEscritorio(options);
  }, []);

  const getContaBanco = useCallback(async () => {
    const response = await api.get('/conta');
    const options = response.data.map(item => (
      {label: item.nome_banco, value: item.id}
    ));
    setContaBanco(options);
  }, []);

  useEffect(() => {
    getEscritorio();
  }, [getEscritorio]);

  useEffect(() => {
    getContaBanco();
  }, [getContaBanco]);

  const handleSubmit = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);
  const optionsTipoDespesa = [{label: 'ENTRADA', value: 'ENTRADA'},{label: 'SAIDA', value: 'SAIDA'}];
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
            Adicionar conta
          </Button>
        </Container>
      </Form>
    </Modal>
  );
};

export default AddEntryAndExits;
