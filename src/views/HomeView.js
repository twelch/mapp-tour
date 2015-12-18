import React                  from 'react';
import { connect }            from 'react-redux';

import 'styles/core.scss';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class HomeView extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object,
    history : React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      updatedAt: 0
    };
  }

  _onMenuTouchTap(e, item) {
    this.props.history.pushState(null, item.props.value);
  }

  render () {
    return null;
  }
}

export default connect(mapStateToProps)(HomeView);
