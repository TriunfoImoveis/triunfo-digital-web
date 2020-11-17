import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import { currency } from '../../../utils/unMasked';
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
} from './styles';

interface ISaleNewData {
  prevStep: () => void;
  nextStep: () => void;
}

interface IOptionsData {
  id: string;
  name: string;
}

const Step4: React.FC<ISaleNewData> = ({ prevStep, nextStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<IOptionsData[]>([]);
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

  const optionsOptions = origins.map(origin => ({
    label: origin.name,
    value: origin.id,
  }));

  const optionsEmpresa = [
    { label: 'DC Reis - 18%', value: 'DC Reis' },
    { label: 'Francistelmo - 10%', value: 'Francistelmo' },
    { label: 'Raunin - 22%', value: 'Raunin' },
  ];

  const optionsBonus = [
    { id: '1', label: 'Sim', value: 'Y' },
    { id: '2', label: 'Não', value: 'N' },
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

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          realty_ammount: Yup.string().required('Valor da Venda Obrigatória'),
          sale_date: Yup.string().required('Data da Venda Obrigatória'),
          percentage_company: Yup.string().required(
            'Taxa de imposto Obrigatório',
          ),
          payment_type: Yup.string().required('Forma de Pagamento Obrigatório'),
          percentage_sale: Yup.string().required(
            'Porcetagem Total da venda Obrigatória',
          ),
          commission: Yup.string().required('Comissão Obrigatória'),
          origin: Yup.string().required('Origem da venda obrigatória'),
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
    [unMaskValue, updateFormData, nextStep],
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
        <Select
          name="origin"
          options={optionsOptions}
          icon={IoMdArrowDropdown}
          nameLabel="a Origem"
        />
        <BonusConatainer>
          <span>Bonus da Venda ?</span>
          <CheckBox options={optionsBonus} handleValue={handleValue} />
        </BonusConatainer>
        {isExistBonus && (
          <InputForm name="bonus" mask="currency" placeholder="Bônus" />
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
