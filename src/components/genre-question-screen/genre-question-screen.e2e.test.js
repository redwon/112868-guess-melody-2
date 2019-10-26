import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreQuestionScreen from './genre-question-screen';

Enzyme.configure({adapter: new Adapter()});

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

it(`GenreQuestionScreen returned user answer correctly`, () => {
  const answerHandler = jest.fn();
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    question={mockQuestion}
    screenIndex={0}
    onAnswer={answerHandler}
  />);

  const answerInput = genreQuestionScreen.find(`.game__input`);
  answerInput.simulate(`change`);

  const form = genreQuestionScreen.find(`form`);
  form.simulate(`submit`, {
    preventDefault: () => {}
  });

  expect(answerHandler).toHaveBeenCalledWith([mockQuestion.answers[0]]);
});
