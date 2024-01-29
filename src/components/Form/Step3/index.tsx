import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
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
  Coordinator
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

interface ISubsidiaries {
  id: string;
  name: string;
}

const Step3: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [allRealtors, setAllRealtors] = useState<IOptions[]>([]);
  const [cordinators, setCoordinators] = useState<IOptions[]>([]);
  const [directors, setDirectors] = useState<IDirectores[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiaries[]>([]);
  const [isCoordinatorExist, setIsCoordinatorExist] = useState(true);

  const { updateFormData } = useForm();

  useEffect(() => {
    const loadAllOptions = async () => {
      const [
        responseRealtors,
        responseCoordinators,
        responseDirectors,
        responseSubsidiary
      ] = await Promise.all([
        api.get(`/users?departament=Comercial`),
        api.get(`/users?office=Coordenador`),
        api.get(`/users?office=Diretor`),
        api.get(`/subsidiary`)
      ])
      setAllRealtors(responseRealtors.data);
      setCoordinators(responseCoordinators.data);
      setDirectors(responseDirectors.data)
      setSubsidiaries(responseSubsidiary.data)
    };
    loadAllOptions();
  }, []);

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

  const optionsAllDirectores = directors.map(director => {
    return {
      label: director.name,
      value: director.id
    }
  })
  const optionsSubsidiaries = subsidiaries.map(subsidiary => {
    return {
      label: subsidiary.name,
      value: subsidiary.id
    }
  })

  const handleNotCoordinator = () => {
    setIsCoordinatorExist(!isCoordinatorExist);
  };

  const handleSubmit = useCallback(
    async data => {
      const { users_sellers, users_captivators, users_directors } = data;
      console.log(data)
      let formData = {};
      formRef.current?.setErrors({});
      const newDirectors = users_directors.map((director: any) => ({
        id: director,
      }));
      const newUsersSellers = users_sellers.map((saller: any) => ({
        id: saller,
      }));
      if (users_captivators) {
        const newUsersCap = users_captivators.map((cap: any) => ({
          id: cap,
        }));
        formData = {
          users_captivators: newUsersCap,
        };
      }

      formData = {
        ...data,
        ...formData,
        users_sellers: newUsersSellers,
        users_directors: newDirectors
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
            users_directors: Yup.array()
              .of(
                Yup.object().shape({
                  id: Yup.string().required('Diretor Obrigatório'),
                }),
              ).max(2, 'No máximo dois diretores')
              .required('Diretor(es) Obrigatório'),
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
            users_directors: Yup.array()
              .of(
                Yup.object().shape({
                  id: Yup.string().required('Diretor Obrigatório'),
                }),
              ).max(2, 'No máximo dois diretores')
              .required('Diretor(es) Obrigatório'),
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
    [nextStep, typeSale, updateFormData],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select
          name="subsidiary"
          options={optionsSubsidiaries}
          label="Filial da Venda"
          placeholder="Filial Maranhão"
        />
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
              <Select
                name="users_directors"
                placeholder="Selecione os diretores"
                options={optionsAllDirectores}
                label="Diretor(es)"
                isMulti
              />
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
            </>
            <Directors>
              <Select
                name="users_directors"
                placeholder="Selecione os diretores"
                options={optionsAllDirectores}
                label="Diretores"
                isMulti
              />
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
