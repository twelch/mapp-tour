const React = require('react');
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
const { AppBar } = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');
const Sidebar = require('../components/Sidebar');
import GLMap from '../components/GLMap';
import appconfig from '../../config/client';
import {views} from '../settings';

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

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor () {
    super();
    this.map = undefined; // Reference to GLMap component

    // Set handler scope as es6 doesn't do this for us
    this._showLeftNavClick = this._showLeftNavClick.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onMapLoad = this._onMapLoad.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this)

    this.mapView = {
      style: 'mapbox://styles/mapbox/light-v8',
      center: [138.727778, 35.360555],
      zoom: 11,
      container: 'map'
    };

    this.addProps = this.addProps.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.getMap = this.getMap.bind(this);
  }

  componentDidMount() {
    // Track keypress events
    window.addEventListener("keydown", this.onKeyPress, false);
  }

  /*
   * onKeyPress - adds keyboard controls to tour including spacebar to pause/play, and left and right arrows
   */
  onKeyPress(e) {
    var key = 'which' in e ? e.which : e.keyCode;
    if (key === 37) {
      console.log('preving');
      this.prev();
    } else if (key === 39) {
      console.log('nexting');
      this.next();
    } else if (key === 32) {
      console.log('toggling');
      this.toggle();
    }
  }

  getMap() {
    return this.map;
  }

  // Returns index of current view
  getCurViewIndex() {
    return views.findIndex((view) => {
      return view.route === this.props.location.pathname;
    });
  }

  getView(index) {
    // Return view object at index
    return views[index];
  }

  prev() {
    const index = this.getCurViewIndex();
    if (index >= 1  && index <= views.length) {
      const view = this.getView(index - 1);
      if (view) {
        this.props.history.pushState(null, view.route);
      }
    }
  }

  next() {
    const index = this.getCurViewIndex();
    if (index >= 0  && index <= views.length) {
      const view = this.getView(index + 1);
      if (view) {
        this.props.history.pushState(null, view.route);
      }
    }
  }

  toggle() {
    console.log('toggle');
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

  addProps(element) {
    return React.cloneElement(element, {
      getMap: this.getMap,
      onViewDone: this.next
    });
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

    const newViews = React.Children.map(this.props.children, this.addProps);

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
        {newViews}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
