import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import InputForm from '../../Input';
import { Sync } from '../../../assets/images';

import { LogonInfo, FormContent, Input } from './styles';

interface FormData {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const UserUpdate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const formProfileRef = useRef<FormHandles>(null);
  const { userAuth, upadatedUser } = useAuth();

  const handleSubmitProfile: SubmitHandler<FormData> = async data => {
    try {
      formProfileRef.current?.setErrors({});
      setLoading(true);
      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido'),
        oldPassword: Yup.string()
          .min(6, 'senha tem que no mínimo 6 digitos')
          .max(6, 'senha tem que no máximo de 6 digitos'),
        newPassword: Yup.string().when('oldPassword', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        confirmNewPassword: Yup.string()
          .when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('newPassword'), undefined], 'Senhas não conferem'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, oldPassword, newPassword, confirmNewPassword } = data;
      const formData = {
        email,
        ...(oldPassword
          ? { password: newPassword, password_confirmation: confirmNewPassword }
          : {}),
      };
      const response = await api.put(`/users/${userAuth.id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      upadatedUser(response.data);
      setLoading(false);
      toast.success('Dados atualizados');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formProfileRef.current?.setErrors(erros);
      }
      toast.error('Erro ao atualizar');
      setLoading(false);
      toast.error(err);
    }
  };

  return (
    <LogonInfo>
      <h2>Atualização de dados</h2>
      <Form ref={formProfileRef} onSubmit={handleSubmitProfile}>
        <FormContent>
          <Input>
            <InputForm
              label="Email"
              name="email"
              defaultValue={userAuth.email}
            />
          </Input>
          <Input>
            <InputForm
              label="Senha Antiga"
              name="oldPassword"
              type="password"
            />
          </Input>
          <Input>
            <InputForm label="Nova Senha" name="newPassword" type="password" />
          </Input>
          <Input>
            <InputForm
              label="Repetetir Nova Senha"
              name="confirmNewPassword"
              type="password"
            />
          </Input>
        </FormContent>
        <button type="submit">
          {loading ? (
            <Loader type="Bars" color="#C32925" height={30} width={30} />
          ) : (
            <>
              <span>Atualizar</span>
              <Sync />
            </>
          )}
        </button>
      </Form>
    </LogonInfo>
  );
};

export default UserUpdate;
