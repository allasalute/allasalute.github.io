import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Button from "components/Elements/Button/Button";

const DrinkCard = props => {
  const { content, ctaText, ctaType, onSelect, className } = props;
  const classes = classnames("c-drink-card u-text-center", className);
  const buttonClasses = classnames(
    `c-button c-button--primary u-margin-top-small u-flex--align-self-center c-drink-card__btn c-drink-card__btn--${ctaType}`
  );

  return (
    <div className={classes} data-testid="drink-card">
      <img className="u-responsive-image u-margin-bottom-auto" src={content.image} alt="" role="presentation" />
      {content.title && <h4 className="u-margin-top-none u-margin-bottom-tiny u-text-center">{content.title}</h4>}
      {content.description && (
        <p className="c-drink-card__subtitle u-margin-vertical-none u-text-center">{content.description}</p>
      )}
      {props.children}
      {onSelect && (
        <Button
          className={buttonClasses}
          disabled={false}
          aria-label={ctaText}
          onClick={onSelect}
          data-testid="drink-card-button"
        />
      )}
    </div>
  );
};

DrinkCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  ctaText: PropTypes.string,
  ctaType: PropTypes.oneOf(["add", "remove"])
};

DrinkCard.defaultProps = {
  className: "",
  children: null,
  ctaText: "",
  ctaType: "add",
  onSelect: null
};

export default DrinkCard;
