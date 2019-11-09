import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameTimer from './game-timer';

Enzyme.configure({adapter: new Adapter()});

it(`GameTimer changed state after click`, (done) => {
  const onTickHandler = jest.fn();

  shallow(<GameTimer
    status={true}
    time={2000}
    onTick={onTickHandler}
  />);

  setTimeout(() => {
    expect(onTickHandler).toHaveBeenCalledTimes(2);
    done();
  }, 2100);
});
