import React from 'react';
import DashbordLayout from '../../../Layouts/dashboard';
import Loader from 'react-loader-spinner';
import {Container, LoadingContainer} from '../../styled'

const Loading: React.FC = () => {
  return (
    <DashbordLayout>
      <Container>
        <LoadingContainer>
          <Loader type="Bars" color="#c32925" height={100} width={100} />
        </LoadingContainer>
      </Container>
    </DashbordLayout>
  );
}

export default Loading;