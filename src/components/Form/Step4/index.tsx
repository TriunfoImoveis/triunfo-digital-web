import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SiGooglecalendar } from 'react-icons/si';
import { toast } from 'react-toastify';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import {
  Container,
  InputGroup,
  ButtonGroup,
  InputForm,
  InputFormMask,
} from './styles';

interface ISaleNewData {
  SaleNewData(data: object): void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step4: React.FC<ISaleNewData> = ({ SaleNewData, nextStep, prevStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const optionsEmpresa = [
    { label: 'DC Reis - 18%', value: 'DC Reis' },
    { label: 'Francistelmo - 10%', value: 'Francistelmo' },
    { label: 'Raunin - 22%', value: 'Raunin' },
  ];

  const optionsFormaPagamento = [
    { label: 'Paga integral e pede NF', value: 'Paga integral e pede NF' },
  ];

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          realtor_sell: Yup.string().required('Corretor Vendedor Obrigatório'),
          coordenador: Yup.string().required('Coordenador Obrigatório'),
          director: Yup.string().required('Diretor Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        SaleNewData(data);
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
    [SaleNewData, nextStep],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <InputForm name="value" placeholder="Valor da venda" />
          <InputFormMask
            mask="99/99/9999"
            name="date_sale"
            icon={SiGooglecalendar}
            placeholder="Data da Venda"
          />
        </InputGroup>
        <InputGroup>
          <Select
            name="empresa"
            options={optionsEmpresa}
            icon={IoMdArrowDropdown}
            nameLabel="a empresa (% porcentagem)"
          />
          <Select
            name="forma_pag"
            icon={IoMdArrowDropdown}
            options={optionsFormaPagamento}
            nameLabel="a forma de pagamento"
          />
        </InputGroup>
        <InputGroup>
          <InputForm
            name="porcentagem"
            placeholder="Porcentagem Total da Venda"
          />
          <InputForm
            name="comissao"
            placeholder="Comissão"
            readOnly
            value="R$ 50.000,00"
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
