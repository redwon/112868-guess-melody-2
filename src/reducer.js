const initialState = {
  step: -1,
  mistakes: 0,
  isGamePlaying: false,
  time: 300000
};

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer.artist === question.song.artist;
};

const filterByGenge = (genre) => (it) => it.genre === genre;

const isGenreAnswerCorrect = (userAnswer, question) => {
  const questionTracks = question.answers.filter(filterByGenge(question.genre));
  const userTracks = userAnswer.filter(filterByGenge(question.genre));

  if (questionTracks.length === 0 && userAnswer.length > 0) {
    return false;
  }

  return questionTracks.length === userTracks.length;
};

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;
    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  decrementTime: (time, interval) => {
    if (time - interval < 0) {
      return {
        type: `TOGGLE_GAME_STATUS`,
        payload: false
      };
    }

    return {
      type: `DECREMENT_TIME`,
      payload: interval
    };
  },

  toggleGameStatus: (status) => ({
    type: `TOGGLE_GAME_STATUS`,
    payload: status
  }),

  resetGame: () => ({
    type: `RESET`
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `DECREMENT_TIME`:
      return Object.assign({}, state, {
        time: state.time - action.payload
      });
    case `TOGGLE_GAME_STATUS`:
      return Object.assign({}, state, {
        isGamePlaying: action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
