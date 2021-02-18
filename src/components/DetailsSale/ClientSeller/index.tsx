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
  clientSeller: {
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
  client_seller: {
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
const ClientSeller: React.FC<IPropertyProps> = ({ clientSeller, status }) => {
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
            <legend>VENDEDOR</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <>
              <InputDisable label="Nome Completo" data={clientSeller.name} />
              <InputGroup>
                <InputDisable label="CPF" data={clientSeller.cpf} />
                <InputDisable
                  label="Data de Nascimento"
                  data={clientSeller.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <InputDisable label="Telefone" data={clientSeller.phone} />
                <InputDisable label="E-mail" data={clientSeller.email} />
              </InputGroup>
              <InputGroup>
                <InputDisable
                  label="Estado Civíl"
                  data={clientSeller.civil_status}
                />
                <InputDisable label="Gênero" data={clientSeller.gender} />
                <InputDisable
                  label="Numero de Filhos"
                  data={clientSeller.number_children}
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
                defaultValue={clientSeller.name}
              />
              <InputGroup>
                <Input
                  label="CPF"
                  name="client_buyer.cpf"
                  placeholder="CPF"
                  readOnly={edit}
                  defaultValue={clientSeller.cpf}
                />
                <Input
                  label="Data de Nascimento"
                  name="client_buyer.date_birth"
                  placeholder="Data de Nascimento"
                  readOnly={edit}
                  defaultValue={clientSeller.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_buyer.phone"
                  placeholder="Telefone"
                  readOnly={edit}
                  defaultValue={clientSeller.phone}
                />
                <Input
                  label="E-mail"
                  name="client_buyer.email"
                  type="email"
                  placeholder="E-mail"
                  readOnly={edit}
                  defaultValue={clientSeller.email}
                />
              </InputGroup>
              <InputGroup>
                <Select
                  label="Estado Civíl"
                  name="client_buyer.civil_status"
                  options={optionsCivilStatus}
                  disabled={edit}
                  defaultInputValue={clientSeller.civil_status}
                />
                <Select
                  label="Gênero"
                  name="client_buyer.gender"
                  options={optionsGenero}
                  disabled={edit}
                  defaultInputValue={clientSeller.gender}
                />
                <Input
                  label="Numero de Filhos"
                  name="client_buyer.number_children"
                  placeholder="Número de filhos"
                  readOnly={edit}
                  defaultValue={clientSeller.number_children}
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

export default ClientSeller;
