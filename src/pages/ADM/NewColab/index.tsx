import React, { useRef, useCallback } from 'react';
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

const NewColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(() => {
    console.log('ok');
  }, []);
  return (
    <AdmLayout>
      <Container>
        <h1>NOVO COLABORADOR</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DE LOGIN</legend>
              <Input name="name" placeholder="Nome Completo" />
              <Input name="email" type="email" placeholder="E-mail" />
              <Input name="password" type="password" placeholder="Senha" />
              <Input
                name="confirmed_password"
                type="password"
                placeholder="Confirma Senha"
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
                <Input name="phone" placeholder="Telefone" mask="fone" />
                <Input
                  name="goal"
                  placeholder="Meta de Venda"
                  mask="currency"
                />
              </InputGroup>
              <InputGroup>
                <Input name="department" placeholder="Departamento" />
                <Input name="office" placeholder="Cargo" />
              </InputGroup>
              <InputGroup>
                <Input name="subsidiary" placeholder="Filial" />
                <Input name="admission_date" placeholder="Data de Admissão" />
              </InputGroup>
            </fieldset>
          </AdmissionsInfo>

          <ButtonGroup>
            <button type="button">Atualizar</button>
            <button type="button">Remover</button>
          </ButtonGroup>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default NewColab;
