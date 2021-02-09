import React, { useEffect, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';

import InputDisable from '../../InputDisabled';
import Select from '../../ReactSelect';

import api from '../../../services/api';

import { SaleData, Legend, InputGroup } from '../styles';

interface IRealtorsProps {
  status: string;
  saleType: string;
  sallers: {
    id: string;
    name: string;
  }[];
  captvators: {
    id: string;
    name: string;
  }[];
  coordinator: {
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
  const [allRealtors, setAllRealtors] = useState<IRealtos[]>([]);

  useEffect(() => {
    const loadAllRealtors = async () => {
      const response = await api.get('/users?departament=Comercial');
      setAllRealtors(response.data);
    };
    loadAllRealtors();
  }, []);

  const realtors = allRealtors.filter(
    realtor => realtor.office?.name === 'Corretor',
  );

  const optionsRealtors = realtors.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));
  const coordinators = allRealtors.filter(
    realtor => realtor.office?.name === 'Coordenador',
  );

  const optionsCoordinators = coordinators.map(coordinator => ({
    label: coordinator.name,
    value: coordinator.id,
  }));
  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
  };
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>CORRETORES</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            sallers.map((saller, index) => (
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
          {saleType === 'USADO' && edit ? (
            captvators &&
            captvators.map((cap, index) => (
              <InputDisable
                key={cap.name}
                label={
                  captvators.length === 1
                    ? 'Corretor Vendedor'
                    : `Vendedor ${index + 1}`
                }
                data={cap.name}
              />
            ))
          ) : (
            <Select
              label="Coretor(es) Captador(es)"
              name="users_cap"
              placeholder="Corretor(es)"
              options={optionsRealtors}
              disabled={edit}
              isMulti
            />
          )}
          {coordinator &&
            (edit ? (
              <InputDisable label="Coordenador" data={coordinator.name} />
            ) : (
              <Select
                name="user_coordinator"
                label="Coordenador"
                options={optionsCoordinators}
                placeholder="Coordenador"
              />
            ))}
          <InputGroup>
            {directors.map(director => (
              <InputDisable
                key={director.name}
                label="Diretor"
                data={director.name}
              />
            ))}
          </InputGroup>
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default Realtors;
