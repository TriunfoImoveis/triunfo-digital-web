import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { CgSync } from 'react-icons/cg';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Modal from '..';
import Input from '../../Input';

import Button from '../../Button';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';

import {
  Container,
  Header,
  PaymentInstallments,
  Plot,
  AddButton,
} from './styles';

export interface IInstallments {
  due_date: string;
  id?: string;
  installment_number: number;
  valueFormatted: string;
  value: string;
  status?: 'PAGO' | 'PENDENTE' | 'VENCIDO' | 'LIQUIDADO';
  pay_date?: string;
}

interface IInstallmentsData {
  installments: {
    installment_number: string;
    value: string;
    due_date: string;
  }[];
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleEditInstallments: (installments: IInstallmentsData) => void;
  valueComission: string;
  installments: IInstallments[];
}

const EditInstallments: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  valueComission,
  handleEditInstallments,
  installments,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [newInstallements, setNewInstallments] = useState<IInstallments[]>([]);

  
  useEffect(() => {
    setNewInstallments(installments)
  }, [installments]);

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object({
          installments: Yup.array().of(
            Yup.object().shape({
              value: Yup.string().required('Informe o valor da parcela'),
              due_date: Yup.string().required('Informe a data de vencimento'),
            }),
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const installments = data.installments.map(installment => ({
          installment_number: installment.installment_number,
          value: unMaked(installment.value),
          due_date: DateYMD(installment.due_date),
        }));
        const newData = { installments };
        handleEditInstallments(newData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }
      }
    },
    [handleEditInstallments],
  );

  const addPlots = useCallback(() => {
    const listPlots = newInstallements.slice();
    const numberPlot = Number(
      formRef.current?.getFieldValue(
        `installments[${newInstallements.length - 1}].installment_number`,
      ),
    );

    listPlots.push({
      installment_number: numberPlot + 1,
      due_date: '',
      value: '',
      valueFormatted: ''
    });
    setNewInstallments(listPlots);
  }, [newInstallements]);
  const removePlots = useCallback(() => {
    const listPlots = newInstallements.slice();
    listPlots.pop();

    setNewInstallments(listPlots);
  }, [newInstallements]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Header>
            <h3>Detalhes das parcelas</h3>
            <p>
              Valor da Comissão:
              <strong>{valueComission}</strong>
            </p>
          </Header>
          <PaymentInstallments>
            {newInstallements.map((installment, index) => (
              <Plot key={installment.installment_number}>
                
                <AddButton type="button" onClick={addPlots}>
                   <FaPlus size={20} color="#C32925" />
                  </AddButton>
            
     
                <Input
                  type="number"
                  name={`installments[${index}].installment_number`}
                  label="Parcela"
                  min={1}
                  readOnly
                  defaultValue={installment.installment_number}
                />
                <Input
                  mask="currency"
                  name={`installments[${index}].value`}
                  label="Valor da Parcela"
                  placeholder="R$ 0,00"
                  defaultValue={installment.valueFormatted}
                />
                <Input
                  mask="date"
                  name={`installments[${index}].due_date`}
                  className="date"
                  label="Data de Vencimento"
                  placeholder="07/01/2021"
                  defaultValue={installment.due_date}
                />

                {installment.installment_number > 1 ? (
                  <AddButton type="button" onClick={removePlots}>
                  <FaMinus size={20} color="#C32925" />
                </AddButton>
                ):(
                  <AddButton type="button" disabled />
                )}
                
              </Plot>
            ))}
          </PaymentInstallments>
        </Form>
        <Button
          className="add-button"
          onClick={() => formRef.current?.submitForm()}
        >
          <CgSync />
          Atualizar
        </Button>
      </Container>
    </Modal>
  );
};

export default EditInstallments;
