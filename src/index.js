import React from 'react';
import ReactDOM from 'react-dom';

import questions from './mocks/questions';
import settings from './mocks/settings';

import App from './components/app/app';

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <App
        errorCount={gameSettings.errorCount}
        gameTime={gameSettings.gameTime}
        questions={gameQuestions}
      />,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
