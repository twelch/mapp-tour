import { Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
const settings = require('../settings');

export default (
  <Route path='/' component={CoreLayout}>
    {settings.views.map(function genItems(view, index) {
      if (index === 0) {
        return <IndexRoute key={index} component={view.component} />;
      } else {
        return <Route key={index} path={view.route} component={view.component} />;
      }
    })}
  </Route>
);
