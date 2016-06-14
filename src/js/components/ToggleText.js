import React from 'react';
import classNames from 'classnames';

/**
 * @namespace ToggleText
 */

/**
 * Pure component that represents toggleable text
 * @function ToggleText
 * @param {object} - props containing label and state
 * @author Kushal D'Souza
 * @memberOf ToggleText
 */
const ToggleText = (props) => {
  const { label, completed, onClick } = props;
  const classname = classNames({
    completed
  });
  return (
    <p className={classname} onClick={onClick} >{label}</p>
  );
};

ToggleText.propTypes = {
  label: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default ToggleText;
