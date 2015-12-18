import { Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/HomeView';
import View1    from 'views/View1';
import View2    from 'views/View2';
const settings = require('../settings');

export default (
  <Route path='/' component={CoreLayout}>
    {settings.views.map(function genItems(view) {
      return <Route key={view.key} path={view.route} component={view.component} />;
    })}
  </Route>
);
