import React, { createContext, useCallback, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
import api from '../services/api';

interface UserAuth {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  phone: string;
  admission_date: string;
  goal: string;
  subsidiary: {
    id: string;
    name: string;
    city: string;
    state: string;
    country: string;
    active: true;
  };
  office: {
    id: string;
    name: string;
    active: true;
  };
  avatar_url: string | null;
}

interface AuthState {
  token: string;
  userAuth: UserAuth;
}

interface SignInCredentials {
  email: string;
  password: string;
  office: string;
}
interface AuthContextData {
  userAuth: UserAuth;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  upadatedUser(user: UserAuth): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TriunfoDigital:token');
    const userAuth = localStorage.getItem('@TriunfoDigital:user');

    if (token && userAuth) {
      const decodedToken: any = jwt.decode(token, { complete: true });
      const dateNow = new Date();
      if (decodedToken.payload.exp < dateNow.getTime()) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        return { token, userAuth: JSON.parse(userAuth) };
      }
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password, office }) => {
    const response = await api.post('/sessions', {
      email,
      password,
      office,
    });

    const { token, userAuth } = response.data;

    localStorage.setItem('@TriunfoDigital:token', token);
    localStorage.setItem('@TriunfoDigital:user', JSON.stringify(userAuth));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, userAuth });
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem('@TriunfoDigital:token');
    localStorage.removeItem('@TriunfoDigital:user');

    setData({} as AuthState);
  }, []);

  const upadatedUser = useCallback(
    (user: UserAuth) => {
      localStorage.setItem('@TriunfoDigital:user', JSON.stringify(user));
      setData({
        token: data.token,
        userAuth: user,
      });
    },
    [data.token],
  );
  return (
    <AuthContext.Provider
      value={{ userAuth: data.userAuth, signIn, signOut, upadatedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth só pode ser usado com o AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
