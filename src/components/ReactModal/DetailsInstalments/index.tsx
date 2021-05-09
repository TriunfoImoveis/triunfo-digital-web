import React from 'react';
import { BsCheckBox } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Modal from '..';
import Input from '../../InputDisabled';

import { Container, InputGroup } from './styles';
import Button from '../../Button';

type Installment = {
  id: string;
  due_date: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  realtors: string;
  sale_type: string;
};
interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  installment: Installment;
}

const DetailsInstalments: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  installment,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <div>
          <h3>Detalhes</h3>
          <Input label="Descrição" data={installment.description} />
          <InputGroup>
            <Input label="Filial" data={installment.city} />
            <Input label="Tipo da Venda" data={installment.sale_type} />
          </InputGroup>
          <InputGroup>
            <Input label="Vencimento" data={installment.due_date} />
            <Input label="Status" data={installment.status} />
          </InputGroup>
          <Input label="Valor Bruto" data={installment.valueBRL} />
          <Input label="Coretor(es)" data={installment.realtors} />
        </div>
        <Button className="add-button">
          <Link to={`/financeiro/calculadora/${installment.id}`}>
            <BsCheckBox />
            Calcular
          </Link>
        </Button>
      </Container>
    </Modal>
  );
};

export default DetailsInstalments;
