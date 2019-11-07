import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {ActionCreator} from '../../reducer';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import MistakesCounter from '../mistakes-counter/mistakes-counter';

class App extends PureComponent {
  userAnswerHandler(userAnswer, question) {
    const {
      onUserAnswer,
      mistakes,
      maxMistakes,
    } = this.props;

    onUserAnswer(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    );
  }

  getScreen(step, question) {
    if (step === -1) {
      const {gameTime, maxMistakes, onWelcomeScreenClick} = this.props;

      return (
        <WelcomeScreen
          time={gameTime}
          maxMistakes={maxMistakes}
          onStartGame={onWelcomeScreenClick}
        />
      );
    }

    switch (question.type) {
      case `genre`:
        return (
          <GenreQuestionScreen
            screenIndex={step}
            question={question}
            onAnswer={(userAnswer) => this.userAnswerHandler(userAnswer, question)}
          />
        );

      case `artist`:
        return (
          <ArtistQuestionScreen
            screenIndex={step}
            question={question}
            onAnswer={(userAnswer) => this.userAnswerHandler(userAnswer, question)}
          />
        );
    }

    return null;
  }

  render() {
    const {step, mistakes, questions} = this.props;
    const question = questions[step];
    const sectionClass = classNames(`game`, {
      'game--genre': question && question.type === `genre`,
      'game--artist': question && question.type === `artist`,
    });

    return (
      <section className={sectionClass}>
        {step !== -1 && (
          <header className="game__header">
            <a className="game__back" href="#">
              <span className="visually-hidden">Сыграть ещё раз</span>
              <img
                className="game__logo"
                src="img/melody-logo-ginger.png"
                alt="Угадай мелодию"
              />
            </a>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="timer"
              viewBox="0 0 780 780"
            >
              <circle
                className="timer__line"
                cx="390"
                cy="390"
                r="370"
                style={{
                  filter: `url(#blur)`,
                  transform: `rotate(-90deg) scaleY(-1)`,
                  transformOrigin: `center`,
                }}
              />
            </svg>

            <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
              <span className="timer__mins">05</span>
              <span className="timer__dots">:</span>
              <span className="timer__secs">00</span>
            </div>

            <MistakesCounter number={mistakes} />
          </header>
        )}

        {this.getScreen(step, question)}
      </section>
    );
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        genre: PropTypes.string,
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
      })
  ),
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes,
    ));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
