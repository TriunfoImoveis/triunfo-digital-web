import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin, ButtonGroup } from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import Select from '../../../components/Select';

import axios from 'axios';
import { states } from '../../../utils/loadOptions';
import { useFetchFinances } from '../../../hooks/useFetchFinances';
import { BiCheck } from 'react-icons/bi';

interface IRoteparams {
  id: string;
}

interface INeighboorhood {
  id: string;
  name: string;
  city: string;
  uf: string;
  active: boolean;
}

interface ICity {
  name: string
}

interface IBGECityResponse {
  nome: string;
}

const UpdateNeighbohood: React.FC = () => {
  const { id } = useParams<IRoteparams>();

  const {data: neighborhood} = useFetchFinances<INeighboorhood>({url: `/neighborhood/${id}`})

  const formRef = useRef<FormHandles>(null);
  const [cities, setcities] = useState<ICity[]>([])
  const history = useHistory();


  const getCities = async (selectedUf: string) => {
    if (selectedUf === '0') return;

    const response = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    const cities = response.data.map(item => ({ name: item.nome }))
    setcities(cities)
  }

  const optionsState = Object.keys(states).map((key) => ({
    label: states[key],
    value: key,
  }));

  useEffect(() => {
    if (neighborhood) {
      const {uf} = neighborhood;
      getCities(uf)
    }
  }, [neighborhood])


  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      getCities(uf);
    },
    [],
  );



  const updateNeighborhood = useCallback(async () => {
    const data = formRef.current?.getData();
    try {
      await api.patch(`/neighborhood/${id}`, data);
      toast.success('Dados do bairro Atualizadaos');
      window.location.reload();
    } catch (error) {
      toast.error('ERRO!');
    }
  }, [id]);
  const deleteNeighborhood = useCallback(async () => {
    try {
      await api.delete(`/neighborhood`, {
        params: {
          id
        }
      });
      toast.success('Bairro desativado');
      history.push('/adm/lista-bairros');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, id]);
  const activateNeighborhood = useCallback(async () => {
    try {
      await api.post(`/neighborhood/${id}/active`);
      toast.success('Bairro Ativado');
      history.push('/adm/lista-bairros');
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [history, id]);

  const optionsCities = cities.map(city => {
    return {
      label: city.name,
      value: city.name,
    }
  })

  return (
    <AdmLayout>
      <Container>
        <h1>Novo Bairro</h1>
        <Form ref={formRef} onSubmit={updateNeighborhood} initialData={neighborhood}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DO BAIRRO</legend>
              <Input label="Nome" name="name" />
              <Select
                name="uf"
                nameLabel="Estado"
                options={optionsState}
                onChange={handleSelectedUF}
                defaultValue={neighborhood && neighborhood.uf}
              />
              <Select
                name="city"
                nameLabel="Cidade"
                options={optionsCities}
                defaultValue={neighborhood && neighborhood.city}
                
              />
            </fieldset>
          </InfoLogin>

          <ButtonGroup>
            <button type="submit">
              <Sync />
              <span>Atualizar</span>
            </button>
            {neighborhood && neighborhood.active ? (
              <button type="button" onClick={deleteNeighborhood}>
              <Garb />
              <span>Desativar</span>
            </button>
            ) : (
              <button type="button" onClick={activateNeighborhood}>
              <BiCheck size={50} />
              <span>Ativar</span>
            </button>
            )}
            
          </ButtonGroup>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default UpdateNeighbohood;
