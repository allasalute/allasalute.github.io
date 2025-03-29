import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InfoCard = props => {
  const { text, image, className } = props;
  const classes = classnames("c-info-card", "u-text-center", className);

  return (
    <div className={classes}>
      <img src={image} alt="" role="presentation" />
      <p className="c-info-card__text u-margin-bottom-none u-margin-top-small" data-testid="info-card">
        {text}
      </p>
    </div>
  );
};

InfoCard.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

InfoCard.defaultProps = {
  className: ""
};

export default InfoCard;
