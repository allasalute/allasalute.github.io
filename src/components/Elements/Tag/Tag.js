import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "components/Elements/Button/Button";

const Tag = props => {
  const { text, ctaText, onSelect, className } = props;

  const classes = classnames("c-tag", className);

  return (
    <div className={classes}>
      <p className="c-tag__text u-margin-vertical-none" data-testid="tag">
        {text}
      </p>
      {onSelect && (
        <Button
          className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-tag__cta"
          disabled={false}
          aria-label={ctaText}
          onClick={onSelect}
        />
      )}
    </div>
  );
};

Tag.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  ctaText: PropTypes.string
};

Tag.defaultProps = {
  className: "",
  ctaText: "",
  onSelect: null
};

export default Tag;
