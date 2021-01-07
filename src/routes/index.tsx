import React from 'react';
import { Switch, Route as RouterDom } from 'react-router-dom';

import Route from './Routes';

import SignIn from '../pages/SignIn';
import Menu from '../pages/Menu';
import Action from '../pages/Action';
import Ranking from '../pages/Ranking';
import RegisterSaleNew from '../pages/RegisterSale/New';
import RegisterSaleUsed from '../pages/RegisterSale/Used';
import ListSale from '../pages/ADM/ListSales';
import ListRealtors from '../pages/ADM/ListRealtors';
import ListColab from '../pages/ADM/ListColab';
import NewColab from '../pages/ADM/NewColab';
import DatailSale from '../pages/ADM/DetailsSale';
import ReportSale from '../pages/ADM/ReportSale';
import Perfil from '../pages/Perfil';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/actions" component={Action} isPrivate />
    <Route path="/menu" component={Menu} isPrivate />
    <Route path="/perfil" component={Perfil} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />
    <Route path="/vendas-novo" component={RegisterSaleNew} isPrivate />
    <Route path="/vendas-usado" component={RegisterSaleUsed} isPrivate />
    <Route path="/adm/lista-vendas" component={ListSale} isPrivate />
    <Route path="/adm/lista-corretores" component={ListRealtors} isPrivate />
    <Route path="/adm/lista-colaboradores" component={ListColab} isPrivate />
    <Route path="/adm/novo-colaborador" component={NewColab} isPrivate />
    <Route
      path="/adm/detalhes-colaborador/:id"
      component={NewColab}
      isPrivate
    />
    <Route path="/adm/detalhes-vendas/:id" component={DatailSale} isPrivate />
    <RouterDom
      path="/adm/relatorio-vendas"
      render={props => <ReportSale {...props} />}
    />
  </Switch>
);

export default Routes;
