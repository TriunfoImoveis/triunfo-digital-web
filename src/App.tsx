import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import Routes from './routes';

import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FormProvider>
          <Router>
            <Routes />
          </Router>
        </FormProvider>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
