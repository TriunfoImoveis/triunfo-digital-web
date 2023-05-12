import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';

import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import InputDisable from '../../InputDisabled';
import Select from '../../ReactSelect';

import api from '../../../services/api';

import { Sync } from '../../../assets/images';

import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';


interface IRealtorsProps {
  status: string;
  saleType: string;
  sallers: {
    id: string;
    name: string;
  }[];
  captvators?: {
    id: string;
    name: string;
  }[];
  coordinator?: {
    id: string;
    name: string;
  };
  directors: {
    id: string;
    name: string;
  }[];
}

interface IRealtos {
  id: string;
  name: string;
  office: {
    name: string;
  };
}

interface IParams {
  id: string;
}

interface FormData {
  users_sellers: [];
  users_captivators: [];
}

const Realtors: React.FC<IRealtorsProps> = ({
  status,
  saleType,
  sallers,
  captvators,
  coordinator,
  directors,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allRealtors, setAllRealtors] = useState<IRealtos[]>([]);
  const { id } = useParams<IParams>();
  const history = useHistory();

  useEffect(() => {
    const loadAllRealtors = async () => {
      const response = await api.get('/users?departament=Comercial');
      setAllRealtors(response.data);
    };
    loadAllRealtors();
  }, []);

  const realtors = allRealtors?.filter(
    realtor => realtor.office?.name === 'Corretor',
  );

  const optionsRealtors = realtors?.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));
  const coordinators = allRealtors?.filter(
    realtor => realtor.office?.name === 'Coordenador',
  );

  const optionsCoordinators = coordinators?.map(coordinator => ({
    label: coordinator?.name,
    value: coordinator?.id,
  }));
  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { users_sellers, users_captivators } = data;

      let formData = {};
      formRef.current?.setErrors({});

      if (users_sellers) {
        const newUsersSellers = users_sellers?.map((saller: any) => ({
          id: saller,
        }));
        formData = {
          ...data,
          users_sellers: newUsersSellers,
        };
      }
      if (users_captivators) {
        const newUsersSellers = users_sellers?.map((saller: any) => ({
          id: saller,
        }));
        const newUsersCap = users_captivators?.map((cap: any) => ({
          id: cap,
        }));
        formData = {
          ...data,
          users_sellers: newUsersSellers,
          users_captivators: newUsersCap,
        };
      }

      try {
        setLoading(true);
        if (saleType === 'NOVO') {
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
        } else if (saleType === 'USADO') {
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
        await api.put(`/sale/${id}`, formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              '@TriunfoDigital:token',
            )}`,
          },
        });

        toast.success('Dados da Venda atualizadas!');
        history.push('/adm/lista-vendas');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }
        toast.error('ERROR!, verifique as informações e tente novamente');
      } finally {
        setLoading(false);
      }
    },
    [saleType, id, history],
  );
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      {saleType === 'NOVO' ? (
        <SaleData>
          <fieldset className="login">
            <Legend>
              <legend>CORRETORES</legend>
              {status !== 'CAIU' ? (
                <button type="button" onClick={() => setEdit(!edit)}>
                  <BiEditAlt size={20} color={theme.colors.primary} />
                  <span>editar</span>
                </button>
              ) : null}
            </Legend>

            {edit ? (
              sallers?.map((saller, index) => (
                <InputDisable
                  key={saller.name}
                  label={
                    sallers.length === 1
                      ? 'Corretor Vendedor'
                      : `Vendedor ${index + 1}`
                  }
                  data={saller.name}
                />
              ))
            ) : (
              <Select
                label="Coretor(es) vendedor(es)"
                name="users_sellers"
                placeholder="Corretor(es)"
                options={optionsRealtors}
                disabled={edit}
                isMulti
              />
            )}
            {edit  ?
              (coordinator && (
                <InputDisable label="Coordenador" data={coordinator.name} />
              )): (
                <Select
                  name="user_coordinator"
                  label="Coordenador"
                  options={optionsCoordinators}
                  placeholder="Coordenador"
                />
              )}
            <InputGroup>
              {directors?.map(director => (
                <InputDisable
                  key={director.name}
                  label="Diretor"
                  data={director.name}
                />
              ))}
            </InputGroup>
            {!edit && (
              <ButtonGroup>
                <button type="submit">
                  <Sync />
                  <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                </button>
              </ButtonGroup>
            )}
          </fieldset>
        </SaleData>
      ) : (
        <SaleData>
          <fieldset className="login">
            <Legend>
              <legend>CORRETORES</legend>
              {status !== 'CAIU' ? (
                <button type="button" onClick={() => setEdit(!edit)}>
                  <BiEditAlt size={20} color={theme.colors.primary} />
                  <span>editar</span>
                </button>
              ) : null}
            </Legend>

            {edit ? (
              sallers?.map((saller, index) => (
                <InputDisable
                  key={saller.name}
                  label={
                    sallers.length === 1
                      ? 'Corretor Vendedor'
                      : `Vendedor ${index + 1}`
                  }
                  data={saller.name}
                />
              ))
            ) : (
              <Select
                label="Coretor(es) vendedor(es)"
                name="users_sellers"
                placeholder="Corretor(es)"
                options={optionsRealtors}
                disabled={edit}
                isMulti
              />
            )}
            {edit ? (
              captvators?.map((captvator, index) => (
                <InputDisable
                  key={captvator.name}
                  label={
                    captvators?.length === 1
                      ? 'Corretor Captador'
                      : `Vendedor ${index + 1}`
                  }
                  data={captvator.name}
                />
              ))
            ) : (
              <Select
                label="Coretor(es) Captador(es)"
                name="users_captivators"
                placeholder="Corretor(es)"
                options={optionsRealtors}
                disabled={edit}
                isMulti
              />
            )}
            {edit ?
              (coordinator && (
                <InputDisable label="Coordenador" data={coordinator.name} />
              )):  (
                <Select
                  name="user_coordinator"
                  label="Coordenador"
                  options={optionsCoordinators}
                  placeholder="Coordenador"
                />
              )}
            <InputGroup>
              {directors?.map(director => (
                <InputDisable
                  key={director.name}
                  label="Diretor"
                  data={director.name}
                />
              ))}
            </InputGroup>
            <ButtonGroup>
              <button
                type="button"
                onClick={() => formRef.current?.submitForm()}
              >
                <Sync />
                <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
              </button>
            </ButtonGroup>
          </fieldset>
        </SaleData>
      )}
    </Form>
  );
};

export default Realtors;
