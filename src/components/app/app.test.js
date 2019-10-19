import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<App
      errorCount={0}
      gameTime={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
