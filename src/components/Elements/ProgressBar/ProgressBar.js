import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

const ProgressBar = ({ className, max, min, value, category, ...rest }) => {
  const classes = classnames("c-progress-bar", className);
  const { t } = useTranslation();

  const getSteps = () => {
    const numberOfSteps = max - min;
    const content = [];

    for (let i = min; i < numberOfSteps; i++) {
      content.push(
        <span
          key={i}
          className={classnames(
            "c-progress-bar__step",
            i < value && "c-progress-bar__step--complete",
            i === value && "c-progress-bar__step--active"
          )}
        >
          <span className="c-progress-bar__step-inner"></span>
        </span>
      );
    }

    return content;
  };

  return (
    <div
      className={classes}
      data-testid="progress-bar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={t("progressBarAltText", { current: value + 1, max: max, category: category })}
      {...rest}
    >
      <span className="c-progress-bar__text">
        {t("progressBar", { current: value + 1, max: max, category: category })}
      </span>
      <div className="u-flex c-progress-bar__wrapper">{getSteps()}</div>
    </div>
  );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

ProgressBar.defaultProps = {
  className: ""
};

export default ProgressBar;
