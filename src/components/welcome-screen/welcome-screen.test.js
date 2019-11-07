import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      time={0}
      maxMistakes={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
