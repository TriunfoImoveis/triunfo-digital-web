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
import theme from '../../../styles/theme';

import { LogonInfo, FormContent, Input } from './styles';
import { FoneMask, money } from '../../../utils/masked';
import { unMaked, currency } from '../../../utils/unMasked';

interface FormData {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  phone?: string;
  goal?: string;
  creci?: string;
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
        oldPassword: Yup.string(),
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
      }).notRequired();

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, oldPassword, newPassword, confirmNewPassword, phone, goal, creci } = data;
      const formData = {
        email,
        phone: phone && unMaked(phone),
        goal: goal && currency(goal),
        creci,
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
      <h2>Atualização de dados pessoais</h2>
      <Form ref={formProfileRef} onSubmit={handleSubmitProfile} initialData={{
        email: userAuth.email,
        phone: FoneMask(userAuth.phone),
        goal: money(Number(userAuth.goal)),
        creci: userAuth?.creci,
      }}>
        <FormContent>
          <Input>
            <InputForm
              label="Email"
              name="email"
            />
          </Input>
          <Input>
            <InputForm
              label="Senha Antiga"
              name="oldPassword"
              type="password" autoComplete="off"
            />
          </Input>
          <Input>
            <InputForm label="Nova Senha" name="newPassword" type="password" autoComplete="off" />
          </Input>
          <Input>
            <InputForm
              label="Repetetir Nova Senha"
              name="confirmNewPassword"
              type="password" autoComplete="off"
            />
          </Input>
          <Input>
            <InputForm
              label="Telefone"
              name="phone"
              type="tel"
            />
          </Input>
          <Input>
            <InputForm
              label="Meta de VGV (Anual)"
              name="goal"
              type="Text"
              mask='fone'
            />
          </Input>
          <Input>
            <InputForm
              label="CRECI"
              name="creci"
              type="text"
              maxLength={6}
            />
          </Input>
        </FormContent>
        <button type="submit">
          {loading ? (
            <Loader type="Bars" color={theme.colors.primary} height={30} width={30} />
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
