import React                  from 'react';
import { connect }            from 'react-redux';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View1 extends React.Component {
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
    this.map.removeLayer('contour');
    this.map.removeSource('terrain-data');
  }

  _start() {
    this.started = true;
    this._addContours();
    this.map.easeTo({
      bearing: 180,
      pitch: 45,
      duration: 5000
    });
  }

  _addContours() {
    this.map.addSource('terrain-data', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
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
  }

  render () {
    return null;
  }
}

export default connect(mapStateToProps)(View1);
