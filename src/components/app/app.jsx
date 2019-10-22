import React from 'react';
import PropTypes from 'prop-types';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const App = (props) => {
  const {gameTime, errorCount} = props;
  const startGame = () => {};

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onStartGame={startGame}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired
};

export default App;
