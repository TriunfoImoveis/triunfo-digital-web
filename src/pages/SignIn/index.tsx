import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { LogoTriunfo } from '../../assets/images';
import { Container, Content, ForgotPassword } from './styles';
import Select from '../../components/Select';
import api from '../../services/api';

import theme from '../../styles/theme';

interface ISignData {
  email: string;
  password: string;
  office: string;
}

interface IOfficeData {
  id: string;
  name: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [officies, setOfficies] = useState<IOfficeData[]>([]);
  const { signIn } = useAuth();

  useEffect(() => {
    const loadOffices = async () => {
      const response = await api.get('/office');
      setOfficies(response.data);
    };
    loadOffices();
  }, []);

  const options = officies.map(office => ({
    value: office.id,
    label: office.name,
  }));

  const handleSubmit = useCallback(
    async (data: ISignData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória'),
          office: Yup.string().required('Cargo obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
          office: data.office,
        });
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
    [signIn],
  );
  return (
    <Container>
      <Content>
        <LogoTriunfo />
        <h1>Login</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            name="email"
            icon={FaUser}
            placeholder="email@exmplo.com"
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            icon={RiLockPasswordFill}
            placeholder="************"
          />

          <Select nameLabel="Cargo" name="office" options={options} />
          <Button type="submit" color={theme.colors.primary}>
            {loading ? (
              <Loader type="Bars" color={theme.colors.gold} height={30} width={30} />
            ) : (
              'ENTRAR'
            )}
          </Button>
        </Form>

        <ForgotPassword to="recuperar-senha">
          Esqueceu sua senha ? Clique aqui para recupera-la
        </ForgotPassword>
      </Content>
    </Container>
  );
};

export default SignIn;
