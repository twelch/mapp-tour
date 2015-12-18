import React                  from 'react';
import { connect }            from 'react-redux';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View1 extends React.Component {
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
    clearInterval(this.interval);
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
    this.started = true;
    let time = 0;
    const timePerStep = 100;

    this.map.easeTo({
      bearing: 90,
      pitch: 45,
      duration: 1000
    });

    this.interval = setInterval(() => {
      time += timePerStep;
      if (time === 1000) {
        this.addContours();
      }
      if (time === 10000) {
        this.done();
      }
    }, timePerStep);
  }

  done() {
    this.started = false;
    this.props.onViewDone();
  }

  /******** STEPS ********/

  addContours() {
    this.map.addSource('terrain-data', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
    this.sources.push('terrain-data');
    this.map.addLayer({
      'id': 'contour',
      'type': 'line',
      'source': 'terrain-data',
      'source-layer': 'contour',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#BAC7AC',
        'line-width': 1
      }
    });
    this.layers.push('contour');
  }

  /******** RENDER ********/
  
  render () {
    return (
      <div>This is view 1</div>
    );
  }
}

export default connect(mapStateToProps)(View1);
