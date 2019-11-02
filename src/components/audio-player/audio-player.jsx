import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.audio = React.createRef();
  }

  play() {
    const {onPlay} = this.props;

    this.audio.current.play();
    this.setState({isPlaying: true});

    if (typeof onPlay === `function`) {
      onPlay(this);
    }
  }

  pause() {
    this.audio.current.pause();
    this.setState({isPlaying: false});
  }

  toggle() {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  render() {
    const {src} = this.props;
    const btnClass = classNames(`track__button`, {
      'track__button--pause': this.state.isPlaying,
      'track__button--play': !this.state.isPlaying,
    });

    return (
      <Fragment>
        <button
          className={btnClass}
          type="button"
          onClick={() => this.toggle()}
        />
        <div className="track__status">
          <audio
            src={src}
            ref={this.audio}
          />
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  onPlay: PropTypes.func
};

export default AudioPlayer;
