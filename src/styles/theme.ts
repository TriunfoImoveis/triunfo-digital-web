import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#C32925',
    primaryAlpha: 'rgba(195, 41, 37, 0.2)',
    orange: '#ff8c00',
    orangeAlpha: 'rgba(255, 140, 0, 0.2)',
    secondary: '#FCF9F9',
    danger: '#DC3545',
    success: '#40B236',
    successLight: '#5EFF50',
    successAlpha: 'rgba(64, 178, 54, 0.2)',
    warning: '#FFCC00',
    warningAlpha: 'rgba(255,204,0, 0.2)',
    background: '#f8f8f8',
    borderColor: '#818181',
    textColor: '#898989',
    textColorAlpha: 'rgba(121,119,119,0.5)',
    buttonAddColor: '#2d9cdb',
    buttonAddColorAlpha: 'rgba(45,156,219, 0.8)',
  },
  fontSize: {
    tiny: '1.2rem',
    small: '1.4rem',
    dafault: '1.6rem',
    large: '2rem',
  },
  borderRadius: '0.4rem',
  boxShadow: ' 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25)',
};

export default theme;
