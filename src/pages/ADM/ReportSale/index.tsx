import React from 'react';
import { useLocation } from 'react-router-dom';
import AdmLayout from '../../Layouts/Adm';

// import { Container } from './styles';

const ReportSale: React.FC = () => {
  const location = useLocation();
  return (
    <AdmLayout>
      <h1>oi</h1>
      {console.log(location)}
    </AdmLayout>
  );
};

export default ReportSale;
