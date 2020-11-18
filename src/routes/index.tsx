import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Routes';

import SignIn from '../pages/SignIn';
import Action from '../pages/Action';
import Ranking from '../pages/Ranking';
import RegisterSaleNew from '../pages/RegisterSale/New';
import RegisterSaleUsed from '../pages/RegisterSale/Used';
import ListSale from '../pages/ADM/ListSales';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/actions" component={Action} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />
    <Route path="/vendas-novo" component={RegisterSaleNew} isPrivate />
    <Route path="/vendas-usado" component={RegisterSaleUsed} isPrivate />
    <Route path="/adm/lista-vendas" component={ListSale} isPrivate />
  </Switch>
);

export default Routes;
