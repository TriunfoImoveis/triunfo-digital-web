import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  FormRow,
  FormButtons,
  InputControlled,
  SelectControlled,
} from '../../FormControls';
import Button from '../../Button';
import getValidationErros from '../../../utils/getValidationErros';
import { unMaked, DateYMD } from '../../../utils/unMasked';
import { FoneMask, WhatsMask } from '../../../utils/masked';
import { DateBRL } from '../../../utils/format';
import { useForm } from '../../../context/FormContext';
import api from '../../../services/api';
import { Container } from './styles';
import { valiateDate } from '../../../utils/validateDate';
import CustomerBuyerLealPerson from '../CustomerBuyerLealPerson';
import { useFetchFinances } from '../../../hooks/useFetchFinances';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeClient: 'buyer' | 'salesman';
}

interface IProfession {
  id: string;
  name: string;
}

interface IOrigin {
  id: string;
  name: string;
}

interface IClientData {
  id?: string;
  cpf?: string;
  name: string;
  date_birth: string;
  email: string;
  phone: string;
  whatsapp: string;
  occupation?: string;
  profession_id: string;
  civil_status: string;
  number_children: number | string;
  gender: string;
  origin_id?: string;
  profession?: IProfession | string;
}

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(
      11,
      'Informe o cpf corretamente, cpf deve conter 11 digitos, sem traços ou pontos',
    )
    .max(14, 'Informe o cpf corretamente')
    .required('CPF obrigatório'),
  name: Yup.string().required('Nome Obrigatório'),
  date_birth: Yup.string()
    .test('validateDate', 'Data Invalida', value => valiateDate(value || ''))
    .required('Data de nascimento obrigatória'),
  civil_status: Yup.string().required('Estado Civil Obrigatório'),
  gender: Yup.string().required('Genero Obrigatório'),
  number_children: Yup.string().required('Quantidade de filhos Obrigatória'),
  profession: Yup.string().required('Profissão Obrigatória'),
  origin_id: Yup.string().required('Origem obrigatória'),
  phone: Yup.string()
    .min(11, 'O numero precisa ter pelo menos 11 números')
    .max(15, 'Digite um numero de telefone válido')
    .required('Telefone obrigatório'),
  whatsapp: Yup.string()
    .min(11, 'O numero precisa ter pelo menos 11 digitos')
    .max(19, 'Digite um numero de telefone válido')
    .required('Whatsapp obrigatório'),
  email: Yup.string()
    .email('informe um email válido')
    .required('E-mail Obrigatório'),
});

const Step2: React.FC<ISaleNewData> = ({ nextStep, prevStep }) => {
  const { updateFormData, formData } = useForm();
  const { data: professions } = useFetchFinances<IProfession[]>({
    url: `/professions?active=true`,
  });
  const { data: origins } = useFetchFinances<IOrigin[]>({
    url: `/origin-sale`,
  });

  const [loading, setLoading] = useState(false);
  const [client, setCliente] = useState<IClientData>({} as IClientData);
  const [disabled, setDisable] = useState(true);
  const [disableOrigin, setDisableOrigin] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<IClientData>(() => ({
    id: formData.client_buyer?.id || '',
    cpf: '',
    name: '',
    date_birth: '',
    email: '',
    phone: '',
    whatsapp: '',
    occupation: '',
    profession_id: '',
    civil_status: '',
    number_children: '',
    gender: '',
    profession: undefined,
    origin_id: '',
    ...(formData.client_buyer || {}),
  }));

  useEffect(() => {
    setDisable(true);
    setCliente({} as IClientData);
    return () => {
      setDisable(true);
      setCliente({} as IClientData);
    };
  }, []);

  const optionsEstadoCivil = useMemo(
    () => [
      { label: 'Casado(a)', value: 'CASADO(A)' },
      { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
      { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
      { label: 'Viúvo(a)', value: 'VIUVO(A)' },
    ],
    [],
  );

  const optionsGenero = useMemo(
    () => [
      { label: 'Masculino', value: 'MASCULINO' },
      { label: 'Feminino', value: 'FEMININO' },
      { label: 'Outros', value: 'OUTROS' },
    ],
    [],
  );

  const optionsProfessions = useMemo(() => {
    if (!professions) {
      return [];
    }
    return professions.map(profession => ({
      label: profession.name,
      value: profession.id,
    }));
  }, [professions]);

  const optionsOrigins = useMemo(() => {
    if (!origins) return [];
    return origins.map(origin => ({
      label: origin.name,
      value: origin.id,
    }));
  }, [origins]);

  const handleChange = (field: keyof IClientData) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const searchClientoForCPF = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setCliente({} as IClientData);
      const value = event.target.value;
      setForm(prev => ({ ...prev, cpf: value }));
      const cpf = unMaked(value);
      if (cpf.length === 11) {
        try {
          const response = await api.get(`/client?cpf=${cpf}`);
          const {
            id,
            name,
            date_birth,
            email,
            phone,
            whatsapp,
            profession_id,
            civil_status,
            number_children,
            gender,
            profession,
            origin_id,
          } = response.data;
          setDisable(true);
          setDisableOrigin(!!origin_id);
          const data: IClientData = {
            id,
            name,
            date_birth: DateBRL(date_birth),
            email,
            phone: FoneMask(phone),
            whatsapp: WhatsMask(whatsapp || ''),
            profession_id,
            civil_status,
            number_children,
            gender,
            profession,
            origin_id,
          } as IClientData;
          setCliente(data);
          setForm(prev => ({ ...prev, ...data, cpf: value }));
        } catch (error) {
          setCliente({} as IClientData);
          setDisable(false);
          setDisableOrigin(false);
        }
      }
    },
    [],
  );

  const professionValue =
    typeof form.profession === 'object' ? form.profession?.id : form.profession;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      try {
        setLoading(true);
        await schema.validate(form, { abortEarly: false });

        const professionId =
          typeof form.profession === 'object'
            ? form.profession?.id || form.profession_id
            : form.profession || form.profession_id;

        let clientId = form.id || client.id;

        if (!clientId) {
          const payload = {
            name: form.name,
            cpf: unMaked(form.cpf || ''),
            email: form.email,
            phone: unMaked(form.phone),
            date_birth: DateYMD(form.date_birth),
            profession_id: professionId,
            civil_status: form.civil_status,
            number_children: Number(form.number_children),
            gender: form.gender,
            origin_id: form.origin_id,
          };
          const created = await api.post('/client', payload);
          clientId = created.data.id;
        } else if (!client.origin_id && form.origin_id) {
          await api.put(`/client/${clientId}`, { origin_id: form.origin_id });
        }

        updateFormData({
          client_buyer: clientId,
        });
        nextStep();
        setCliente({} as IClientData);
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
    [client.id, client.origin_id, form, nextStep, updateFormData],
  );

  return (
    <Container>
      <Tabs
        id="tab-container"
        className="tab-container"
        defaultActiveKey="pf"
        variant="tabs"
      >
        <TabBootstrap eventKey="pf" title="Pessoa Física">
          <form onSubmit={handleSubmit}>
            <FormRow>
              <InputControlled
                label="CPF"
                mask="cpf"
                name="cpf"
                maxlength={11}
                value={form.cpf}
                onChange={value => {
                  handleChange('cpf')(value);
                  searchClientoForCPF({ target: { value } } as any);
                }}
                onBlur={searchClientoForCPF}
                error={errors.cpf}
              />
              <InputControlled
                mask="date"
                label="Data de Nascimento"
                name="date_birth"
                value={form.date_birth}
                onChange={handleChange('date_birth')}
                readOnly={disabled}
                error={errors.date_birth}
              />
            </FormRow>
            <InputControlled
              label="Nome Completo"
              name="name"
              value={form.name}
              readOnly={disabled}
              onChange={handleChange('name')}
              error={errors.name}
            />
            <FormRow>
              {disabled ? (
                <>
                  <InputControlled
                    label="Estado Civil"
                    name="civil_status"
                    value={form.civil_status}
                    readOnly
                    error={errors.civil_status}
                  />
                  <InputControlled
                    label="Gênero"
                    name="gender"
                    value={form.gender}
                    readOnly
                    error={errors.gender}
                  />
                </>
              ) : (
                <>
                  <SelectControlled
                    name="civil_status"
                    placeholder="Informe o Estado Civil"
                    options={optionsEstadoCivil}
                    label="Estado Civil"
                    isDisabled={disabled}
                    value={optionsEstadoCivil.find(
                      opt => opt.value === form.civil_status,
                    )}
                    onChange={option =>
                      handleChange('civil_status')((option as any)?.value || '')
                    }
                    error={errors.civil_status}
                  />
                  <SelectControlled
                    name="gender"
                    placeholder="Informe o Gênero"
                    options={optionsGenero}
                    label="Gênero"
                    isDisabled={disabled}
                    value={optionsGenero.find(opt => opt.value === form.gender)}
                    onChange={option =>
                      handleChange('gender')((option as any)?.value || '')
                    }
                    error={errors.gender}
                  />
                </>
              )}
            </FormRow>
            <FormRow>
              <InputControlled
                label="Números de Filhos"
                name="number_children"
                type="number"
                maxlength={2}
                value={String(form.number_children || '')}
                readOnly={disabled}
                onChange={handleChange('number_children')}
                error={errors.number_children}
              />
              {client.profession ? (
                <InputControlled
                  label="Profissão"
                  name="profession"
                  readOnly
                  value={
                    typeof client.profession === 'object'
                      ? (client.profession as IProfession).name
                      : client.profession
                  }
                  error={errors.profession}
                />
              ) : (
                <SelectControlled
                  name="profession"
                  placeholder="Informe a Profissão"
                  options={optionsProfessions}
                  label="Profissão"
                  value={optionsProfessions.find(
                    opt => opt.value === professionValue,
                  )}
                  onChange={option =>
                    handleChange('profession')((option as any)?.value || '')
                  }
                  error={errors.profession}
                />
              )}
            </FormRow>
            <SelectControlled
              name="origin_id"
              placeholder="Informe a Origem"
              options={optionsOrigins}
              label="Origem"
              isDisabled={disableOrigin}
              value={optionsOrigins.find(opt => opt.value === form.origin_id)}
              onChange={option =>
                handleChange('origin_id')((option as any)?.value || '')
              }
              error={errors.origin_id}
            />
            <FormRow>
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
                label="Whatsapp"
                id="whatsapp"
                mask="whats"
                name="whatsapp"
                type="text"
                maxlength={13}
                value={form.whatsapp}
                readOnly={false}
                onChange={handleChange('whatsapp')}
                error={errors.whatsapp}
              />
            </FormRow>
            <InputControlled
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              readOnly={disabled}
              onChange={handleChange('email')}
              error={errors.email}
            />
            <FormButtons>
              <Button
                type="button"
                className="cancel"
                onClick={() => prevStep()}
              >
                Voltar
              </Button>
              <Button type="submit" className="next">
                {loading ? '...' : 'Próximo'}
              </Button>
            </FormButtons>
          </form>
        </TabBootstrap>
        <TabBootstrap eventKey="pj" title="Pessoa Juridica">
          <CustomerBuyerLealPerson nextStep={nextStep} prevStep={prevStep} />
        </TabBootstrap>
      </Tabs>
    </Container>
  );
};

export default Step2;
