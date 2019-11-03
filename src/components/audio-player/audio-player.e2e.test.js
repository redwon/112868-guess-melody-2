import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player';

Enzyme.configure({adapter: new Adapter()});

// mock audio tag methods
jest.spyOn(window.HTMLMediaElement.prototype, `play`)
  .mockImplementation(() => {});

jest.spyOn(window.HTMLMediaElement.prototype, `pause`)
  .mockImplementation(() => {});

it(`AudioPlayer changed state after click`, () => {
  const wrapper = mount(<AudioPlayer src="src" />);

  const btn = wrapper.find(`button`);

  btn.simulate(`click`);
  expect(wrapper.state().isPlaying).toBe(true);

  btn.simulate(`click`);
  expect(wrapper.state().isPlaying).toBe(false);
});
