import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { RiLockPasswordFill } from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { useHistory, useParams } from 'react-router-dom';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';
import api from '../../services/api';

interface ISignData {
  email: string;
  password: string;
  office: string;
}

interface IParams {
  id: string;
}
const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<IParams>();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ISignData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          new_password: Yup.string()
            .min(6, 'A senha deve conter no mínimo 6 digitos')
            .max(15, 'A pode ser de ate no máximo 15 digítos')
            .required('Senha Obrigatória'),
          password_confirmation: Yup.string()
            .when('new_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('new_password'), undefined], 'Senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post(`/password/reset/${id}`, data);
        toast.success('Senha redefinida com sucesso');
        history.push('/');
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }
        if (err.response) {
          toast.error(`ERROR! ${err.response.data.message}`);
        } else if (err.request) {
          toast.error(
            `ERROR! Falha ao connectar ao servidor! Entre em contato com o suporte.`,
          );
        }

        setLoading(false);
      }
    },
    [id, history],
  );
  return (
    <Container>
      <Content>
        <Logo />
        <h1>Login</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Nova senha"
            type="password"
            name="new_password"
            icon={RiLockPasswordFill}
            placeholder="************"
          />
          <Input
            label="Repita a nova senha"
            type="password"
            name="password_confirmation"
            icon={RiLockPasswordFill}
            placeholder="************"
          />

          <Button type="submit">
            {loading ? (
              <Loader type="Bars" color="#fff" height={30} width={30} />
            ) : (
              'Redefinir'
            )}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ResetPassword;
