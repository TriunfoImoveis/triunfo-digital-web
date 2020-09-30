import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Routes';

import SignIn from '../pages/SignIn';
import Action from '../pages/Action';
import Ranking from '../pages/Ranking';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/actions" component={Action} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />
  </Switch>
);

export default Routes;
