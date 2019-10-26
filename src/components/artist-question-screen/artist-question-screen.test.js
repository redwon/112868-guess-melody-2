import React from 'react';
import renderer from 'react-test-renderer';

import ArtistQuestionScreen from './artist-question-screen';

const mockQuestion = {
  type: `artist`,
  song: {
    artist: `artist`,
    src: `song`,
  },
  answers: [
    {
      picture: `pic`,
      artist: `artist`,
    },
  ],
};

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ArtistQuestionScreen
      question={mockQuestion}
      screenIndex={0}
      onAnswer={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
