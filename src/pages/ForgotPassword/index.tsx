import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FaUser } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content, ForgotDescrption } from './styles';
import api from '../../services/api';

interface ISignData {
  email: string;
  password: string;
  office: string;
}

interface IOfficeData {
  id: string;
  name: string;
}
const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);

  const handleSubmit = useCallback(async (data: ISignData) => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/password/forgot', data);
      toast.success(
        'E-mail, enviado com sucesso, verifique sua caixa de entrada',
      );
      setLoading(false);
      setSucess(true);
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
      setSucess(false);
    }
  }, []);
  return (
    <Container>
      <Content>
        <Logo />
        <h1>Envio de e-mail</h1>
        {sucess ? (
          <ForgotDescrption>
            <p>
              Um e-mail com o link para recuperar a senha foi enviado ao seu
              email, por favor verifique a caixa de entrada!
            </p>
          </ForgotDescrption>
        ) : (
          <>
            <ForgotDescrption>
              <p>
                Informe o seu email de login, que enviaremos um link para você
                recuperar a sua senha
              </p>
            </ForgotDescrption>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                type="email" autoComplete="off"
                name="email"
                icon={FaUser}
                placeholder="email@exmplo.com"
              />
              <Button type="submit">
                {loading ? (
                  <Loader type="Bars" color="#fff" height={30} width={30} />
                ) : (
                  'Enviar'
                )}
              </Button>
            </Form>
          </>
        )}
      </Content>
    </Container>
  );
};

export default ForgotPassword;
