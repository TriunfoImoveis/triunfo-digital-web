import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import {
  Container,
  InputGroup,
  ButtonGroup,
  UserSallersContainer,
  UserCaptivators,
  Directors,
} from './styles';
import deleteItem from '../../../utils/deleteItem';
import api from '../../../services/api';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeSale: 'new' | 'used';
}

interface ISallers {
  name: string;
}

interface IDirectores {
  id: string;
  name: string;
}

interface IOptions {
  id: string;
  name: string;
}

const Step3: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [realtors, setRealtors] = useState<IOptions[]>([]);
  const [cordinators, setCoordinators] = useState<IOptions[]>([]);
  const [directors, setDirectors] = useState<IDirectores[]>([]);
  const [user_directors, setUserDirectors] = useState([]);
  const [sallers, setSalers] = useState([{ name: 'id' }]);
  const [captavitors, setCaptvators] = useState([{ name: 'id' }]);
  const { updateFormData } = useForm();
  const { userAuth } = useAuth();

  const { city } = userAuth.subsidiary;
  useEffect(() => {
    const loadRealtos = async () => {
      const response = await api.get(`/users?city=${city}&office=Corretor`);
      setRealtors(response.data);
    };
    loadRealtos();
  }, [city]);
  useEffect(() => {
    const loadCoordinator = async () => {
      const response = await api.get(`/users?city=${city}&office=Coordenador`);
      setCoordinators(response.data);
    };
    loadCoordinator();
  }, [city]);

  useEffect(() => {
    const loadDirector = async () => {
      const response = await api.get(`/users?city=${city}&office=Diretor`);
      const directors = response.data.map(response => ({
        id: response.id,
      }));
      setUserDirectors(directors);
      setDirectors(response.data);
    };
    loadDirector();
  }, [city]);

  const setDirector = useCallback(() => {
    const D1 = directors.map(d => ({
      id: d.id,
      name: d.name,
    }));
    const direcs = D1.map(d => d.name).toString();
    return direcs;
  }, [directors]);

  const optionsRealtors = realtors.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));

  const optionsCoordenador = cordinators.map(coordinator => ({
    label: coordinator.name,
    value: coordinator.id,
  }));

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      formRef.current?.setFieldValue('user_director', user_directors);
      try {
        setLoading(true);
        if (typeSale === 'new') {
          const schema = Yup.object().shape({
            users_sellers: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().required('Vendedor Obrigatório'),
              }),
            ),
            user_coordinator: Yup.string().required('Coordenador Obrigatório'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        } else if (typeSale === 'used') {
          const schema = Yup.object().shape({
            users_sellers: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().required('Vendedor Obrigatório'),
              }),
            ),
            users_captivators: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().required('Captador Obrigatório'),
              }),
            ),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        }

        const newData = { ...data, users_directors: user_directors };
        updateFormData(newData);
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
    [nextStep, typeSale, updateFormData, user_directors],
  );

  const handleAddSallers = useCallback(() => {
    setSalers([...sallers, { name: 'id' }]);
  }, [sallers]);
  const handleAddCaptivators = useCallback(() => {
    setCaptvators([...captavitors, { name: 'id' }]);
  }, [captavitors]);

  const handleRemoveRealtors = useCallback((array: ISallers[], id: number) => {
    const newArray = deleteItem(array, id);
    setSalers(newArray);
  }, []);
  const handleRemoveCaptvators = useCallback(
    (array: ISallers[], id: number) => {
      const newArray = deleteItem(array, id);
      setCaptvators(newArray);
    },
    [],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {typeSale === 'new' && (
          <>
            {userAuth.office.name === 'Administrador'
              ? sallers.map((saller, index) =>
                  index > 0 ? (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Vendedor"
                      remove
                      removeRealtors={() =>
                        handleRemoveRealtors(sallers, index)
                      }
                    />
                  ) : (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Vendedor"
                      add
                      addRealtors={handleAddSallers}
                    />
                  ),
                )
              : sallers.map((saller, index) =>
                  index > 0 ? (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Vendedor"
                      remove
                      removeRealtors={() =>
                        handleRemoveRealtors(sallers, index)
                      }
                    />
                  ) : (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={[{ label: userAuth.name, value: userAuth.id }]}
                      nameLabel="Corretor Vendedor"
                      add
                      addRealtors={handleAddSallers}
                    />
                  ),
                )}
            <InputGroup>
              <Select
                name="user_coordinator"
                options={optionsCoordenador}
                nameLabel="Coordenador"
              />
              <Directors>
                <span>Diretores</span>
                <input defaultValue={setDirector()} readOnly />
              </Directors>
            </InputGroup>
          </>
        )}
        {typeSale === 'used' && (
          <>
            <InputGroup>
              <UserSallersContainer>
                {sallers.map((saller, index) =>
                  index > 0 ? (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Vendedor"
                      remove
                      removeRealtors={() =>
                        handleRemoveRealtors(captavitors, index)
                      }
                    />
                  ) : (
                    <Select
                      key={saller.name}
                      name={`users_sellers[${index}].${saller.name}`}
                      options={[{ label: userAuth.name, value: userAuth.id }]}
                      nameLabel="Corretor Vendedor"
                      add
                      addRealtors={handleAddSallers}
                    />
                  ),
                )}
              </UserSallersContainer>

              <UserCaptivators>
                {captavitors.map((cap, index) =>
                  index > 0 ? (
                    <Select
                      key={cap.name}
                      name={`users_captivators[${index}].${cap.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Captador"
                      remove
                      removeRealtors={() =>
                        handleRemoveCaptvators(captavitors, index)
                      }
                    />
                  ) : (
                    <Select
                      key={cap.name}
                      name={`users_captivators[${index}].${cap.name}`}
                      options={optionsRealtors}
                      nameLabel="Corretor Captador"
                      add
                      addRealtors={handleAddCaptivators}
                    />
                  ),
                )}
              </UserCaptivators>
            </InputGroup>
            <Directors>
              <span>Diretores</span>
              <input defaultValue={setDirector()} readOnly />
            </Directors>
          </>
        )}

        <ButtonGroup>
          <Button type="button" className="cancel" onClick={() => prevStep()}>
            Voltar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step3;
