import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTracks: [],
      activePlayer: null
    };
  }

  selectTrackHandler(track) {
    if (this.state.selectedTracks.includes(track)) {
      this.setState((state) => {
        const tracks = state.selectedTracks.filter((i) => i !== track);
        return {selectedTracks: tracks.slice()};
      });
    } else {
      this.setState((state) => {
        const tracks = state.selectedTracks.slice();
        tracks.push(track);
        return {selectedTracks: tracks};
      });
    }
  }

  submitHandler(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.state.selectedTracks);
    this.setState({selectedTracks: []});
  }

  playHandler(player) {
    const {activePlayer} = this.state;

    if (activePlayer && activePlayer !== player) {
      activePlayer.pause();
    }

    this.setState({activePlayer: player});
  }

  render() {
    const {question, screenIndex} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => this.submitHandler(evt)}
        >
          {answers.map((it, i) => {
            return (
              <div key={`${screenIndex}-answer-${i}`} className="track">
                <AudioPlayer src={it.src} onPlay={(player) => this.playHandler(player)} />
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${i}`}
                    id={`answer-${i}`}
                    onChange={() => this.selectTrackHandler(it)}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>
                    Отметить
                  </label>
                </div>
              </div>
            );
          })}
          <button className="game__submit button" type="submit">
            Ответить
          </button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string,
    genre: PropTypes.string,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string,
          genre: PropTypes.string,
        })
    ),
  }),
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func,
};

export default GenreQuestionScreen;
