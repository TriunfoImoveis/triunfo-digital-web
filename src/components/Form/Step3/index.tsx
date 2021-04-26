import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../ReactSelect';
import Button from '../../Button';

import {
  Container,
  InputGroup,
  ButtonGroup,
  UserSallersContainer,
  UserCaptivators,
  Directors,
  Coordinator,
} from './styles';
import api from '../../../services/api';
import InputDisabled from '../../InputDisabled';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeSale: 'new' | 'used';
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
  const [allRealtors, setAllRealtors] = useState<IOptions[]>([]);
  const [cordinators, setCoordinators] = useState<IOptions[]>([]);
  const [directors, setDirectors] = useState<IDirectores[]>([]);
  const [user_directors, setUserDirectors] = useState([]);
  const [isCoordinatorExist, setIsCoordinatorExist] = useState(true);

  const { updateFormData } = useForm();
  const { userAuth } = useAuth();

  const { city } = userAuth.subsidiary;
  useEffect(() => {
    const loadAllRealtors = async () => {
      const response = await api.get(`/users?departament=Comercial`);
      setAllRealtors(response.data);
    };
    loadAllRealtors();
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
      const directors = response.data.map((response: any) => ({
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

  const optionsCoordenador = cordinators.map(coordinator => ({
    label: coordinator.name,
    value: coordinator.id,
  }));

  const optionsCaptvators = allRealtors.map(cap => ({
    label: cap.name,
    value: cap.id,
  }));
  const optionsAllRealtors = allRealtors.map(all => ({
    label: all.name,
    value: all.id,
  }));

  const handleNotCoordinator = () => {
    setIsCoordinatorExist(!isCoordinatorExist);
  };

  const handleSubmit = useCallback(
    async data => {
      const { users_sellers, users_captivators } = data;
      let formData = {};
      formRef.current?.setErrors({});
      formRef.current?.setFieldValue('user_director', user_directors);
      if (users_sellers) {
        const newUsersSellers = users_sellers.map((saller: any) => ({
          id: saller,
        }));
        formData = {
          ...data,
          users_sellers: newUsersSellers,
          users_directors: user_directors,
        };
      }
      if (users_captivators) {
        const newUsersSellers = users_sellers.map((saller: any) => ({
          id: saller,
        }));
        const newUsersCap = users_captivators.map((cap: any) => ({
          id: cap,
        }));
        formData = {
          ...data,
          users_sellers: newUsersSellers,
          users_captivators: newUsersCap,
          users_directors: user_directors,
        };
      }

      try {
        setLoading(true);
        if (typeSale === 'new') {
          const schema = Yup.object().shape({
            users_sellers: Yup.array()
              .of(
                Yup.object().shape({
                  id: Yup.string().required('Vendedor Obrigatório'),
                }),
              )
              .required('Vendedor(es) Obrigatório'),
            user_coordinator: Yup.string(),
          });
          await schema.validate(formData, {
            abortEarly: false,
          });
        } else if (typeSale === 'used') {
          const schema = Yup.object().shape({
            users_sellers: Yup.array()
              .of(
                Yup.object().shape({
                  id: Yup.string().required('Vendedor Obrigatório'),
                }),
              )
              .required('Vendedor Obrigatório'),
            users_captivators: Yup.array()
              .of(
                Yup.object().shape({
                  id: Yup.string().required('Captador Obrigatório'),
                }),
              )
              .required('Captador Obrigatório'),
          });
          await schema.validate(formData, {
            abortEarly: false,
          });
        }
        updateFormData(formData);
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
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {typeSale === 'new' && (
          <>
            <Select
              name="users_sellers"
              options={optionsAllRealtors}
              label="Corretor Vendedor"
              placeholder="Infome o corretor(es)"
              isMulti
            />
            <Coordinator>
              {isCoordinatorExist ? (
                <Select
                  name="user_coordinator"
                  placeholder="Selecione o coordernador"
                  options={optionsCoordenador}
                  label="Coordenador"
                />
              ) : (
                <InputDisabled label="Coordenador" data="Nenhum" />
              )}

              <div className="not-coordinator">
                <input
                  type="checkbox"
                  name="not-coordinators"
                  id="not-coordinators"
                  onChange={handleNotCoordinator}
                />
                <label htmlFor="not-coordinators">Não Possuí Coordenação</label>
              </div>
            </Coordinator>
            <Directors>
              <span>Diretores</span>
              <input defaultValue={setDirector()} readOnly />
            </Directors>
          </>
        )}
        {typeSale === 'used' && (
          <>
            <InputGroup>
              <UserSallersContainer>
                <Select
                  name="users_sellers"
                  options={optionsAllRealtors}
                  label="Corretor Vendedor"
                  placeholder="Infome o corretor(es)"
                  isMulti
                />
              </UserSallersContainer>

              <UserCaptivators>
                <Select
                  name="users_captivators"
                  options={optionsCaptvators}
                  label="Corretor Captador"
                  isMulti
                  placeholder="Informe o(s) Captador(es)"
                />
              </UserCaptivators>
            </InputGroup>
            {userAuth.subsidiary.city === 'Teresina' ? (
              <>
                <Coordinator>
                  {isCoordinatorExist ? (
                    <Select
                      name="user_coordinator"
                      placeholder="Selecione o coordernador"
                      options={optionsCoordenador}
                      label="Coordenador"
                    />
                  ) : (
                    <InputDisabled label="Coordenador" data="Nenhum" />
                  )}

                  <div className="not-coordinator">
                    <input
                      type="checkbox"
                      name="not-coordinators"
                      id="not-coordinators"
                      onChange={handleNotCoordinator}
                    />
                    <label htmlFor="not-coordinators">
                      Não Possuí Coordenação
                    </label>
                  </div>
                </Coordinator>
                <Directors>
                  <span>Diretores</span>
                  <input defaultValue={setDirector()} readOnly />
                </Directors>
              </>
            ) : (
              <Directors>
                <span>Diretores</span>
                <input defaultValue={setDirector()} readOnly />
              </Directors>
            )}
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
