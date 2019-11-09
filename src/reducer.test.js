import {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
} from "./reducer";

const initialState = {
  step: -1,
  mistakes: 0,
  time: 300000,
  isGamePlaying: false
};

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      artist: `correct`,
      picture: `picture`,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `src`,
      },
      answers: [
        {
          artist: `incorrect`,
          picture: `picture`,
        },
        {
          artist: `incorrect-2`,
          picture: `picture`,
        },
        {
          artist: `correct`,
          picture: `picture`,
        },
      ]
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      artist: `incorrect`,
      picture: `picture`,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `src`,
      },
      answers: [
        {
          artist: `incorrect`,
          picture: `picture`,
        },
        {
          artist: `incorrect-2`,
          picture: `picture`,
        },
        {
          artist: `correct`,
          picture: `picture`,
        }
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect([{
      genre: `rock`,
      src: `src`
    }], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
      ]
    })).toBe(true);

    expect(isGenreAnswerCorrect([{
      genre: `rock`,
      src: `src`
    }], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly when we don't have correctly answer`, () => {
    expect(isGenreAnswerCorrect([], {
      type: `genre`,
      genre: `folk`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
      ]
    })).toBe(true);

    expect(isGenreAnswerCorrect([{
      genre: `rock`,
      src: `src`
    }], {
      type: `genre`,
      genre: `folk`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
      ]
    })).toBe(false);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `correct`,
      picture: `picture`,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `src`,
      },
      answers: [
        {
          artist: `correct`,
          picture: `picture`,
        },
        {
          artist: `incorrect`,
          picture: `picture`,
        },
        {
          artist: `incorrect-2`,
          picture: `picture`,
        },
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: `picture`,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `src`,
      },
      answers: [
        {
          artist: `correct`,
          picture: `picture`,
        },
        {
          artist: `incorrect`,
          picture: `picture`,
        },
        {
          artist: `incorrect-2`,
          picture: `picture`,
        },
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake([{
      genre: `jazz`,
      src: `src`
    }], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `jazz`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake([{
      genre: `blues`,
      src: `src`
    }], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });

  it(`Action creator resets state if user is answered incorrectly and there're no mistakes left`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: `picture`,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `src`,
      },
      answers: [
        {
          artist: `correct`,
          picture: `picture`,
        },
        {
          artist: `incorrect`,
          picture: `picture`,
        },
        {
          artist: `incorrect-2`,
          picture: `picture`,
        },
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`,
    });

    expect(ActionCreator.incrementMistake([{
      genre: `blues`,
      src: `src`
    }], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
        {
          genre: `blues`,
          src: `src`,
        },
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`,
    });
  });

  it(`Action creator for decreenting time returns correct action`, () => {
    expect(ActionCreator.decrementTime(3000, 1000)).toEqual({
      type: `DECREMENT_TIME`,
      payload: 1000,
    });

    expect(ActionCreator.decrementTime(0, 1000)).toEqual({
      type: `TOGGLE_GAME_STATUS`,
      payload: false,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer(initialState, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      isGamePlaying: false,
      time: 300000,
      step: 0,
      mistakes: 0,
    });

    expect(reducer(initialState, {
      type: `INCREMENT_STEP`,
      payload: 0,
    })).toEqual(initialState);
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer(initialState, {
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    })).toEqual({
      isGamePlaying: false,
      time: 300000,
      step: -1,
      mistakes: 1,
    });

    expect(reducer(initialState, {
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    })).toEqual(initialState);
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 3,
      mistakes: 2,
    }, {
      type: `RESET`,
    })).toEqual(initialState);
  });

  it(`Reducer should decrement current time by a given value`, () => {
    expect(reducer(initialState, {
      type: `DECREMENT_TIME`,
      payload: 100000,
    })).toEqual({
      isGamePlaying: false,
      time: 200000,
      step: -1,
      mistakes: 0,
    });

    expect(reducer(initialState, {
      type: `DECREMENT_TIME`,
      payload: 0,
    })).toEqual(initialState);
  });

  it(`Reducer should correctly change game status`, () => {
    expect(reducer(initialState, {
      type: `TOGGLE_GAME_STATUS`,
      payload: true
    })).toEqual({
      isGamePlaying: true,
      time: 300000,
      step: -1,
      mistakes: 0,
    });
  });
});
