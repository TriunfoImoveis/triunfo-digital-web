import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import  { AxiosError } from 'axios';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin, ButtonGroup } from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import Select from '../../../components/Select';
import { unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';
import { cnpj, FoneMask } from '../../../utils/masked';
import { states } from '../../../utils/loadOptions';

interface IRoteparams {
  id: string;
}

interface IBuilder {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  city: string;
}

interface ISubsidiary {
  id: string;
  state: string;
}

const NewBuilders: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState(false);
  const [builder, setBuilders] = useState<IBuilder>({} as IBuilder);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [selectedUf, setSelectedUf] = useState('MA');
  const token = localStorage.getItem('@TriunfoDigital:token');
  const history = useHistory();

  const { id } = useParams<IRoteparams>();

  useEffect(() => {
    const loadBuilder = async () => {
      const response = await api.get(`/builder/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const builder = response.data;
      const builderFormatted = {
        ...builder,
        cnpj: cnpj(builder.cnpj),
        phone: FoneMask(builder.phone),
      };
      setBuilders(builderFormatted);
    };
    const loadSubsidiary = async () => {
      const response = await api.get(`/subsidiary`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSubsidiaries(response.data)
      
    }
    if (id) {
      setPageDetails(true);
      loadBuilder();
    }
    loadSubsidiary();
  }, [id, token]);




  const optionsState = subsidiaries.map(subsiary => {
    return {
      label: states[subsiary.state],
      value: subsiary.state
    }
  });

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const unMasked = useCallback(() => {
    const fone = unMaked(formRef.current?.getFieldValue('phone'));
    formRef.current?.setFieldValue('phone', fone);
    const cnpj = unMaskedCNPJ(formRef.current?.getFieldValue('cnpj'));
    formRef.current?.setFieldValue('cnpj', cnpj);
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMasked();
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Contrutora obrigatório'),
        cnpj: Yup.string().required('CNPJ obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        responsible: Yup.string().required('Nome do Responsável obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/builder', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Nova Construtora Cadastrada');
      history.push('/adm/lista-construtoras');
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      const errors = err as AxiosError
      if (errors.response?.status === 400) {
        toast.error(errors.response?.data.message);
      } else if (errors.response?.status === 500) {
        toast.error('Erro no servidor! contate o suporte');
      } else {
        toast.error('ERROR!, verifique as informações e tente novamente');
      }
      
      setLoading(false);
    }
  }, [unMasked, token, history]);

  const updateBuilder = useCallback(async () => {
    unMasked();
    const data = formRef.current?.getData();
    try {
      await api.put(`/builder/${id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Dados da Construtora Atualizadaos');
      window.location.reload();
    } catch (error) {
      toast.error('ERRO!');
    }
  }, [unMasked, id, token]);
  const deleteBuilder = useCallback(async () => {
    try {
      await api.patch(`/builder/deactivate/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Contrutora desativada');
      history.push('/adm/lista-construtoras');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, id, token]);

  return (
    <AdmLayout>
      <Container>
        <h1>NOVA CONSTRUTORA</h1>
        {pageDetails ? (
          <Form ref={formRef} onSubmit={handleSubmit} initialData={builder}>
            <InfoLogin>
              <fieldset className="login">
                <legend>INFORMAÇÕES DA CONSTRUTORA</legend>
                <Input label="Nome" name="name" />
                <Input label="CNPJ" name="cnpj" maxlength={14} mask="cnpj" />
                <Input label="E-mail" name="email" type="email" />
                <Input
                  label="Telefone"
                  name="phone"
                  mask="fone"
                  maxlength={11}
                />
                <Input label="Nome do Responsável" name="responsible" />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  defaultValue={selectedUf}
                  onChange={handleSelectedUF}
                />
              </fieldset>
            </InfoLogin>

            {pageDetails && (
              <ButtonGroup>
                <button type="button" onClick={updateBuilder}>
                  <Sync />
                  <span>Atualizar</span>
                </button>
                <button type="button" onClick={deleteBuilder}>
                  <Garb />
                  <span>Remover</span>
                </button>
              </ButtonGroup>
            )}

            {!pageDetails && (
              <button type="submit" className="submit">
                {loading ? 'Aguarde' : 'Cadastrar Colaborador'}
              </button>
            )}
          </Form>
        ) : (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InfoLogin>
              <fieldset className="login">
                <legend>INFORMAÇÕES DE LOGIN</legend>
                <Input
                  label="Nome"
                  name="name"
                  placeholder="Contrutora Triunfo"
                />
                <Input
                  label="CNPJ"
                  name="cnpj"
                  maxlength={14}
                  mask="cnpj"
                  placeholder="00.000.000/0001-12"
                />
                <Input
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="triunfocontrutora@gmail.com"
                />
                <Input
                  label="Telefone"
                  name="phone"
                  mask="fone"
                  maxlength={11}
                  placeholder="(99) 9999-9999"
                />
                <Input
                  label="Nome do Responsável"
                  name="responsible"
                  placeholder="Francistelmo Santos"
                />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  defaultValue={selectedUf}
                  onChange={handleSelectedUF}
                />
                <Input name="city" label="Cidade" />
              </fieldset>
            </InfoLogin>

            {pageDetails && (
              <ButtonGroup>
                <button type="button">
                  <Sync />
                  <span>Atualizar</span>
                </button>
                <button type="button">
                  <Garb />
                  <span>Remover</span>
                </button>
              </ButtonGroup>
            )}

            {!pageDetails && (
              <button type="submit" className="submit">
                {loading ? 'Aguarde' : 'Cadastrar Colaborador'}
              </button>
            )}
          </Form>
        )}
      </Container>
    </AdmLayout>
  );
};

export default NewBuilders;
