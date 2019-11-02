import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player';

const ArtistQuestionScreen = ({question, screenIndex, onAnswer}) => {
  const {answers, song} = question;

  const selectArtistHandler = (artist) => {
    onAnswer(artist);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <AudioPlayer src={song.src} />
        </div>
      </div>

      <form className="game__artist">
        {answers.map((it, i) => {
          return (
            <div key={`${screenIndex}-answer-${i}`} className="artist">
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                onChange={() => selectArtistHandler(it)}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img
                  className="artist__picture"
                  src={it.picture}
                  alt={it.artist}
                />
                {it.artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string,
    song: PropTypes.shape({
      artist: PropTypes.string,
      src: PropTypes.string,
    }),
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string,
          genre: PropTypes.string,
        })
    ),
  }),
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func,
};

export default ArtistQuestionScreen;
