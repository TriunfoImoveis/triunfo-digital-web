import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { useAuth } from '../../context/AuthContext';
import InputForm from '../../components/Input';

import { LogoHeader, Camera, Sync } from '../../assets/images';
import api from '../../services/api';
import {
  Container,
  Header,
  NavBarContainer,
  NavItemContent,
  Content,
  ProfileContainer,
  BasicInfo,
  Avatar,
  InforUser,
  InfoItem,
  InfoGroup,
  Separator,
  LogonInfo,
  FormContent,
  Input,
} from './styles';
import getValidationErros from '../../utils/getValidationErros';

interface FormData {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const Perfil: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const { userAuth, signOut, upadatedUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

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
          .oneOf([Yup.ref('newPassword'), undefined], 'Confirmação incorreta'),
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
      toast.success('Dados atualizados');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      toast.error(err);
    }
  };

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setLoading(true);
        try {
          const data = new FormData();
          data.append('avatar', e.target.files[0]);

          const response = await api.patch('/users/avatar', data, {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          upadatedUser(response.data);
          toast.success('Foto de perfil atualizada');
          setLoading(false);
        } catch (err) {
          toast.error('Não foi possível atualizar a foto de perfil');
          setLoading(false);
        }
      }
    },
    [token, upadatedUser],
  );
  return (
    <Container>
      <Header>
        <Link to="/menu">
          <LogoHeader />
        </Link>
        <NavBarContainer>
          <NavItemContent>
            <button type="button" onClick={signOut}>
              <IoIosLogOut size={30} color="#C32925" />
              <span>Sair</span>
            </button>
          </NavItemContent>
        </NavBarContainer>
      </Header>

      <Content>
        <h1>Perfil do Usuário</h1>
        <ProfileContainer>
          <BasicInfo>
            <Avatar>
              <img
                src={userAuth.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                alt={userAuth.name || 'Corretor'}
              />

              {loading ? (
                <Loader type="Bars" color="#fff" height={30} width={30} />
              ) : (
                <label htmlFor="avatar">
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                  <span>Mudar a foto</span>
                  <Camera />
                </label>
              )}
            </Avatar>
            <InforUser>
              <InfoItem>
                <span className="label">Nome</span>
                <span>{userAuth.name}</span>
              </InfoItem>
              <InfoGroup>
                <InfoItem>
                  <span className="label">Cargo</span>
                  <span>{userAuth.office.name}</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">Filial</span>
                  <span>{userAuth.subsidiary.city}</span>
                </InfoItem>
              </InfoGroup>
            </InforUser>
          </BasicInfo>
          <Separator />
          <LogonInfo>
            <h2>Atualização de dados</h2>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <FormContent>
                <Input>
                  <span className="label">E-mail</span>
                  <InputForm name="email" defaultValue={userAuth.email} />
                </Input>
                <Input>
                  <span className="label">Senha</span>
                  <InputForm name="oldPassword" type="password" />
                </Input>
                <Input>
                  <span className="label">Nova Senha</span>
                  <InputForm name="newPassword" type="password" />
                </Input>
                <Input>
                  <span className="label">Repita Nova Senha</span>
                  <InputForm name="confirmNewPassword" type="password" />
                </Input>
              </FormContent>
              <button type="submit">
                {loading ? (
                  <Loader type="Bars" color="#fff" height={30} width={30} />
                ) : (
                  <>
                    <span>Atualizar</span>
                    <Sync />
                  </>
                )}
              </button>
            </Form>
          </LogonInfo>
        </ProfileContainer>
      </Content>
    </Container>
  );
};

export default Perfil;
