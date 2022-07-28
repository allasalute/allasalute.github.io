import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Button = ({ isLight, className, size, children, ...rest }) => {
  const classes = classnames("c-button", `c-button--${size}`, isLight && "c-button--is-light", className);

  return (
    <button className={classes} data-testid="button" {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  isLight: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

Button.defaultProps = {
  isLight: false,
  className: "",
  size: "md",
  children: null
};

export default Button;
