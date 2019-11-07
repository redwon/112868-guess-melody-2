import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class MistakesCounter extends PureComponent {

  render() {
    const numbers = new Array(this.props.number).fill(1);

    return (
      <div className="game__mistakes">
        {numbers.map((it, i) => (
          <div key={i} className="wrong" />
        ))}
      </div>
    );
  }
}

MistakesCounter.propTypes = {
  number: PropTypes.number
};

export default MistakesCounter;
