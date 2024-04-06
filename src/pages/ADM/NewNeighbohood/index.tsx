import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin } from './styles';
import api from '../../../services/api';
import Select from '../../../components/Select';
import getValidationErros from '../../../utils/getValidationErros';

import axios from 'axios';
import { states } from '../../../utils/loadOptions';

interface ICity {
  name: string
}

interface IBGECityResponse {
  nome: string;
}

const NewNeighbohood: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [cities, setcities] = useState<ICity[]>([])
  const [selectedUf, setSelectedUf] = useState('0');
  const history = useHistory();

  const getCities = async (selectedUf: string) => {
    if (selectedUf === '0') return;

    const response = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    const cities = response.data.map(item => ({ name: item.nome }))
    setcities(cities)
  }

  useEffect(() => {
    getCities(selectedUf)
  }, [selectedUf])


  const optionsState = Object.keys(states).map((key) => ({
    value: key,
    label: states[key],
  }));



  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);

    },
    [],
  );
  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do bairro obrigatório'),
        uf: Yup.string().required('Estado obrigatório'),
        city: Yup.string().required('Cidade obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const paylaod = {
        ...data,
      }
      const response = await api.post('/neighborhood', paylaod);

      if (response.status === 201) {
        toast.success('Bairro com sucesso');
        history.push('/adm/lista-bairros');
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
  }, [history]);

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DO BAIRRO</legend>
              <Input
                label="Nome"
                name="name"
                placeholder="Nome do bairro"
              />
              <Select
                name="uf"
                nameLabel="Estado"
                options={optionsState}
                defaultValue={selectedUf}
                onChange={handleSelectedUF}
              />
              <Select
                name="city"
                nameLabel="Cidade"
                defaultValue={"0"}
                options={optionsCities}
              />
            </fieldset>
          </InfoLogin>
          <button type="submit" className="submit">
            {loading ? 'Aguarde' : 'Cadastrar Novo Bairro'}
          </button>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default NewNeighbohood;
