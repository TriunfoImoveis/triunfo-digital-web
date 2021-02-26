import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import Modal from '..';
import Select from '../../ReactSelect';
import Input from '../../Input';
import { Container, InputGroup } from './styles';
import Button from '../../Button';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddEntryCredit: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Adiconar nova entrada</h3>
            <InputGroup>
              <Select
                name="origem"
                label="Origem"
                options={[
                  { label: 'São Luís', value: 'São Luís' },
                  { label: 'Fortaleza', value: 'Fortaleza' },
                  { label: 'Teresia', value: 'Teresia' },
                ]}
                defaultInputValue="São Luís"
              />
              <Input name="description" label="Descrição" />
            </InputGroup>
            <InputGroup>
              <Select
                name="type_entry"
                label="Tipo de Entrada"
                defaultInputValue="Vendas"
              />
              <Input name="value" label="Valor bruto" mask="currency" />
            </InputGroup>
            <InputGroup>
              <Input name="client" label="Nome do Cliente" />
              <Input name="date_sale" label="Data do pagamento" />
            </InputGroup>
            <InputGroup>
              <Input name="impost" label="Taxa de imposto" />
              <Input name="value_note" label="Valor da Nota" mask="currency" />
            </InputGroup>
            <InputGroup>
              <Select
                name="Account"
                label="Conta bancária"
                defaultInputValue="Banco do Brasil"
              />
              <Input name="liquid" label="Valor Líquido" mask="currency" />
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
      </Form>
    </Modal>
  );
};

export default AddEntryCredit;
