import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { FoneMask } from '../../../utils/masked';
import { unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import Button from '../../Button';
import {
  InputControlled,
  FormButtons,
  SelectControlled,
} from '../../FormControls';
import getValidationErros from '../../../utils/getValidationErros';
import { useForm } from '../../../context/FormContext';
import { useFetchFinances } from '../../../hooks/useFetchFinances';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

interface IClientData {
  id?: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  origin_id?: string;
}

interface IOrigin {
  id: string;
  name: string;
}

const schema = Yup.object().shape({
  cnpj: Yup.string()
    .min(
      14,
      'Informe o cnpj corretamente, cnpj deve conter 14 digitos, sem traços ou pontos',
    )
    .max(18, 'Informe o cnpj corretamente')
    .required('CNPJ obrigatório'),
  name: Yup.string().required('Nome Obrigatório'),
  phone: Yup.string()
    .min(11, 'O numero precisa ter pelo menos 11 números')
    .max(15, 'Digite um numero de telefone válido')
    .required('Telefone obrigatório'),
  address: Yup.string(),
  email: Yup.string()
    .email('Infome um email válido')
    .required('E-mail obrigatório'),
  origin_id: Yup.string().required('Origem obrigatória'),
});

const CustomerBuyerLealPerson: React.FC<Props> = ({ nextStep, prevStep }) => {
  const { updateFormData, formData } = useForm();
  const [form, setForm] = useState(() => ({
    cnpj: formData.client_buyer?.cnpj || '',
    name: formData.client_buyer?.name || '',
    phone: formData.client_buyer?.phone || '',
    address: formData.client_buyer?.address || '',
    email: formData.client_buyer?.email || '',
    origin_id: formData.client_buyer?.origin_id || '',
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(true);
  const [disableOrigin, setDisableOrigin] = useState(false);
  const [client, setClient] = useState<Partial<IClientData>>({});

  const { data: origins } = useFetchFinances<IOrigin[]>({
    url: `/origin-sale?client=true`,
  });

  useEffect(() => {
    setDisable(!form.cnpj || form.cnpj.length < 14);
  }, [form.cnpj]);

  const optionsOrigins = useMemo(() => {
    if (!origins) return [];
    return origins.map(origin => ({
      label: origin.name,
      value: origin.id,
    }));
  }, [origins]);

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
          const { id, name, phone, address, email, origin_id } = response.data;
          setDisable(true);
          setDisableOrigin(!!origin_id);
          setClient({
            id,
            name,
            phone: FoneMask(phone),
            address: address || '',
            email,
            origin_id,
          });
          setForm({
            cnpj: value,
            name,
            phone: FoneMask(phone),
            address: address || '',
            email,
            origin_id,
          });
        } catch (error) {
          setClient({});
          setDisable(false);
          setDisableOrigin(false);
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

        const payload = {
          cnpj: unMaskedCNPJ(form.cnpj),
          name: form.name,
          phone: unMaked(form.phone),
          address: form.address || '',
          email: form.email,
          origin_id: form.origin_id,
        };

        let clientId = client.id;

        if (!clientId) {
          const response = await api.post('/client', payload);
          clientId = response.data.id;
        } else {
          await api.put(`/client/${clientId}`, payload);
        }

        updateFormData({
          client_buyer: clientId,
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
    [client.id, form, nextStep, updateFormData],
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

      <SelectControlled
        name="origin_id"
        placeholder="Informe onde esse cliente foi prospectado"
        options={optionsOrigins}
        label="Origem"
        isDisabled={disableOrigin}
        value={optionsOrigins.find(opt => opt.value === form.origin_id)}
        onChange={option =>
          handleChange('origin_id')((option as any)?.value || '')
        }
        error={errors.origin_id}
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
