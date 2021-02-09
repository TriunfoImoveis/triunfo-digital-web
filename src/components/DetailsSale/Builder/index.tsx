import React, { useEffect, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';

import InputDisable from '../../InputDisabled';
import Select from '../../ReactSelect';

import api from '../../../services/api';

import { SaleData, Legend } from '../styles';

interface IBuilderProps {
  status: string;
  builder: {
    id: string;
    name: string;
  };
  uf: string;
}

interface IBuilder {
  id: string;
  name: string;
}

interface FormData {
  builder: string;
}

const Builder: React.FC<IBuilderProps> = ({ builder, status, uf }) => {
  const formRef = useRef<FormHandles>(null);
  const [edit, setEdit] = useState(true);
  const [builders, setBuilders] = useState<IBuilder[]>([]);

  useEffect(() => {
    const loadBuilder = async () => {
      const response = await api.get(`/builder?uf=${uf}`);
      setBuilders(response.data);
    };
    loadBuilder();
  }, [uf]);
  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
  };

  const optionsBuilders = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  }));
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>CONSTRUTORA</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <InputDisable label="" data={builder?.name} />
          ) : (
            <Select name="builder" options={optionsBuilders} />
          )}
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default Builder;
