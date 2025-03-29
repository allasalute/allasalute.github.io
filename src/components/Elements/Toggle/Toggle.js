import React from "react";
import classnames from "classnames";

const Toggle = ({ className, value, ...rest }) => {
  return (
    <button
      className={classnames("c-form__toggle-button", className)}
      type="button"
      data-action="aria-switch"
      aria-checked={value}
      role="switch"
      data-testid="toggle-element"
      {...rest}
    >
      <span></span>
    </button>
  );
};

export default Toggle;
