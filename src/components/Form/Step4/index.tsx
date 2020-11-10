import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import { currency } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';

interface ISaleNewData {
  prevStep: () => void;
  nextStep: () => void;
}

const Step4: React.FC<ISaleNewData> = ({ prevStep, nextStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [comissionValue, setcomissionValue] = useState('');
  const { updateFormData } = useForm();

  const optionsEmpresa = [
    { label: 'DC Reis - 18%', value: 'DC Reis' },
    { label: 'Francistelmo - 10%', value: 'Francistelmo' },
    { label: 'Raunin - 22%', value: 'Raunin' },
  ];

  const optionsFormaPagamento = [
    { label: 'Paga integral e pede NF', value: 'Paga integral e pede NF' },
  ];

  const calcComission = useCallback(() => {
    const valueSale = formRef.current?.getFieldValue('realty_ammount');
    const portcent = formRef.current?.getFieldValue('percentage_sale');
    const comission = currency(valueSale) * (currency(portcent) / 100);
    setcomissionValue(money(comission));
  }, []);

  const unMaskValue = useCallback(() => {
    formRef.current?.setFieldValue(
      'realty_ammount',
      currency(formRef.current?.getFieldValue('realty_ammount')),
    );
    formRef.current?.setFieldValue(
      'percentage_sale',
      currency(formRef.current?.getFieldValue('percentage_sale')),
    );
    formRef.current?.setFieldValue(
      'commission',
      currency(formRef.current?.getFieldValue('commission')),
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMaskValue();
    const data = formRef.current?.getData();

    try {
      setLoading(true);
      const schema = Yup.object().shape({
        realty_ammount: Yup.string().required('Valor da Venda Obrigatória'),
        percentage_company: Yup.string().required(
          'Taxa de imposto Obrigatório',
        ),
        payment_type: Yup.string().required('Forma de Pagamento Obrigatório'),
        percentage_sale: Yup.string().required(
          'Porcetagem Total da venda Obrigatória',
        ),
        commission: Yup.string().required('Comissão Obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      updateFormData(data || {});
      nextStep();
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
      setLoading(false);
    }
  }, [unMaskValue, updateFormData, nextStep]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <InputForm
            name="realty_ammount"
            mask="currency"
            placeholder="Valor da venda"
          />
          <InputForm type="date" name="sale_date" placeholder="Data da Venda" />
        </InputGroup>
        <InputGroup>
          <Select
            name="percentage_company"
            options={optionsEmpresa}
            icon={IoMdArrowDropdown}
            nameLabel="a empresa (% porcentagem)"
          />
          <Select
            name="payment_type"
            icon={IoMdArrowDropdown}
            options={optionsFormaPagamento}
            nameLabel="a forma de pagamento"
          />
        </InputGroup>
        <InputGroup>
          <InputForm
            name="percentage_sale"
            mask="porcent"
            placeholder="Porcentagem Total da Venda"
            onChange={calcComission}
          />
          <InputForm
            name="commission"
            mask="currency"
            placeholder="Comissão"
            value={comissionValue}
          />
        </InputGroup>

        <ButtonGroup>
          <Button type="button" className="cancel" onClick={() => prevStep()}>
            Voltar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Concluir cadastro'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step4;
