import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player';

const GenreQuestionScreen = ({question, screenIndex, onAnswer}) => {
  const {answers, genre} = question;
  let selectedTracks = [];
  let activePlayer = null;

  const selectTrackHandler = (track) => {
    if (selectedTracks.includes(track)) {
      selectedTracks = selectedTracks.filter((i) => i !== track);
    } else {
      selectedTracks.push(track);
    }
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    onAnswer(selectedTracks);
    selectedTracks = [];
  };

  const playHandler = (player) => {
    if (activePlayer && activePlayer !== player) {
      activePlayer.pause();
    }
    activePlayer = player;
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={submitHandler}>
        {answers.map((it, i) => {
          return (
            <div key={`${screenIndex}-answer-${i}`} className="track">
              <AudioPlayer src={it.src} onPlay={playHandler} />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={() => selectTrackHandler(it)}
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
};

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
