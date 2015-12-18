import View1 from 'views/View1';
import View2 from 'views/View2';
import HomeView from 'views/HomeView';

export const views = [{
  name: 'Main Menu',
  route: '/',
  component: HomeView,
  text: 'Main Menu'
}, {
  name: 'Street Scene',
  route: '/street',
  component: View1,
  text: 'This is view 1'
}, {
  name: 'Drugstore Parking',
  route: '/store-parking',
  component: View2,
  text: 'This is view 2'
}];

/*
 * getView - return view object at given index
 */
export function getViewByIndex(index) {
  return views[index];
}

/*
 * getView - return view object at given route
 */
export function getViewByRoute(route) {
  return views.find((view) => {
    return view.route === route;
  });
}

export function getNextViewByRoute(route) {
  const index = getIndexByRoute(route);
  if (index >= 0  && index <= views.length) {
    const view = views[index + 1];
    return view;
  }
  return undefined;
}

export function getPrevViewByRoute(route) {
  const index = getIndexByRoute(route);
  if (index >= 1  && index <= views.length) {
    const view = views[index - 1];
    return view;
  }
  return undefined;
}

/*
 * getCurViewIndex - get index of current view
 */
export function getIndexByRoute(route) {
  return views.findIndex((view) => {
    return view.route === route;
  });
}

/*
 * getCurView - get the current view
 */
export function getCurView() {
  return views[this.getCurViewIndex()];
}
