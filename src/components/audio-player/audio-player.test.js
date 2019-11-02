import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<AudioPlayer
      src="src"
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
