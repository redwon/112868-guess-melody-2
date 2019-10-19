import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Welcome screen is correctly rendered after relaunch`, () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    time={0}
    errorCount={0}
    onStartGame={clickHandler}
  />);

  const startBtn = welcomeScreen.find(`button`);
  startBtn.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
