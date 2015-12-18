const React = require('react');
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
const { AppBar } = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');
const Sidebar = require('../components/Sidebar');
import GLMap                  from '../components/GLMap';
import appconfig                 from '../../config/client';

import 'styles/core.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-flexr/styles.css';

injectTapEventPlugin();

// Define action creators
const actionCreators = {
  changeBaseLayer : (layer) => ({
    type : 'CHANGE_BASELAYER',
    payload : layer
  }),
  setMapLoaded : () => ({
    type : 'SET_LOADED',
    payload : true
  })
};
// Create dispatchers from action creators and assign to actions prop
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

// Bind state to props
const mapStateToProps = (state) => ({
  mapState : state.map
});

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element,
    history : React.PropTypes.object,
    location: React.PropTypes.object,
    mapState : React.PropTypes.object,
    actions : React.PropTypes.object
  }

  constructor () {
    super();
    this.map = undefined; // Reference to GLMap component

    // Set handler scope as es6 doesn't do this for us
    this._showLeftNavClick = this._showLeftNavClick.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onMapLoad = this._onMapLoad.bind(this);

    this.mapView = {
      style: 'mapbox://styles/mapbox/light-v8',
      center: [138.727778, 35.360555],
      zoom: 11,
      container: 'map'
    };

    this._addMapAccess = this._addMapAccess.bind(this);
    this.getMap = this.getMap.bind(this);
  }

  getMap() {
    return this.map;
  }

  _onLeftNavChange(e, key, payload) {
    if (payload.route) {
      this.props.history.pushState(null, payload.route);
    } else if (payload.layer) {
      this.props.actions.changeBaseLayer(payload.layer);
    }
  }

  _showLeftNavClick() {
    this.refs.sidebar.toggle();
  }

  _setMap(map) {
    this.map = map;
  }

  _addMapAccess(element) {
    return React.cloneElement(element, {getMap: this.getMap});
  }

  _onMapLoad() {
    this.props.actions.setMapLoaded();
  }

  render () {
    const barStyle = {
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    };

    const appbar = (
      <AppBar
      className='c-app-bar'
      style={barStyle}
      onLeftIconButtonTouchTap={this._showLeftNavClick} />
    );

    const scenes = React.Children.map(this.props.children, this._addMapAccess);

    const style = {
      map: {
        width:'65%',
        height: '100%'
      },
      rightBar: {
        width: '35%'
      }
    };

    

    return (
      <div className='page-container'>
        {appbar}
        <Sidebar
          ref="sidebar"
          docked={false}
          onChange={this._onLeftNavChange}
          mapState={this.props.mapState} />
        <GLMap
          ref={(c) => this._setMap(c)}
          mapStyle={style.map}
          view={this.mapView}
          baselayer={this.props.mapState.baselayer}
          token={appconfig.token.map}
          onLoad={this._onMapLoad}/>
        <div style={style.rightBar} className='right-bar'>
          Foobly dooblyszzz
        </div>
        {scenes}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
