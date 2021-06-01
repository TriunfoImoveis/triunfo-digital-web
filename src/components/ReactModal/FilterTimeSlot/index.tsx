import React from 'react';
import { Form } from '@unform/web';
import Modal from '..';

import { ContainerWrapper, Container } from './styles';
import Input from '../../Input';
import Button from '../../Button';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleSetTimeSlot: (date_initial: string, date_final: string) => void;
}

const TimeSlotFilter: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleSetTimeSlot,
}) => {
  const handleSubmit = ({ date_initial, date_final }) => {
    handleSetTimeSlot(date_initial, date_final);
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Escolha o intervalo de tempo desejado</h3>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Input name="date_initial" mask="date" type="date" />
            <Input name="date_final" mask="date" type="date" />
            <Button type="submit">Filtrar</Button>
          </Form>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default TimeSlotFilter;
