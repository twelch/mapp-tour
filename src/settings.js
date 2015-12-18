import View1 from 'views/View1';
import View2 from 'views/View2';

export default {
  views: [{
    key: 0,
    name: 'Street Scene',
    route: '/street',
    component: View1,
    text: 'This is view 1'
  }, {
    key: 1,
    name: 'Drugstore Parking',
    route: '/store-parking',
    component: View2,
    text: 'This is view 2'
  }]
};
