import React from 'react';
const { LeftNav} = require('material-ui');

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
    const menuItems = [
      { route: '/', text: 'Main Menu' },
      { route: '/view1', text: 'Mount Fuji Contours' },
      { route: '/view2', text: 'Venice Fly' }
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
