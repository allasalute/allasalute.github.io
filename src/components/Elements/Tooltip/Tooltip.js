import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Tooltip = props => {
  const { text, className } = props;

  const classes = classnames("c-tooltip", className);

  return (
    <div className={classes}>
      <p data-testid="tooltip" className="c-tooltip__text u-margin-vertical-none">
        {text}
      </p>
    </div>
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

Tooltip.defaultProps = {
  className: ""
};

export default Tooltip;
