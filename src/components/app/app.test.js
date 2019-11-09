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
      time={0}
      isGamePlaying={false}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
      onTimeTick={jest.fn()}
      onGameReset={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
