import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';

import questions from '../../mocks/questions';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<App
      questions={questions}
      errorCount={0}
      gameTime={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
