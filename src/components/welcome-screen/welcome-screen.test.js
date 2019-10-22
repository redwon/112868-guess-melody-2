import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      time={0}
      errorCount={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
