import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import questions from './mocks/questions';
import settings from './mocks/settings';
import {reducer} from './reducer';

import App from './components/app/app';

const init = (gameSettings, gameQuestions) => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          maxMistakes={gameSettings.maxMistakes}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
