import React from 'react';
const { LeftNav, MenuItem } = require('material-ui');
const settings = require('../settings');

class Sidebar extends React.Component {
  // Props validation
  static propTypes = {
    ref : React.PropTypes.object
  }

  constructor () {
    super();
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  render() {
    // Generate menu items from list of views
    const mapViews = settings.views.map(function genItems(view) {
      return {
        text: view.name,
        route: view.route
      };
    });

    const menuItems = [
      { type: MenuItem.Types.SUBHEADER, text: 'Tour' },
      ...mapViews
    ];

    // Break out props to consume and leave rest to pass on
    const {ref, ...childProps} = this.props;

    const style = {
      zIndex: '100'
    };

    return (
      <div>
        <LeftNav
          ref="leftNav"
          style={style}
          menuItems={menuItems}
          {...childProps} />
      </div>
    );
  }
}

export default Sidebar;
