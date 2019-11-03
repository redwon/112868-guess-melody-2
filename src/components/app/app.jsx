import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  userAnswerHandler() {
    const {questions} = this.props;

    this.setState((prevState) => {
      const nextIndex = prevState.question + 1;
      const isEnd = nextIndex >= questions.length;

      return {
        question: !isEnd ? nextIndex : -1,
      };
    });
  }

  render() {
    const {question} = this.state;
    const {questions} = this.props;
    const currentQuestion = questions[question];
    const sectionClass = classNames(`game`, {
      'game--genre': currentQuestion && currentQuestion.type === `genre`,
      'game--artist': currentQuestion && currentQuestion.type === `artist`,
    });

    return (
      <section className={sectionClass}>
        {question !== -1 && (
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

            <div className="game__mistakes">
              <div className="wrong" />
              <div className="wrong" />
              <div className="wrong" />
            </div>
          </header>
        )}

        {App.getScreen(question, this.props, () => this.userAnswerHandler())}
      </section>
    );
  }

  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {gameTime, errorCount} = props;

      return (
        <WelcomeScreen
          time={gameTime}
          errorCount={errorCount}
          onStartGame={onUserAnswer}
        />
      );
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GenreQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );

      case `artist`:
        return (
          <ArtistQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );
    }

    return null;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
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
};

export default App;
