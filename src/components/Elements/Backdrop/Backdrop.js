// @flow

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* Disabled a11y bits for the overlay. Ensure that user's have an alternate way to interact with keyboard (e.g. modal with the close button)  */
import React, { type Element } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

type DefaultProps = {
  +show?: boolean,
  +opaque?: boolean,
  +onClick?: () => {},
  +className?: string
};
type Props = {
  ...DefaultProps
};

const Backdrop = (props: Props): Element<any> => {
  const { onClick, className, opaque } = props;

  const classes = classnames("c-backdrop", opaque && "c-backdrop--opaque", className);

  return <div className={classes} data-testid="test-backdrop" onClick={onClick} />;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  opaque: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Backdrop.defaultProps = {
  show: false,
  onClick: () => {},
  className: "",
  opaque: false
};

export default Backdrop;
