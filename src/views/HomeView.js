import React                  from 'react';
import { connect }            from 'react-redux';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class HomeView extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object,
    getMap: React.PropTypes.func,
    onViewDone: React.PropTypes.func
  }

  constructor() {
    super();
    this.started = false;
    this.sources = [];
    this.layers = [];
  }

  /******** LIFECYCLE ********/

  componentDidMount() {
    this.map = this.props.getMap().map;
    if (this.props.mapState.loaded && !this.started) {
      this.start();
    }
  }

  componentDidUpdate() {
    if (this.props.mapState.loaded && !this.started) {
      this.start();
    }
  }

  componentWillUnmount() {
    // Unload sources
    this.sources.forEach((source) => {
      this.map.removeSource(source);
    });
    this.sources = [];
    // Unload layers
    this.layers.forEach((layer) => {
      this.map.removeLayer(layer);
    });
    this.layers = [];
  }

  /******** BOOTSTRAP ********/

  start() {
    this.map.easeTo({
      pitch: 80,
      duration: 2000
    });
  }

  done() {
    this.started = false;
    this.props.onViewDone();
  }

  /******** STEPS ********/

  /******** RENDER ********/

  render () {
    return (
      <div>
        This is the home view
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
