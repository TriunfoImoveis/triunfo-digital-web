import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Button from '../../../components/Button';
import {
  FormButtons,
  FormRow,
  InputControlled,
  SelectControlled,
} from '../../../components/FormControls';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import { DateYMD, unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import { valiateDate } from '../../../utils/validateDate';
import { useFetchFinances } from '../../../hooks/useFetchFinances';
import { Container } from './styles';

interface IProfession {
  id: string;
  name: string;
}

interface IOrigin {
  id: string;
  name: string;
}

interface IClientPF {
  cpf: string;
  name: string;
  date_birth: string;
  email: string;
  phone: string;
  whatsapp: string;
  profession_id: string;
  civil_status: string;
  number_children: number | string;
  gender: string;
  origin_id: string;
}

interface IClientPJ {
  cnpj: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

const schemaPF = Yup.object().shape({
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
  profession_id: Yup.string().required('Profissão Obrigatória'),
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

const schemaPJ = Yup.object().shape({
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
});

const civilStatusToCode: Record<string, string> = {
  'CASADO(A)': 'C',
  CASADO: 'C',
  'SOLTEIRO(A)': 'S',
  SOLTEIRO: 'S',
  'DIVORCIADO(A)': 'D',
  DIVORCIADO: 'D',
  'VIUVO(A)': 'V',
  VIUVO: 'V',
};

const genderToCode: Record<string, string> = {
  MASCULINO: 'M',
  FEMININO: 'F',
  OUTROS: 'O',
};

const NewClients: React.FC = () => {
  const history = useHistory();
  const { data: professions } = useFetchFinances<IProfession[]>({
    url: `/professions?active=true`,
  });
  const { data: origins } = useFetchFinances<IOrigin[]>({
    url: `/origin-sale`,
  });

  const [loadingPF, setLoadingPF] = useState(false);
  const [loadingPJ, setLoadingPJ] = useState(false);
  const [errorsPF, setErrorsPF] = useState<Record<string, string>>({});
  const [errorsPJ, setErrorsPJ] = useState<Record<string, string>>({});
  const [formPF, setFormPF] = useState<IClientPF>({
    cpf: '',
    name: '',
    date_birth: '',
    email: '',
    phone: '',
    whatsapp: '',
    profession_id: '',
    civil_status: '',
    number_children: '',
    gender: '',
    origin_id: '',
  });
  const [formPJ, setFormPJ] = useState<IClientPJ>({
    cnpj: '',
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  const optionsEstadoCivil = useMemo(
    () => [
      { label: 'Casado(a)', value: 'C' },
      { label: 'Solteiro(a)', value: 'S' },
      { label: 'Divorciado(a)', value: 'D' },
      { label: 'Viúvo(a)', value: 'V' },
    ],
    [],
  );

  const optionsGenero = useMemo(
    () => [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' },
      { label: 'Outros', value: 'O' },
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

  const handleChangePF = (field: keyof IClientPF) => (value: string) => {
    setFormPF(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePJ = (field: keyof IClientPJ) => (value: string) => {
    setFormPJ(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitPF = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorsPF({});
      try {
        setLoadingPF(true);
        await schemaPF.validate(formPF, { abortEarly: false });

        const payload = {
          name: formPF.name,
          cpf: (formPF.cpf || '').replace(/\D/g, ''),
          email: formPF.email,
          phone: (formPF.phone || '').replace(/\D/g, ''),
          date_birth: DateYMD(formPF.date_birth),
          profession_id: formPF.profession_id,
          civil_status: civilStatusToCode[formPF.civil_status] || formPF.civil_status,
          number_children: Number(formPF.number_children),
          gender: genderToCode[formPF.gender] || formPF.gender,
          origin_id: formPF.origin_id,
          whatsapp: (formPF.whatsapp || '').replace(/\D/g, ''),
        };

        await api.post('/client', payload);

        toast.success('Cliente criado com sucesso');
        history.push('/adm/config/clientes');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          setErrorsPF(erros);
        } else {
          const error = err as AxiosError;
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('ERROR!, verifique as informações e tente novamente');
          }
        }
      } finally {
        setLoadingPF(false);
      }
    },
    [formPF, history],
  );

  const handleSubmitPJ = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorsPJ({});
      try {
        setLoadingPJ(true);
        await schemaPJ.validate(formPJ, { abortEarly: false });

        const payload = {
          client_type: 'JURIDICA',
          cnpj: unMaskedCNPJ(formPJ.cnpj),
          name: formPJ.name,
          phone: unMaked(formPJ.phone),
          address: formPJ.address || '',
          email: formPJ.email,
        };

        await api.post('/client', payload);

        toast.success('Cliente criado com sucesso');
        history.push('/adm/config/clientes');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const fieldErrors = getValidationErros(err);
          setErrorsPJ(fieldErrors);
        } else {
          const error = err as AxiosError;
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('ERROR!, verifique as informações e tente novamente');
          }
        }
      } finally {
        setLoadingPJ(false);
      }
    },
    [formPJ, history],
  );

  return (
    <AdmLayout>
      <Container>
        <h1>Novo Cliente</h1>
        <Tabs
          id="tab-container"
          className="tab-container"
          defaultActiveKey="pf"
          variant="tabs"
        >
          <TabBootstrap eventKey="pf" title="Pessoa Física">
            <form onSubmit={handleSubmitPF}>
              <FormRow>
                <InputControlled
                  label="CPF"
                  mask="cpf"
                  name="cpf"
                  maxlength={11}
                  value={formPF.cpf}
                  onChange={handleChangePF('cpf')}
                  error={errorsPF.cpf}
                />
                <InputControlled
                  mask="date"
                  label="Data de Nascimento"
                  name="date_birth"
                  value={formPF.date_birth}
                  onChange={handleChangePF('date_birth')}
                  error={errorsPF.date_birth}
                />
              </FormRow>
              <InputControlled
                label="Nome Completo"
                name="name"
                value={formPF.name}
                onChange={handleChangePF('name')}
                error={errorsPF.name}
              />
              <FormRow>
                <SelectControlled
                  name="civil_status"
                  placeholder="Informe o Estado Civil"
                  options={optionsEstadoCivil}
                  label="Estado Civil"
                  value={optionsEstadoCivil.find(
                    opt => opt.value === formPF.civil_status,
                  )}
                  onChange={option =>
                    handleChangePF('civil_status')(
                      (option as any)?.value || '',
                    )
                  }
                  error={errorsPF.civil_status}
                />
                <SelectControlled
                  name="gender"
                  placeholder="Informe o Gênero"
                  options={optionsGenero}
                  label="Gênero"
                  value={optionsGenero.find(
                    opt => opt.value === formPF.gender,
                  )}
                  onChange={option =>
                    handleChangePF('gender')((option as any)?.value || '')
                  }
                  error={errorsPF.gender}
                />
              </FormRow>
              <FormRow>
                <InputControlled
                  label="Números de Filhos"
                  name="number_children"
                  type="number"
                  maxlength={2}
                  value={String(formPF.number_children || '')}
                  onChange={handleChangePF('number_children')}
                  error={errorsPF.number_children}
                />
                <SelectControlled
                  name="profession_id"
                  placeholder="Informe a Profissão"
                  options={optionsProfessions}
                  label="Profissão"
                  value={optionsProfessions.find(
                    opt => opt.value === formPF.profession_id,
                  )}
                  onChange={option =>
                    handleChangePF('profession_id')(
                      (option as any)?.value || '',
                    )
                  }
                  error={errorsPF.profession_id}
                />
              </FormRow>
              <SelectControlled
                name="origin_id"
                placeholder="Informe a Origem"
                options={optionsOrigins}
                label="Origem"
                value={optionsOrigins.find(
                  opt => opt.value === formPF.origin_id,
                )}
                onChange={option =>
                  handleChangePF('origin_id')((option as any)?.value || '')
                }
                error={errorsPF.origin_id}
              />
              <FormRow>
                <InputControlled
                  label="Telefone"
                  id="phone"
                  mask="fone"
                  name="phone"
                  type="text"
                  maxlength={11}
                  value={formPF.phone}
                  onChange={handleChangePF('phone')}
                  error={errorsPF.phone}
                />
                <InputControlled
                  label="Whatsapp"
                  id="whatsapp"
                  mask="whats"
                  name="whatsapp"
                  type="text"
                  maxlength={13}
                  value={formPF.whatsapp}
                  onChange={handleChangePF('whatsapp')}
                  error={errorsPF.whatsapp}
                />
              </FormRow>
              <InputControlled
                label="E-mail"
                name="email"
                type="email" autoComplete="off"
                value={formPF.email}
                onChange={handleChangePF('email')}
                error={errorsPF.email}
              />
              <FormButtons>
                <Button
                  type="button"
                  className="cancel"
                  onClick={() => history.goBack()}
                >
                  Voltar
                </Button>
                <Button type="submit" className="next">
                  {loadingPF ? '...' : 'Salvar'}
                </Button>
              </FormButtons>
            </form>
          </TabBootstrap>
          <TabBootstrap eventKey="pj" title="Pessoa Juridica">
            <form onSubmit={handleSubmitPJ}>
              <InputControlled
                label="CNPJ"
                mask="cnpj"
                name="cnpj"
                maxlength={14}
                value={formPJ.cnpj}
                onChange={handleChangePJ('cnpj')}
                error={errorsPJ.cnpj}
              />
              <InputControlled
                label="Nome da Empresa"
                name="name"
                value={formPJ.name}
                onChange={handleChangePJ('name')}
                error={errorsPJ.name}
              />
              <InputControlled
                label="Telefone"
                id="phone"
                mask="fone"
                name="phone"
                type="text"
                maxlength={11}
                value={formPJ.phone}
                onChange={handleChangePJ('phone')}
                error={errorsPJ.phone}
              />
              <InputControlled
                label="Endereço"
                name="address"
                value={formPJ.address}
                onChange={handleChangePJ('address')}
                error={errorsPJ.address}
              />
              <InputControlled
                label="E-mail"
                name="email"
                value={formPJ.email}
                onChange={handleChangePJ('email')}
                error={errorsPJ.email}
              />

              <FormButtons>
                <Button
                  type="button"
                  className="cancel"
                  onClick={() => history.goBack()}
                >
                  Voltar
                </Button>
                <Button type="submit" className="next">
                  {loadingPJ ? '...' : 'Salvar'}
                </Button>
              </FormButtons>
            </form>
          </TabBootstrap>
        </Tabs>
      </Container>
    </AdmLayout>
  );
};

export default NewClients;
