import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import Modal from '..';
import Input from '../../Input';

import { Container, InputGroup } from './styles';
import Button from '../../Button';
import { formatPrice } from '../../../utils/format';

type BankBalance = {
  id: string;
  bank: string;
  name: string;
  number: string;
  sald: number;
};
interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  bankBalance: BankBalance[];
}

const AddOrEditAccountBank: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  bankBalance,
}) => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async data => {
      setIsOpen();
    },
    [setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Adicionar/Atualizar Saldo</h3>
          {bankBalance.map((banks, index) => (
            <div key={banks.id}>
              <span>
                Conta:
                {index + 1}
              </span>
              <InputGroup>
                <Input name="bank" label="Banco" defaultValue={banks.bank} />
                <Input
                  name="number"
                  label="Número da Conta"
                  defaultValue={banks.number}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  mask="currency"
                  name="sald"
                  label="Saldo da Conta"
                  defaultValue={formatPrice(banks.sald)}
                />
                <Input
                  name="name"
                  label="Apelido da Conta"
                  defaultValue={banks.name}
                />
              </InputGroup>
            </div>
          ))}
        </Form>
        <Button
          className="add-button"
          onClick={() => formRef.current?.submitForm()}
        >
          <BsCheck />
          Atualizar
        </Button>
      </Container>
    </Modal>
  );
};

export default AddOrEditAccountBank;
