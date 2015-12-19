import React                  from 'react';
import { connect }            from 'react-redux';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View2 extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object,
    getMap: React.PropTypes.func,
    onViewDone: React.PropTypes.func
  }

  constructor() {
    super();
    this.started = false;
  }

  /* LIFECYCLE */

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
    clearInterval(this.interval);
  }

  /* BOOTSTRAP */

  start() {
    this.started = true;
    let time = 0;
    const timePerStep = 100;

    this.map.easeTo({
      bearing: 270,
      pitch: 0,
      duration: 2000,
      zoom: 10
    });

    this.interval = setInterval(() => {
      time += timePerStep;
      if (time === 10000) {
        this.done();
      }
    }, timePerStep);
  }

  done() {
    this.started = false;
    this.props.onViewDone();
  }

  /* STEPS */

  /* RENDER */

  render () {
    return (
      <div>This is view 2</div>
    );
  }
}

export default connect(mapStateToProps)(View2);
