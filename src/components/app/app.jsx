import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };

    this.userAnswerHandler = () => {
      const {questions} = this.props;

      this.setState((prevState) => {
        const nextIndex = prevState.question + 1;
        const isEnd = nextIndex >= questions.length;

        return {
          question: !isEnd ? nextIndex : -1,
        };
      });
    };
  }

  render() {
    const {question} = this.state;

    return App.getScreen(question, this.props, this.userAnswerHandler);
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
  questions: PropTypes.arrayOf(PropTypes.object)
};

export default App;
