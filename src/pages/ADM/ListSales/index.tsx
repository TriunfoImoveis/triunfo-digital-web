import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import GeneralVision from './components/GeneralVision';
import VisionDirector from './components/VisonDirector';



const ListSales: React.FC = () => {
  const {userAuth} = useAuth();
  const { name } = userAuth.office;
  
  if (name === 'Diretor') {
    return <VisionDirector />
  } else {
    return <GeneralVision />
  }
}

export default ListSales;