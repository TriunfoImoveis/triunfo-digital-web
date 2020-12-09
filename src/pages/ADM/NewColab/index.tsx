import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import {
  Container,
  InfoLogin,
  Avatar,
  AdmissionsInfo,
  InputGroup,
  ButtonGroup,
} from './styles';
import { Sync, Garb } from '../../../assets/images';

interface IRoteparams {
  id: string;
}

const NewColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [pageDetails, setPageDetails] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log('ok');
  }, []);

  const { id } = useParams<IRoteparams>();

  useEffect(() => {
    if (id) {
      setPageDetails(true);
    }
  }, [id]);
  return (
    <AdmLayout>
      <Container>
        <h1>NOVO COLABORADOR</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DE LOGIN</legend>
              <Input label="Nome Completo" name="name" />
              <Input label="E-mail" name="email" type="email" />
              <Input label="Senha" name="password" type="password" />
              <Input
                label="Confirmar Senha"
                name="confirmed_password"
                type="password"
              />
            </fieldset>
            <Avatar>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
              <button type="button">Adicionar foto</button>
            </Avatar>
          </InfoLogin>
          <AdmissionsInfo>
            <fieldset className="login">
              <legend>INFORMAÇÕES ADMISSIONAIS</legend>
              <InputGroup>
                <Input label="Telefone" name="phone" mask="fone" />
                <Input label="Meta de Venda" name="goal" mask="currency" />
              </InputGroup>
              <InputGroup>
                <Input label="Filial" name="subsidiary" />
                <Input label="Departamento" name="department" />
              </InputGroup>
              <InputGroup>
                <Input label="Cargo" name="office" placeholder="Cargo" />
                <Input label="Data de Admissão" name="admission_date" />
              </InputGroup>
            </fieldset>
          </AdmissionsInfo>

          {pageDetails && (
            <ButtonGroup>
              <button type="button">
                <Sync />
                <span>Atualizar</span>
              </button>
              <button type="button">
                <Garb />
                <span>Remover</span>
              </button>
            </ButtonGroup>
          )}

          <button type="submit" className="submit">
            Cadastrar Colaborador
          </button>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default NewColab;
