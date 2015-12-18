import React                  from 'react';
import { connect }            from 'react-redux';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View2 extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object,
    getMap: React.PropTypes.func
  }

  constructor() {
    super();
    this.started = false;
  }

  componentDidMount() {
    this.map = this.props.getMap().map;
    if (this.props.mapState.loaded && !this.started) {
      this._start();
    }
  }

  componentDidUpdate() {
    if (this.props.mapState.loaded && !this.started) {
      this._start();
    }
  }

  componentWillUnmount() {
    this.started = false;
  }

  _start() {
    this.started = true;
    this.map.easeTo({
      bearing: 0,
      pitch: 0,
      duration: 5000
    });
  }

  render () {
    return null;
  }
}

export default connect(mapStateToProps)(View2);
