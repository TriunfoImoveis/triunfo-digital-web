import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  userAuth: Object;
}

interface SignInCredentials {
  email: string;
  password: string;
  office: string;
}
interface AuthContextData {
  userAuth: Object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TriunfoDigital:token');
    const userAuth = localStorage.getItem('@TriunfoDigital:user');

    if (token && userAuth) {
      return { token, userAuth: JSON.parse(userAuth) };
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

    setData({ token, userAuth });
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem('@TriunfoDigital:token');
    localStorage.removeItem('@TriunfoDigital:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ userAuth: data.userAuth, signIn, signOut }}>
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
