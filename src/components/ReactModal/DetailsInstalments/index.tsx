import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Modal from '..';
import Input from '../../InputDisabled';

import { Container, InputGroup } from './styles';
import Button from '../../Button';
import { Installment } from '../../../api/get-installments';
import { format, parseISO } from 'date-fns';

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
  const description = `${installment?.installment_number}° Parcela, ${installment?.sale?.realty?.enterprise}`;
  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(installment?.value));
  const realtors = installment?.sale?.sale_has_sellers.map(item => item?.name).toString()

  const payDate = installment?.pay_date ? format(parseISO(installment?.pay_date), 'dd/MM/yyyy') : '';
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <div>
          <h3>Detalhes</h3>
          <Input label="Descrição" data={description} />
          <InputGroup>
            <Input label="Filial" data={installment?.sale?.subsidiary?.name} />
            <Input label="Tipo da Venda" data={installment?.sale?.sale_type} />
          </InputGroup>
          <InputGroup>
            <Input label="Data de Pagamento" data={payDate} />
            <Input label="Status" data={installment?.status} />
          </InputGroup>
          <Input label="Valor Bruto" data={value} />
          <Input label="Coretor(es)" data={realtors} />
        </div>
        <Button className="add-button">
          <Link to={`/financeiro/calculadora/${installment?.id}`}>
            <BsCheck />
            Calcular
          </Link>
        </Button>
      </Container>
    </Modal>
  );
};

export default DetailsInstalments;
