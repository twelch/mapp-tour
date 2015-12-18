import { Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import View1    from 'views/View1';
import View2    from 'views/View2';
const settings = require('../settings');

export default (
  <Route path='/' component={CoreLayout}>
    {settings.views.map(function genItems(view, index) {
      if (index === 0) {
        console.log('index!');
        return <IndexRoute key={index} component={view.component} />;
      } else {
        return <Route key={index} path={view.route} component={view.component} />;
      }
    })}
  </Route>
);
