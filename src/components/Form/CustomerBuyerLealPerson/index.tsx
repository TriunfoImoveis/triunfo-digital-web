import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { FoneMask } from '../../../utils/masked';
import { unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import Button from '../../Button';

import { InputForm, ButtonGroup } from './styles';
import getValidationErros from '../../../utils/getValidationErros';
import { useForm } from '../../../context/FormContext';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
}

interface IClientData {
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface FormData {
  client_buyer: {
    cnpj: string;
    name: string;
    phone: string;
    address?: string;
    email: string;
  };
}

const CustomerBuyerLealPerson: React.FC<ISaleNewData> = ({
  nextStep,
  prevStep,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [client, setCliente] = useState<IClientData>({} as IClientData);
  const [disabled, setDisable] = useState(true);
  const { updateFormData } = useForm();

  useEffect(() => {
    setDisable(true);
    setCliente({} as IClientData);
    return () => {
      setDisable(true);
      setCliente({} as IClientData);
    };
  }, []);

  const searchClientoForCNPJ = async (event: ChangeEvent<HTMLInputElement>) => {
    setCliente({} as IClientData);
    const cnpj = unMaked(event.target.value);
    if (cnpj.length === 14) {
      try {
        const response = await api.get(`/client?cnpj=${cnpj}`);
        const { name, phone, address, email } = response.data;
        setDisable(true);
        setCliente({
          name,
          phone: FoneMask(phone),
          address,
          email,
        } as IClientData);
      } catch (error) {
        setCliente({} as IClientData);
        setDisable(false);
      }
    }
  };

  const handleSubmit = useCallback(
    async (data: FormData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          client_buyer: Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório'),
            cnpj: Yup.string()
              .min(
                14,
                'Informe o cnpj corretamente, cnpj deve conter 14 digitos, sem traços ou pontos',
              )
              .max(18, 'Informe o cnpj corretamente')
              .required('CNPJ obrigatório'),
            phone: Yup.string()
              .min(11, 'O numero precisa ter pelo menos 11 números')
              .max(15, 'Digite um numero de telefone válido')
              .required('Telefone obrigatório'),
            address: Yup.string(),
            email: Yup.string()
              .email('Infome um email válido')
              .required('E-mail obrigatório'),
          }),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          client_buyer: {
            client_type: 'JURIDICA',
            cnpj: unMaskedCNPJ(data.client_buyer.cnpj),
            name: data.client_buyer.name,
            phone: unMaked(data.client_buyer.phone),
            address: data.client_buyer.address ? data.client_buyer.address : '',
            email: data.client_buyer.email,
          },
        };

        updateFormData(formData || {});
        nextStep();
        setCliente({} as IClientData);
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
    [nextStep, updateFormData],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Scope path="client_buyer">
        <InputForm
          label="CNPJ"
          mask="cnpj"
          name="cnpj"
          maxlength={14}
          onChange={searchClientoForCNPJ}
        />
        <InputForm
          label="Nome da Empresa"
          name="name"
          readOnly={disabled}
          defaultValue={client.name}
        />
        <InputForm
          label="Telefone"
          id="phone"
          mask="fone"
          name="phone"
          type="text"
          maxlength={11}
          readOnly={disabled}
          defaultValue={client.phone}
        />
        <InputForm
          label="Endereço"
          name="address"
          readOnly={disabled}
          defaultValue={client.address}
        />
        <InputForm
          label="E-mail"
          name="email"
          readOnly={disabled}
          defaultValue={client.email}
        />
      </Scope>

      <ButtonGroup>
        <Button type="button" className="cancel" onClick={() => prevStep()}>
          Voltar
        </Button>
        <Button type="submit" className="next">
          {loading ? '...' : 'Próximo'}
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default CustomerBuyerLealPerson;
