import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

const ErrorList = ({ errors, className, ...rest }) => {
  const { t } = useTranslation();
  const classes = classnames("c-form__error-message", className);

  return (
    <ul role="alert" className={classes} {...rest}>
      {errors.length > 0
        ? errors.map(error => {
            return <li key={error.code}>{t(`errors.${error.code}`, error.langProps || {})}</li>;
          })
        : null}
    </ul>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.array.isRequired
};

export default ErrorList;
