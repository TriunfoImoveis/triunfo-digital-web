import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { FoneMask } from '../../../utils/masked';
import { unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import Button from '../../Button';
import { InputControlled, FormButtons } from '../../FormControls';
import getValidationErros from '../../../utils/getValidationErros';
import { useForm } from '../../../context/FormContext';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

interface IClientData {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const schema = Yup.object().shape({
  cnpj: Yup.string()
    .min(14, 'Informe o cnpj corretamente, cnpj deve conter 14 digitos, sem traços ou pontos')
    .max(18, 'Informe o cnpj corretamente')
    .required('CNPJ obrigatório'),
  name: Yup.string().required('Nome Obrigatório'),
  phone: Yup.string()
    .min(11, 'O numero precisa ter pelo menos 11 números')
    .max(15, 'Digite um numero de telefone válido')
    .required('Telefone obrigatório'),
  address: Yup.string(),
  email: Yup.string().email('Infome um email válido').required('E-mail obrigatório'),
});

const CustomerBuyerLealPerson: React.FC<Props> = ({ nextStep, prevStep }) => {
  const { updateFormData, formData } = useForm();
  const [form, setForm] = useState(() => ({
    cnpj: formData.client_buyer?.cnpj || '',
    name: formData.client_buyer?.name || '',
    phone: formData.client_buyer?.phone || '',
    address: formData.client_buyer?.address || '',
    email: formData.client_buyer?.email || '',
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(true);

  useEffect(() => {
    setDisable(!form.cnpj || form.cnpj.length < 14);
  }, [form.cnpj]);

  const handleChange = (field: string) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const searchClientoForCNPJ = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm(prev => ({ ...prev, cnpj: value }));
      const cnpj = unMaked(value);
      if (cnpj.length === 14) {
        try {
          const response = await api.get(`/client?cnpj=${cnpj}`);
          const { name, phone, address, email } = response.data;
          setDisable(true);
          setForm({
            cnpj: value,
            name,
            phone: FoneMask(phone),
            address: address || '',
            email,
          });
        } catch (error) {
          setDisable(false);
        }
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      try {
        setLoading(true);
        await schema.validate(form, { abortEarly: false });
        updateFormData({
          client_buyer: {
            client_type: 'JURIDICA',
            cnpj: unMaskedCNPJ(form.cnpj),
            name: form.name,
            phone: unMaked(form.phone),
            address: form.address || '',
            email: form.email,
          },
        });
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const fieldErrors = getValidationErros(err);
          setErrors(fieldErrors);
        }
        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [form, nextStep, updateFormData],
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputControlled
        label="CNPJ"
        mask="cnpj"
        name="cnpj"
        maxlength={14}
        value={form.cnpj}
        onChange={handleChange('cnpj')}
        onBlur={searchClientoForCNPJ}
        error={errors.cnpj}
      />
      <InputControlled
        label="Nome da Empresa"
        name="name"
        value={form.name}
        readOnly={disabled}
        onChange={handleChange('name')}
        error={errors.name}
      />
      <InputControlled
        label="Telefone"
        id="phone"
        mask="fone"
        name="phone"
        type="text"
        maxlength={11}
        value={form.phone}
        readOnly={disabled}
        onChange={handleChange('phone')}
        error={errors.phone}
      />
      <InputControlled
        label="Endereço"
        name="address"
        value={form.address}
        readOnly={disabled}
        onChange={handleChange('address')}
        error={errors.address}
      />
      <InputControlled
        label="E-mail"
        name="email"
        value={form.email}
        readOnly={disabled}
        onChange={handleChange('email')}
        error={errors.email}
      />

      <FormButtons>
        <Button type="button" className="cancel" onClick={() => prevStep()}>
          Voltar
        </Button>
        <Button type="submit" className="next">
          {loading ? '...' : 'Próximo'}
        </Button>
      </FormButtons>
    </form>
  );
};

export default CustomerBuyerLealPerson;
