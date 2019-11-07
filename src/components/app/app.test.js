import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app';

import questions from '../../mocks/questions';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<App
      step={0}
      mistakes={0}
      questions={questions}
      maxMistakes={0}
      gameTime={0}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
