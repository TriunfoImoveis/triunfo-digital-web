import React, { useRef } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Modal from '..';
import api from '../../../services/api';
import Button from '../../Button';
import Select from '../../ReactSelect';

import { Container, ContainerWrapper, ButtonGroup } from './styles';
import { useAuth } from '../../../context/AuthContext';
import getValidationErros from '../../../utils/getValidationErros';
import { useCalculator } from '../../../context/CalculatorContext';
import Input from '../../Input';
import { DateYMD } from '../../../utils/unMasked';

interface Participantes {
  user?: string;
  participant_type: string;
  comission_percentage: string;
  comission_integral: string;
  tax_percentage?: number;
  tax_value?: string;
  comission_liquid: string;
}

interface Division {
  division_type: string;
  percentage: string;
  value: string;
}
interface CalculatorData {
  installment: string;
  note_value?: string;
  note_number?: string;
  tax_iss_nf?: number;
  value_iss?: string;
  tax_rate_nf?: string;
  balance: string;
  divisions: Division[];
  participants: Participantes[];
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  calcData: CalculatorData;
}

interface FormData {
  pay_date: string;
  bank_data: string;
}

const ValidCalculation: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  calcData,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { userAuth } = useAuth();
  const { initialValue } = useCalculator();
  const history = useHistory();
  const bankOptions = userAuth.bank_data.map(item => ({
    label: `${item.account} - ${item.bank_name}`,
    value: item.id,
  }));
  const handlePayPlot: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object({
        pay_date: Yup.string().required('Data de Pagamento obrigatória'),
        bank_data: Yup.string().required('Conta de Entrada obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const formData = {
        ...calcData,
        pay_date: DateYMD(data.pay_date),
        bank_data: data.bank_data,
      };
      await api.post('/calculator', formData);
      toast.success('Parcela Paga e calaculada com sucesso !');
      history.push('/financeiro/caixa');
      setIsOpen();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
        toast.error('ERROR!, verifique as informações e tente novamente');
      }

      toast.error('Deu algo errado, contate o suporte');
    } finally {
      initialValue();
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Salavar o Cálculo</h3>
        <Container>
          <strong>ATENÇÃO!!</strong>
          <p>
            Antes de dar a baixa na parcela nos informe a conta de entrada !
          </p>
          <Form ref={formRef} onSubmit={handlePayPlot}>
            <Input
              name="pay_date"
              label="Data de pagamento da comissão"
              mask="date"
            />
            <Select
              name="bank_data"
              label="Conta de entrada"
              options={bankOptions}
            />
          </Form>
          <ButtonGroup>
            <Button
              color="#40B236"
              colorsText='#FFF'
              onClick={() => formRef.current?.submitForm()}
            >
              Sim
            </Button>
            <Button onClick={setIsOpen}  colorsText='#FFF'>Não</Button>
          </ButtonGroup>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default ValidCalculation;
