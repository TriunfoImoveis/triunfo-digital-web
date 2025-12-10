import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import { currency, DateYMD } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';

import api from '../../../services/api';

import Select from '../../FormControls/SelectControlled';
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
import Input from '../../FormControls/InputControlled';
import { valiateDate } from '../../../utils/validateDate';
import TextArea from '../../FormControls/TextAreaControlled';

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

const schema = Yup.object().shape({
  realty_ammount: Yup.string().required('Valor da Venda Obrigatória'),
  sale_date: Yup.string()
    .test('validateDate', 'Data Invalida', value => valiateDate(value || ''))
    .required('Data da Venda Obrigatória'),
  company: Yup.string(),
  payment_type: Yup.string().required('Forma de Pagamento Obrigatório'),
  percentage_sale: Yup.string().required(
    'Porcentagem Total da venda Obrigatória',
  ),
  commission: Yup.string().required('Comissão obrigatória'),
  origin: Yup.string().required('Origem da venda obrigatória'),
  value_signal: Yup.string().required('Valor do Ato Obrigatório'),
  pay_date_signal: Yup.string()
    .test('validateDate', 'Data Invalida', value => valiateDate(value || ''))
    .required('Data do pagamento do Ato Obrigatório'),
  installments: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Valor da parcela obrigatória'),
      due_date: Yup.string()
        .test('validateDate', 'Data Invalida', value =>
          valiateDate(value || ''),
        )
        .required('Data do pagamento da parcela obrigatória'),
    }),
  ),
  bonus: Yup.string(),
  observation: Yup.string().required(
    'Informe uma observação, se não houver digite nenhuma observação',
  ),
});

const Step4: React.FC<ISaleNewData> = ({ prevStep, nextStep, typeSale }) => {
  const { updateFormData, formData } = useForm();
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<IOptionsData[]>([]);
  const [paymentTypes, setpaymentTypes] = useState<IOptionsData[]>([]);
  const [comissionValue, setcomissionValue] = useState(
    formData.commission ? money(formData.commission) : '',
  );
  const [isExistBonus, setisExistBonus] = useState(Boolean(formData.bonus));
  const [installments, setInstallments] = useState<IInstallments[]>(
    formData.installments?.length
      ? formData.installments
      : [{ installment_number: 1, value: '', due_date: '' }],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState(() => ({
    realty_ammount: String(formData.realty_ammount || ''),
    sale_date: String(formData.sale_date || ''),
    payment_type: String(formData.payment_type || ''),
    percentage_sale: String(formData.percentage_sale || ''),
    commission: String(formData.commission || ''),
    value_signal: String(formData.value_signal || ''),
    pay_date_signal: String(formData.pay_date_signal || ''),
    origin: String(formData.origin || ''),
    bonus: String(formData.bonus || ''),
    observation: String(formData.observation || ''),
  }));

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

  const calcComission = useCallback(
    (value?: string) => {
      const saleValue = String(value ?? form.realty_ammount ?? '');
      const percent = String(form.percentage_sale ?? '');
      if (!saleValue || !percent) {
        setcomissionValue('');
        setForm(prev => ({ ...prev, commission: '' }));
        return;
      }
      const comission =
        currency(saleValue) * (Number(percent.replace(',', '.')) / 100);
      const formatted = money(comission);
      setcomissionValue(formatted);
      setForm(prev => ({ ...prev, commission: formatted }));
    },
    [form.percentage_sale, form.realty_ammount],
  );

  useEffect(() => {
    if (form.realty_ammount && form.percentage_sale) {
      calcComission();
    }
  }, [calcComission, form.percentage_sale, form.realty_ammount]);

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

  const handleChange = (field: string) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'realty_ammount' || field === 'percentage_sale') {
      calcComission(field === 'realty_ammount' ? value : undefined);
    }
  };

  const addPlots = useCallback(() => {
    const listPlots = installments.slice();
    const numberPlot = Number(
      listPlots[listPlots.length - 1]?.installment_number || listPlots.length,
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
    if (listPlots.length > 1) {
      listPlots.pop();
      setInstallments(listPlots);
    }
  }, [installments]);

  const handleInstallmentChange =
    (index: number, field: keyof IInstallments) => (value: string) => {
      const list = installments.slice();
      list[index] = { ...list[index], [field]: value };
      setInstallments(list);
    };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrors({});
      try {
        setLoading(true);
        await schema.validate(
          { ...form, installments },
          {
            abortEarly: false,
          },
        );
        const installmentsFormatted = installments.map(installment => ({
          installment_number: installment.installment_number,
          due_date: DateYMD(installment.due_date),
          value: String(currency(installment.value)),
        }));

        const financesData = {
          ...form,
          realty_ammount: currency(form.realty_ammount),
          sale_date: DateYMD(form.sale_date),
          pay_date_signal: DateYMD(form.pay_date_signal),
          percentage_sale: Number(
            String(form.percentage_sale).replace(',', '.'),
          ),
          commission: currency(comissionValue || form.commission),
          value_signal: currency(form.value_signal),
          bonus: isExistBonus ? currency(form.bonus) : undefined,
          installments: installmentsFormatted,
        };
        updateFormData(financesData || {});
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          setErrors(erros);
        }

        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [
      comissionValue,
      form,
      installments,
      isExistBonus,
      nextStep,
      updateFormData,
    ],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputForm
            label="Valor da Venda"
            name="realty_ammount"
            mask="currency"
            placeholder="R$ 1.000.000,00"
            value={form.realty_ammount}
            onChange={handleChange('realty_ammount')}
            error={errors.realty_ammount}
          />
          <InputForm
            mask="date"
            label="Data da Venda"
            name="sale_date"
            placeholder="DD/MM/AAAA"
            value={form.sale_date}
            onChange={handleChange('sale_date')}
            error={errors.sale_date}
          />
        </InputGroup>
        <Plot>
          <Input
            mask="currency"
            name="value_signal"
            label="Ato"
            placeholder="R$ 0,00"
            value={form.value_signal}
            onChange={handleChange('value_signal')}
            error={errors.value_signal}
          />
          <Input
            mask="date"
            name="pay_date_signal"
            label="Data de Pagamento do Ato"
            placeholder="07/01/2021"
            value={form.pay_date_signal}
            onChange={handleChange('pay_date_signal')}
            error={errors.pay_date_signal}
          />
        </Plot>
        <InputGroup>
          <InputForm
            label="% da Venda"
            name="percentage_sale"
            placeholder="4,3%"
            value={form.percentage_sale}
            onChange={handleChange('percentage_sale')}
            error={errors.percentage_sale}
          />
          <InputForm
            label="Comissão"
            name="commission"
            mask="currency"
            placeholder="R$ 50.000,00"
            value={comissionValue}
            readOnly
            error={errors.commission}
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="payment_type"
            options={optionsFormaPagamento}
            label="Forma de pagamento dos honorários"
            placeholder="Selecione a forma de pagamento dos honorários"
            value={optionsFormaPagamento.find(
              opt => opt.value === form.payment_type,
            )}
            onChange={option =>
              handleChange('payment_type')((option as any)?.value || '')
            }
            error={errors.payment_type}
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
                    value={String(installment.installment_number)}
                    onChange={() => {}}
                  />
                  <Input
                    mask="currency"
                    name={`installments[${index}].value`}
                    label="Valor da Parcela"
                    placeholder="R$ 0,00"
                    value={installment.value}
                    onChange={handleInstallmentChange(index, 'value')}
                    error={errors[`installments[${index}].value`]}
                  />
                  <Input
                    mask="date"
                    name={`installments[${index}].due_date`}
                    label="Data de Vencimento"
                    placeholder="07/01/2021"
                    value={installment.due_date}
                    onChange={handleInstallmentChange(index, 'due_date')}
                    error={errors[`installments[${index}].due_date`]}
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
                    value={String(index + 1)}
                    onChange={() => {}}
                  />
                  <Input
                    mask="currency"
                    name={`installments[${index}].value`}
                    label="Valor da Parcela"
                    placeholder="R$ 0,00"
                    value={installment.value}
                    onChange={handleInstallmentChange(index, 'value')}
                    error={errors[`installments[${index}].value`]}
                  />
                  <Input
                    mask="date"
                    name={`installments[${index}].due_date`}
                    label="Data de Vencimento"
                    placeholder="07/01/2021"
                    value={installment.due_date}
                    onChange={handleInstallmentChange(index, 'due_date')}
                    error={errors[`installments[${index}].due_date`]}
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
          label="Canal"
          placeholder="Selecione o canal de onde veio a venda"
          value={optionsOptions.find(opt => opt.value === form.origin)}
          onChange={option =>
            handleChange('origin')((option as any)?.value || '')
          }
          error={errors.origin}
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
            value={form.bonus}
            onChange={handleChange('bonus')}
            error={errors.bonus}
          />
        )}
        <TextArea
          name="observation"
          label="Observação"
          placeholder="Coloque informações extras sobre a venda!"
          value={form.observation}
          onChange={value => handleChange('observation')(value)}
          error={errors.observation}
        />
        <ButtonGroup>
          <Button type="button" className="cancel" onClick={() => prevStep()}>
            Voltar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Concluir cadastro'}
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default Step4;
