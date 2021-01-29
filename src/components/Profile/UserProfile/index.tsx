import React, { ChangeEvent, useCallback, useState } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Camera } from '../../../assets/images';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

import {
  ProfileContainer,
  BasicInfo,
  Avatar,
  LoadingContainer,
  InforUser,
  InfoItem,
  Separator,
  InfoGroup,
} from './styles';

const UserProfile: React.FC = () => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));

  const { userAuth, upadatedUser } = useAuth();

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setLoadingImg(true);
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
          setLoadingImg(false);
        } catch (err) {
          toast.error('Não foi possível atualizar a foto de perfil!');
          toast.error('Imagem tem que ser png/jpeg');
          toast.error('Imagem tem que ser de ate 1MB');
          setLoadingImg(false);
        }
      }
    },
    [token, upadatedUser],
  );
  return (
    <ProfileContainer>
      <BasicInfo>
        <Avatar>
          <img
            src={userAuth.avatar_url || 'https://imgur.com/I80W1Q0.png'}
            alt={userAuth.name || 'Corretor'}
          />

          {loadingImg ? (
            <LoadingContainer>
              <Loader type="Bars" color="#c32925" height={50} width={50} />
            </LoadingContainer>
          ) : (
            <label htmlFor="avatar">
              <input type="file" id="avatar" onChange={handleAvatarChange} />
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
    </ProfileContainer>
  );
};

export default UserProfile;
