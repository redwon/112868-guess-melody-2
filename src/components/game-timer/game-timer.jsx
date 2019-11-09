import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GameTimer extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;
    this.intervalTime = 1000;
  }

  tick() {
    this.props.onTick(this.props.time, this.intervalTime);
  }

  timeMask(number) {
    return number < 10 ? `0${number}` : number;
  }

  initTimer() {
    if (this.props.status && !this.timer) {
      this.timer = setInterval(() => this.tick(), this.intervalTime);
      return;
    }
    if (!this.props.status && this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const time = new Date(this.props.time);
    const minutes = this.timeMask(time.getMinutes());
    const seconds = this.timeMask(time.getSeconds());

    return (
      <div className="timer__value">
        <span className="timer__mins">{minutes}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{seconds}</span>
      </div>
    );
  }

  componentDidMount() {
    this.initTimer();
  }

  componentDidUpdate() {
    this.initTimer();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

GameTimer.propTypes = {
  status: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  onTick: PropTypes.func.isRequired,
};

export default GameTimer;
