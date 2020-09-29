import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';
import Select from '../../components/Select';

interface ISignData {
  email: string;
  password: string;
  office: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const options = [
    { value: 'b57e7fd8-3d35-4aa1-a117-5a0d2aa829cf', label: 'Marketing' },
    { value: '0a78703f-872f-4c95-8885-3596e9dc0bf0', label: 'Corretor' },
    { value: '55112da1-48a6-48be-af51-27e6cf24c97f', label: 'MQL' },
  ];

  const handleSubmit = useCallback(
    async (data: ISignData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        console.log('------');
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
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
        toast.error('ERROR!, verifique suas credenciais');
        setLoading(false);
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
    },
    [signIn, loading],
  );
  return (
    <Container>
      <Content>
        <Logo />
        <h1>Login</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type="email" name="email" icon={FaUser} placeholder="E-mail" />
          <Input
            type="password"
            name="password"
            icon={RiLockPasswordFill}
            placeholder="Senha"
          />

          <Select name="office" options={options} icon={IoMdArrowDropdown} />
          <Button type="submit">
            {loading ? (
              <Loader type="Bars" color="#fff" height={30} width={30} />
            ) : (
              'ENTRAR'
            )}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
