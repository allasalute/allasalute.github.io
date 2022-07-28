import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";

const Card = props => {
  const { className, showTopBorder, variant, isResponsive, responsiveBreakpoint } = props;
  const hasHitResponsiveBreakpoint = useMediaQuery({ maxWidth: responsiveBreakpoint });
  const classes = classnames(
    isResponsive && hasHitResponsiveBreakpoint ? "" : "c-card",
    variant && `c-card--${variant}`,
    className
  );

  return (
    <div className={classes} data-testid="card">
      {showTopBorder && !(isResponsive && hasHitResponsiveBreakpoint) && (
        <span className="c-card__border" role="presentation" />
      )}
      {props.children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  showTopBorder: PropTypes.bool,
  variant: PropTypes.string,
  responsiveBreakpoint: PropTypes.number,
  isResponsive: PropTypes.bool
};

Card.defaultProps = {
  className: "",
  showTopBorder: false,
  variant: "",
  isResponsive: false,
  responsiveBreakpoint: 768
};

export default Card;
