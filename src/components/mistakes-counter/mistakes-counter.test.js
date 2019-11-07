import React from 'react';
import renderer from 'react-test-renderer';

import MistakesCounter from './mistakes-counter';

describe(`MistakesCounter`, () => {
  it(`should not render mistakes`, () => {
    const tree = renderer.create(<MistakesCounter number={0} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render mistakes`, () => {
    const tree = renderer.create(<MistakesCounter number={3} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
