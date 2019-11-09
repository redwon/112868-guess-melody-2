import React from 'react';
import renderer from 'react-test-renderer';

import GameTimer from './game-timer';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<GameTimer
      status={true}
      time={300000}
      onTick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
