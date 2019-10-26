import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen';

Enzyme.configure({adapter: new Adapter()});

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

it(`ArtistQuestionScreen returned user answer correctly`, () => {
  const answerHandler = jest.fn();
  const artistQuestionScreen = shallow(<ArtistQuestionScreen
    question={mockQuestion}
    screenIndex={0}
    onAnswer={answerHandler}
  />);

  const answerInput = artistQuestionScreen.find(`.artist__input`);
  answerInput.simulate(`change`);

  expect(answerHandler).toHaveBeenCalledWith(mockQuestion.answers[0]);
});
