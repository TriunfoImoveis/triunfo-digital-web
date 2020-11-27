import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
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

interface IOptions {
  id: string;
  name: string;
}

const Step3: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [realtors, setRealtors] = useState<IOptions[]>([]);
  const [cordinators, setCoordinators] = useState<IOptions[]>([]);
  const [directors, setDirectors] = useState<IOptions[]>([]);
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
      setDirectors(response.data);
    };
    loadDirector();
  }, [city]);

  const optionsRealtors = realtors.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));

  const optionsCoordenador = cordinators.map(coordinator => ({
    label: coordinator.name,
    value: coordinator.id,
  }));

  const optionsDirector = directors.map(director => ({
    label: director.name,
    value: director.id,
  }));

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
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
            user_director: Yup.string().required('Diretor Obrigatório'),
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
            user_director: Yup.string().required('Diretor Obrigatório'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        }

        updateFormData(data);
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
            {sallers.map((saller, index) =>
              index > 0 ? (
                <Select
                  name={`users_sellers[${index}].${saller.name}`}
                  options={optionsRealtors}
                  icon={IoMdArrowDropdown}
                  nameLabel="o Corretor Vendedor"
                  remove
                  removeRealtors={() => handleRemoveRealtors(sallers, index)}
                />
              ) : (
                <Select
                  name={`users_sellers[${index}].${saller.name}`}
                  options={[{ label: userAuth.name, value: userAuth.id }]}
                  icon={IoMdArrowDropdown}
                  nameLabel="o Corretor Vendedor"
                  add
                  addRealtors={handleAddSallers}
                />
              ),
            )}
            <InputGroup>
              <Select
                name="user_coordinator"
                options={optionsCoordenador}
                icon={IoMdArrowDropdown}
                nameLabel="o Coordenador"
              />
              <Select
                name="user_director"
                options={optionsDirector}
                icon={IoMdArrowDropdown}
                nameLabel="o diretor"
              />
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
                      name={`users_sellers[${index}].${saller.name}`}
                      options={optionsRealtors}
                      icon={IoMdArrowDropdown}
                      nameLabel="o Corretor Vendedor"
                      remove
                      removeRealtors={() =>
                        handleRemoveRealtors(captavitors, index)
                      }
                    />
                  ) : (
                    <Select
                      name={`users_sellers[${index}].${saller.name}`}
                      options={[{ label: userAuth.name, value: userAuth.id }]}
                      icon={IoMdArrowDropdown}
                      nameLabel="o Corretor Vendedor"
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
                      name={`users_captivators[${index}].${cap.name}`}
                      options={optionsRealtors}
                      icon={IoMdArrowDropdown}
                      nameLabel="o Corretor Captador"
                      remove
                      removeRealtors={() =>
                        handleRemoveCaptvators(captavitors, index)
                      }
                    />
                  ) : (
                    <Select
                      name={`users_captivators[${index}].${cap.name}`}
                      options={optionsRealtors}
                      icon={IoMdArrowDropdown}
                      nameLabel="o Corretor Captador"
                      add
                      addRealtors={handleAddCaptivators}
                    />
                  ),
                )}
              </UserCaptivators>
            </InputGroup>
            <Select
              name="user_director"
              options={optionsDirector}
              icon={IoMdArrowDropdown}
              nameLabel="o diretor"
            />
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
