import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import Modal from '..';
import Input from '../../Input';
import Select from '../../ReactSelect';

import { Container, InputGroup } from './styles';
import Button from '../../Button';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddAccount: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async data => {
      console.log(data);
      setIsOpen();
    },
    [setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Adiconar uma conta</h3>
          <InputGroup>
            <Select name="origem" label="Origem" defaultInputValue="São Luís" />
            <Input name="description" label="Descrição" />
          </InputGroup>
          <InputGroup>
            <Select
              name="type_account"
              label="Tipo de Conta"
              defaultInputValue="São Luís"
            />
            <Input name="value" label="Valor" mask="currency" />
          </InputGroup>
          <InputGroup>
            <Input name="intial_date" label="Data de Inicio" mask="date" />
            <Input name="finaly_date" label="Data de final" mask="date" />
          </InputGroup>
          <br />
          <br />
          <InputGroup>
            <Select
              name="account_bak"
              label="Conta Bancária"
              defaultInputValue="São Luís"
            />
          </InputGroup>
        </Form>
        <Button
          className="add-button"
          onClick={() => formRef.current?.submitForm()}
        >
          <BsCheckBox />
          Adicionar conta
        </Button>
      </Container>
    </Modal>
  );
};

export default AddAccount;
