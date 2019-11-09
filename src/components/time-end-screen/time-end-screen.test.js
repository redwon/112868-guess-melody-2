import React from 'react';
import renderer from 'react-test-renderer';

import TimeEndScreen from './time-end-screen';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<TimeEndScreen
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
