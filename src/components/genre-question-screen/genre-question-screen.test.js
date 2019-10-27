import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen';

const mockQuestion = {
  type: `genre`,
  genre: `genre`,
  answers: [
    {
      src: `src`,
      genre: `genre`,
    },
  ],
};

it(`renders correctly`, () => {
  const tree = renderer
    .create(<GenreQuestionScreen
      question={mockQuestion}
      screenIndex={0}
      onAnswer={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
