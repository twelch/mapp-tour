import React, { Component } from 'react';

// NotWorkingShimInstead import mapboxgl from 'mapbox-gl';
require('script!mapbox-gl/dist/mapbox-gl-dev.js');

class GLMap extends Component {
  static propTypes = {
    // Default map view
    view: React.PropTypes.object,
    // Style of map container
    mapStyle: React.PropTypes.object,
    // Current base layer
    baselayer: React.PropTypes.string,
    // Mapbox map token
    token: React.PropTypes.string,
    // onStyleLoad event fired after style loaded.  Map object is passed
    onStyleLoad: React.PropTypes.func,
    // onLoad event fired after map fully loaded.  Map object is passed
    onLoad: React.PropTypes.func
  }

  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    this.map = new mapboxgl.Map(this.props.view);

    this.map.on('style.load', () => {
      this.map.addSource('satellite', {
        type: 'raster',
        url: 'mapbox://mapbox.satellite'
      });
      this.map.addLayer({
        'id': 'satellite',
        'type': 'raster',
        'source': 'satellite',
        'layout': {
          'visibility': 'none'
        }
      });

      if (this.props.onStyleLoad) {
        this.props.onStyleLoad(this.map);
      }
    });

    this.map.on('load', () => {
      if (this.props.onLoad) {
        this.props.onLoad(this.map);
      }
    });
  }

  componentDidUpdate() {
    if (this.props.baselayer === 'satellite') {
      this.map.setLayoutProperty('satellite', 'visibility', 'visible');
    } else {
      this.map.setLayoutProperty('satellite', 'visibility', 'none');
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  setFilter(layer, filter) {
    this.map.setFilter(layer, filter);
  }

  fitBounds(bounds) {
    this.map.fitBounds(bounds);
  }

  batch(work) {
    this.map.batch(work);
  }

  render() {
    return (
      <div style={this.props.mapStyle} id='map'></div>
    );
  }
}

export default GLMap;
