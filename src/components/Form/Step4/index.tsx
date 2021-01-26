import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import { currency, DateYMD } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';
import api from '../../../services/api';

import Select from '../../Select';
import Button from '../../Button';
import CheckBox from '../../CheckBox';

import {
  Container,
  InputGroup,
  ButtonGroup,
  InputForm,
  BonusConatainer,
  Plot,
} from './styles';
import Input from '../../Input';
import { valiateDate } from '../../../utils/validateDate';

interface ISaleNewData {
  prevStep: () => void;
  nextStep: () => void;
  typeSale?: string;
}

interface IOptionsData {
  id: string;
  name: string;
  percentage?: number;
}

const Step4: React.FC<ISaleNewData> = ({ prevStep, nextStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<IOptionsData[]>([]);
  const [paymentTypes, setpaymentTypes] = useState<IOptionsData[]>([]);
  const [comissionValue, setcomissionValue] = useState('');
  const [isExistBonus, setisExistBonus] = useState(false);
  const { updateFormData } = useForm();

  useEffect(() => {
    const loadOrigins = async () => {
      const response = await api.get('/origin-sale');
      setOrigins(response.data);
    };
    loadOrigins();
  }, []);

  useEffect(() => {
    const loadPaymentType = async () => {
      if (typeSale === 'new') {
        const response = await api.get('/payment-type?type=NOVO');
        setpaymentTypes(response.data);
      } else if (typeSale === 'used') {
        const response = await api.get('/payment-type?type=USADO');
        setpaymentTypes(response.data);
      }
    };
    loadPaymentType();
  }, [typeSale]);

  const optionsOptions = origins.map(origin => ({
    label: origin.name,
    value: origin.id,
  }));

  const optionsBonus = [
    { id: '1', label: 'Sim', value: 'Y' },
    { id: '2', label: 'Não', value: 'N' },
  ];

  const optionsFormaPagamento = paymentTypes.map(pt => ({
    label: pt.name,
    value: pt.id,
  }));

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
      'sale_date',
      DateYMD(formRef.current?.getFieldValue('sale_date')),
    );
    formRef.current?.setFieldValue(
      'pay_date_signal',
      DateYMD(formRef.current?.getFieldValue('pay_date_signal')),
    );
    formRef.current?.setFieldValue(
      'percentage_sale',
      currency(formRef.current?.getFieldValue('percentage_sale')),
    );
    formRef.current?.setFieldValue(
      'commission',
      currency(formRef.current?.getFieldValue('commission')),
    );
    formRef.current?.setFieldValue(
      'installment.value',
      currency(formRef.current.getFieldValue('installment.value')),
    );
    formRef.current?.setFieldValue(
      'value_signal',
      currency(formRef.current.getFieldValue('value_signal')),
    );
    formRef.current?.setFieldValue(
      'installment.due_date',
      DateYMD(formRef.current.getFieldValue('installment.due_date')),
    );
  }, []);

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          realty_ammount: Yup.string().required('Valor da Venda Obrigatória'),
          sale_date: Yup.string()
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Data da Venda Obrigatória'),
          company: Yup.string(),
          payment_type: Yup.string().required('Forma de Pagamento Obrigatório'),
          percentage_sale: Yup.string().required(
            'Porcetagem Total da venda Obrigatória',
          ),
          origin: Yup.string().required('Origem da venda obrigatória'),
          value_signal: Yup.string().required('Valor do Ato Obrigatório'),
          pay_date_signal: Yup.string()
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Data do pagamento do Ato Obrigatório'),
          installment: Yup.object()
            .shape({
              due_date: Yup.string()
                .test('validateDate', 'Data Invalida', function valid(value) {
                  const { path, createError } = this;
                  const isValid = valiateDate(value);
                  return (
                    isValid || createError({ path, message: 'Data Invalida' })
                  );
                })
                .required('Data de Vencimento Obrigatório'),
              value: Yup.string().required('Valor Obrigatório'),
            })
            .required(),
          bonus: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        unMaskValue();
        const newdata = formRef.current?.getData();
        updateFormData(newdata || {});
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
    },
    [unMaskValue, nextStep, updateFormData],
  );

  const handleValue = useCallback((value: string) => {
    switch (value) {
      case 'Y':
        setisExistBonus(true);
        break;
      case 'N':
        setisExistBonus(false);
        break;
      case '':
        setisExistBonus(false);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <InputForm
            label="Valor da Venda"
            name="realty_ammount"
            mask="currency"
            placeholder="R$ 1.000.000,00"
          />
          <InputForm
            mask="date"
            label="Data da Venda"
            name="sale_date"
            placeholder="DD/MM/AAAA"
          />
        </InputGroup>
        <Plot>
          <Input
            mask="currency"
            name="value_signal"
            label="Ato"
            placeholder="R$ 0,00"
          />
          <Input
            mask="date"
            name="pay_date_signal"
            label="Data de Pagamento do Ato"
            placeholder="07/01/2021"
          />
        </Plot>
        <InputGroup>
          <InputForm
            label="% da Venda"
            name="percentage_sale"
            placeholder="4,3%"
            onChange={calcComission}
          />
          <InputForm
            label="Comissão"
            name="commission"
            mask="currency"
            placeholder="R$ 50.000,00"
            value={comissionValue}
            readOnly
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="payment_type"
            options={optionsFormaPagamento}
            nameLabel="Forma de pagamento da Comissão"
          />
        </InputGroup>
        <Plot>
          <Input
            type="number"
            name="installment.installment_number"
            label="Parcela"
            min={1}
            readOnly
            defaultValue={1}
          />
          <Input
            mask="currency"
            name="installment.value"
            label="Valor"
            placeholder="R$ 0,00"
          />
          <Input
            mask="date"
            name="installment.due_date"
            label="Data de Vencimento"
            placeholder="07/01/2021"
          />
        </Plot>

        <Select name="origin" options={optionsOptions} nameLabel="Origem" />
        <BonusConatainer>
          <span>Bonus da Venda ?</span>
          <CheckBox options={optionsBonus} handleValue={handleValue} />
        </BonusConatainer>
        {isExistBonus && (
          <InputForm
            label="Bônus"
            name="bonus"
            mask="currency"
            placeholder="Bônus"
          />
        )}
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
