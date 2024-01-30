import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AxiosError, AxiosResponse } from 'axios';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin, ButtonGroup } from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import Select from '../../../components/Select';
import { unMaked } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';
import { money } from '../../../utils/masked';

import axios from 'axios';

interface IRoteparams {
  id: string;
}

interface ISubsidiary {
  id: string;
  name: string;
  goal: string;
  city: string;
  state: string;
}

interface IIBGEResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface IUF {
  label: string,
  value: string;
}
interface ICity {
  name: string
}

interface IBGECityResponse {
  nome: string;
}

const NewSubisidiaries: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState(false);
  const [subsidiary, setSubsidiary] = useState<ISubsidiary>({} as ISubsidiary);
  const [ufs, setUfs] = useState<IUF[]>([])
  const [cities, setcities] = useState<ICity[]>([])
  const [selectedUf, setSelectedUf] = useState('0');
  const token = localStorage.getItem('@TriunfoDigital:token');
  const history = useHistory();

  const { id } = useParams<IRoteparams>();

  const getCities = async (selectedUf: string) => {
    if (selectedUf === '0') return;

   const response = await axios.get<IBGECityResponse[]>( `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
   const cities = response.data.map(item => ({name: item.nome}))
    setcities(cities)
  }

  useEffect(() => {
    const loadSubsidiary = async () => {
      const response = await api.get(`/subsidiary/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const subsidiary = response.data;
     ;
     setSubsidiary({
      ...subsidiary,
      goal: money(Number(subsidiary.goal))
     });
     setSelectedUf(subsidiary.state)
    };
    const loadUfs = async () => {
      const response = await axios.get<any, AxiosResponse<IIBGEResponse[]>>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const ufs = response.data.map(item => {
        return {
          label: item.nome,
          value: item.sigla
        }
      })

      setUfs(ufs)
    }
    if (id) {
      setPageDetails(true);
      loadSubsidiary();
    }
    loadUfs()
  }, [id, token]);

  useEffect(() => {
    getCities(selectedUf)
  }, [selectedUf])


  const optionsState = ufs;

 

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);

    },
    [],
  );

  const unMasked = useCallback(() => {
    const goal = unMaked(formRef.current?.getFieldValue('goal'));
    formRef.current?.setFieldValue('goal', goal);
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMasked();
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Filial'),
        goal: Yup.string().required('Meta Anual obritória'),
        state: Yup.string().required('Estado obrigatório'),
        city: Yup.string().required('Cidade obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const paylaod = {
        ...data,
        country: 'Brasil'
      }
      const response = await api.post('/subsidiary', paylaod, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const payloadDepartament = {
          name: "Comercial",
          initials: "COM",
          goal: 150000.00,
          subsidiary: response.data.id
        };
        const responseDepartaments = await api.post('/departament', payloadDepartament, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        
        if (responseDepartaments.status === 200) {
          toast.success('Nova Filial Cadastrada');
          history.push('/adm/lista-filiais');
          setLoading(false);
        }
      }
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

  const updateSubsidiary = useCallback(async () => {
    unMasked();
    const data = formRef.current?.getData();
    try {
      await api.put(`/subsidiary/${id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Dados da Filial Atualizadaos');
      window.location.reload();
    } catch (error) {
      toast.error('ERRO!');
    }
  }, [unMasked, id, token]);
  const deleteSubsidiary = useCallback(async () => {
    const payload = {
      active: false
    }
    try {
      await api.put(`/subsidiary/${id}`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Filial desativada');
      history.push('/adm/lista-filiais');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, id, token]);

  const optionsCities = cities.map(city => {
    return {
      label: city.name,
      value: city.name,
    }
  })

  return (
    <AdmLayout>
      <Container>
        <h1>Nova Filial</h1>
        {pageDetails ? (
          <Form ref={formRef} onSubmit={handleSubmit} initialData={subsidiary}>
            <InfoLogin>
              <fieldset className="login">
                <legend>INFORMAÇÕES DA FILIAL</legend>
                <Input label="Nome" name="name"/>
                <Input label="Meta" name="goal" />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  onChange={handleSelectedUF}
                  defaultValue={subsidiary.state}
                />
               <Select
                  name="city"
                  nameLabel="Cidade"
                  options={optionsCities}
                />
              </fieldset>
            </InfoLogin>

            {pageDetails && (
              <ButtonGroup>
                <button type="button" onClick={updateSubsidiary}>
                  <Sync />
                  <span>Atualizar</span>
                </button>
                <button type="button" onClick={deleteSubsidiary}>
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
                <legend>INFORMAÇÕES DA FILIAL</legend>
                <Input
                  label="Nome"
                  name="name"
                  placeholder="Nome da Filial"
                />
                <Input
                  label="Meta"
                  name="goal"
                  mask="currency"
                  placeholder="R$ 1000.000.000,00"
                />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  defaultValue={selectedUf}
                  onChange={handleSelectedUF}
                />
                 <Select
                  name="city"
                  nameLabel="Cidade"
                  defaultValue={'0'}
                  options={optionsCities}
                />
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
                {loading ? 'Aguarde' : 'Cadastrar Filial'}
              </button>
            )}
          </Form>
        )}
      </Container>
    </AdmLayout>
  );
};

export default NewSubisidiaries;
