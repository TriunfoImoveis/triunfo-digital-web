import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';
import { Sync } from '../../../assets/images';
import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../ReactSelect';
import { optionsCivilStatus, optionsGenero } from '../../../utils/loadOptions';
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';

interface IPropertyProps {
  status: string;
  clientBuyer: {
    name: string;
    cpf: string;
    date_birth: string;
    phone: string;
    whatsapp: string;
    email: string;
    civil_status: string;
    gender: string;
    number_children: string;
  };
}

interface FormData {
  client_buyer: {
    name: string;
    cpf: string;
    date_birth: string;
    phone: string;
    whatsapp: string;
    email: string;
    civil_status: string;
    gender: string;
    number_children: string;
  };
}
const ClientBuyer: React.FC<IPropertyProps> = ({ clientBuyer, status }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>COMPRADOR</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <>
              <InputDisable label="Nome Completo" data={clientBuyer.name} />
              <InputGroup>
                <InputDisable label="CPF" data={clientBuyer.cpf} />
                <InputDisable
                  label="Data de Nascimento"
                  data={clientBuyer.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <InputDisable label="Telefone" data={clientBuyer.phone} />
                <InputDisable label="E-mail" data={clientBuyer.email} />
              </InputGroup>
              <InputGroup>
                <InputDisable
                  label="Estado Civíl"
                  data={clientBuyer.civil_status}
                />
                <InputDisable label="Gênero" data={clientBuyer.gender} />
                <InputDisable
                  label="Numero de Filhos"
                  data={clientBuyer.number_children}
                />
              </InputGroup>
            </>
          ) : (
            <>
              <Input
                label="Nome Completo"
                name="client_buyer.name"
                placeholder="Nome Completo"
                readOnly={edit}
                defaultValue={clientBuyer.name}
              />
              <InputGroup>
                <Input
                  label="CPF"
                  name="client_buyer.cpf"
                  placeholder="CPF"
                  readOnly={edit}
                  defaultValue={clientBuyer.cpf}
                />
                <Input
                  label="Data de Nascimento"
                  name="client_buyer.date_birth"
                  placeholder="Data de Nascimento"
                  readOnly={edit}
                  defaultValue={clientBuyer.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_buyer.phone"
                  placeholder="Telefone"
                  readOnly={edit}
                  defaultValue={clientBuyer.phone}
                />
                <Input
                  label="E-mail"
                  name="client_buyer.email"
                  type="email"
                  placeholder="E-mail"
                  readOnly={edit}
                  defaultValue={clientBuyer.email}
                />
              </InputGroup>
              <InputGroup>
                <Select
                  label="Estado Civíl"
                  name="client_buyer.civil_status"
                  options={optionsCivilStatus}
                  disabled={edit}
                  defaultInputValue={clientBuyer.civil_status}
                />
                <Select
                  label="Gênero"
                  name="client_buyer.gender"
                  options={optionsGenero}
                  disabled={edit}
                  defaultInputValue={clientBuyer.gender}
                />
                <Input
                  label="Numero de Filhos"
                  name="client_buyer.number_children"
                  placeholder="Número de filhos"
                  readOnly={edit}
                  defaultValue={clientBuyer.number_children}
                />
              </InputGroup>

              <ButtonGroup>
                <button type="submit">
                  <Sync />
                  <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                </button>
              </ButtonGroup>
            </>
          )}
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default ClientBuyer;
