import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import { currency, DateYMD } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';

import api from '../../../services/api';

import Select from '../../ReactSelect';
import Button from '../../Button';
import CheckBox from '../../CheckBox';

import {
  Container,
  InputGroup,
  ButtonGroup,
  InputForm,
  BonusConatainer,
  Plot,
  AddButton,
  PaymentInstallments,
} from './styles';
import Input from '../../Input';
import { valiateDate } from '../../../utils/validateDate';
import TextArea from '../../TextArea';

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

interface IInstallments {
  due_date: string;
  id?: string;
  installment_number: number;
  value: string;
  status?: 'PAGO' | 'PENDENTE';
  pay_date?: string;
}

const Step4: React.FC<ISaleNewData> = ({ prevStep, nextStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<IOptionsData[]>([]);
  const [paymentTypes, setpaymentTypes] = useState<IOptionsData[]>([]);
  const [comissionValue, setcomissionValue] = useState('');
  const [isExistBonus, setisExistBonus] = useState(false);
  const [installments, setInstallments] = useState<IInstallments[]>([
    { installment_number: 1, value: '', due_date: '' },
  ]);
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

  const unMaskedPlotsValues = (installments: IInstallments[]) => {
    const unMaskedInstallments = installments.map(installment => ({
      installment_number: installment.installment_number,
      due_date: DateYMD(installment.due_date),
      value: String(currency(installment.value)),
    }));
    return unMaskedInstallments;
  };
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
      'value_signal',
      currency(formRef.current.getFieldValue('value_signal')),
    );

    if (formRef.current?.getFieldValue('bonus')) {
      formRef.current?.setFieldValue(
        'bonus',
        currency(formRef.current.getFieldValue('bonus')),
      );
    }
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
          installments: Yup.array().of(
            Yup.object().shape({
              value: Yup.string().required('Valor da parcela obrigatória'),
              due_date: Yup.string()
                .test('validateDate', 'Data Invalida', function valid(value) {
                  const { path, createError } = this;
                  const isValid = valiateDate(value);
                  return (
                    isValid || createError({ path, message: 'Data Invalida' })
                  );
                })
                .required('Data do pagamento da parcela obrigatória'),
            }),
          ),
          bonus: Yup.string(),
          observation: Yup.string().required(
            'Informe uma obrservação, se não houver digite nenhuma observação',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const installments = unMaskedPlotsValues(data.installments);
        unMaskValue();
        const newdata = formRef.current?.getData();
        const financesData = { ...newdata, installments };
        updateFormData(financesData || {});
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

  const addPlots = useCallback(() => {
    const listPlots = installments.slice();
    const numberPlot = Number(
      formRef.current?.getFieldValue(
        `installments[${installments.length - 1}].installment_number`,
      ),
    );

    listPlots.push({
      installment_number: numberPlot + 1,
      due_date: '',
      value: '',
    });
    setInstallments(listPlots);
  }, [installments]);
  const removePlots = useCallback(() => {
    const listPlots = installments.slice();
    listPlots.pop();

    setInstallments(listPlots);
  }, [installments]);

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
            label="Forma de pagamento dos honorários"
            placeholder="Selecione a forma de pagamento dos honorários"
          />
        </InputGroup>
        {installments.length !== 0 ? (
          <PaymentInstallments>
            {installments.map((installment, index) =>
              index === 0 ? (
                <Plot key={installment.installment_number}>
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
                    defaultValue={installment.value}
                  />
                  <Input
                    mask="date"
                    name={`installments[${index}].due_date`}
                    label="Data de Vencimento"
                    placeholder="07/01/2021"
                    defaultValue={installment.due_date}
                  />

                  <AddButton type="button" onClick={addPlots}>
                    <FaPlus size={20} color="#FFF" />
                  </AddButton>
                </Plot>
              ) : (
                <Plot key={installment.installment_number}>
                  <Input
                    type="number"
                    name={`installments[${index}].installment_number`}
                    label="Parcela"
                    min={1}
                    readOnly
                    defaultValue={index + 1}
                  />
                  <Input
                    mask="currency"
                    name={`installments[${index}].value`}
                    label="Valor da Parcela"
                    placeholder="R$ 0,00"
                    defaultValue={installment.value}
                  />
                  <Input
                    mask="date"
                    name={`installments[${index}].due_date`}
                    label="Data de Vencimento"
                    placeholder="07/01/2021"
                    defaultValue={installment.due_date}
                  />

                  <AddButton type="button" onClick={removePlots}>
                    <FaMinus size={20} color="#FFF" />
                  </AddButton>
                </Plot>
              ),
            )}
          </PaymentInstallments>
        ) : null}
        <span className="help">
          Caso o pagamento for integral, coloque no campo parcela, o mesmo valor
          do comissionamento!
        </span>

        <Select
          name="origin"
          options={optionsOptions}
          label="Origem"
          placeholder="Selecione a origem"
        />
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
        <TextArea
          name="observation"
          label="Observação"
          placeholder="Coloque infomações extras sobre a venda!"
        />
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
