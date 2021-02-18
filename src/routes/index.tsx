import React from 'react';
import { Switch } from 'react-router-dom';

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
import ListBuilders from '../pages/ADM/ListBuilders';
import NewColab from '../pages/ADM/NewColab';
import DatailSale from '../components/DetailsSale';
import ReportSale from '../pages/ADM/ReportSale';
import NewBuilders from '../pages/ADM/NewBuilder';
import Perfil from '../pages/Perfil';
import RankingCapture from '../pages/RankingCapture';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/actions" component={Action} isPrivate />
    <Route path="/menu" component={Menu} isPrivate />
    <Route path="/perfil" component={Perfil} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />
    <Route path="/ranking-captacao" component={RankingCapture} isPrivate />
    <Route path="/vendas-novo" component={RegisterSaleNew} isPrivate />
    <Route path="/vendas-usado" component={RegisterSaleUsed} isPrivate />
    <Route path="/adm/lista-vendas" component={ListSale} isPrivate />
    <Route path="/adm/lista-corretores" component={ListRealtors} isPrivate />
    <Route path="/adm/lista-colaboradores" component={ListColab} isPrivate />
    <Route path="/adm/lista-construtoras" component={ListBuilders} isPrivate />
    <Route path="/adm/novo-colaborador" component={NewColab} isPrivate />
    <Route
      path="/adm/detalhes-colaborador/:id"
      component={NewColab}
      isPrivate
    />
    <Route path="/adm/detalhes-vendas/:id" component={DatailSale} isPrivate />
    <Route path="/adm/nova-construtora" component={NewBuilders} isPrivate />
    <Route
      path="/adm/detalhes-construtora/:id"
      component={NewBuilders}
      isPrivate
    />
    <Route path="/adm/relatorio-vendas" component={ReportSale} isPrivate />
  </Switch>
);

export default Routes;
