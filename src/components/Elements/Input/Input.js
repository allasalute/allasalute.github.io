import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classnames from "classnames";
import ErrorList from "../ErrorList/ErrorList";
import DatePicker from "./DatePicker";
import Button from "components/Elements/Button/Button";

const Input = React.forwardRef(
  (
    {
      Icon,
      label,
      showLabel,
      helpLabel,
      errors,
      className,
      selectOptions,
      selectEmptyValue,
      size,
      variant,
      labelSubtitle,
      isCard,
      disabled,
      onContainerClick,
      increaseDecreaseValue,
      ...rest
    },
    ref
  ) => {
    const { type, id, value } = rest;
    const { t } = useTranslation();

    const [isFocused, setIsFocused] = useState(false);

    let Element;
    let WrapperElement = onContainerClick ? "button" : "div";

    switch (type) {
      case "textarea":
      case "select":
        Element = type;
        break;
      case "date":
        Element = DatePicker;
        break;
      default:
        Element = "input";
    }

    const containerClasses = classnames(
      "c-form__group",
      "u-margin-vertical-small",
      (rest.value === null || rest.value === "" || rest.value === undefined) &&
        !rest.selected &&
        "c-form__group--empty",
      isFocused && "c-form__group--focused",
      rest.checked && "c-form__group--checked",
      className,
      isCard && "c-form__card"
    );
    const inputClasses = classnames(
      "c-form__input",
      type === "textarea" && size === "tall" && `c-form__input--${size}`,
      Icon && "c-form__input--has-icon",
      type === "checkbox" && "c-form__checkbox-input u-visually-hidden",
      type === "number" && "c-form__input--has-no-border c-number__input",
      type.includes("radio") && "c-form__radio-input u-visually-hidden",
      size && `c-form__input--${size}`,
      variant && `c-form__input--${variant}`,
      (rest.value === null || rest.value === "" || rest.value === undefined) && !rest.selected && "c-form__input--empty"
    );
    const selectInputClasses = classnames(inputClasses, value === selectEmptyValue && "c-form__input--empty");
    const labelClasses = classnames(
      !showLabel && "u-visually-hidden",
      variant && `c-form__label--${variant}`,
      type === "checkbox" && "c-form__checkbox-label",
      type === "checkbox" && rest.checked && "c-form__checkbox-label--checked",
      type === "checkbox" && isFocused && "c-form__checkbox-label--focused",
      type === "number" && "c-number__label",
      type.includes("radio") && "c-form__radio-label",
      type.includes("radio") && rest.checked && "c-form__radio-label--checked",
      type.includes("radio") && isFocused && "c-form__radio-label--focused"
    );

    const helpId = `${id}-help`;
    const errorId = `${id}-error`;

    function setNativeValue(element, value) {
      const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
      const prototype = Object.getPrototypeOf(element);
      const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;

      if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
      } else {
        valueSetter.call(element, value);
      }
    }

    const setValue = updatedValue => {
      setNativeValue(ref.current, Number(updatedValue));

      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("input", true, false, {});
      ref.current.dispatchEvent(evt);
    };

    return (
      <WrapperElement
        className={containerClasses}
        tabIndex={onContainerClick && "-1"}
        onClick={onContainerClick}
        disabled={disabled}
      >
        {type === "number" ? (
          <div className="c-number">
            <div className="c-number__inner">
              <Button
                className="c-button--primary c-number__btn c-number__btn--subtract"
                size="sm"
                onClick={() => {
                  const updatedValue = Number(ref.current.value) - increaseDecreaseValue;
                  setValue(updatedValue);
                }}
              >
                <p className="u-visually-hidden">
                  {t("common.subtract", { measurement: ref.current?.dataset?.measurement ?? "" })}
                </p>
              </Button>
              <Element
                className={inputClasses}
                aria-invalid={errors.length > 0}
                aria-describedby={errors.length > 0 ? errorId : helpId}
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={e => {
                  setValue(e.target.value);

                  setIsFocused(false);
                }}
                disabled={disabled}
                {...rest}
              />
              <Button
                className="c-button--primary c-number__btn c-number__btn--add"
                size="sm"
                onClick={() => {
                  const updatedValue = Number(ref.current.value) + increaseDecreaseValue;
                  setValue(updatedValue);
                }}
              >
                <p className="u-visually-hidden">
                  {t("common.add", { measurement: ref.current?.dataset?.measurement ?? "" })}
                </p>
              </Button>
            </div>

            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          </div>
        ) : (
          <>
            <label htmlFor={id} className={labelClasses}>
              <span>{label}</span>
              {labelSubtitle && <span className="c-form__label-subtitle">{labelSubtitle}</span>}
            </label>

            <div className="c-form__input-container u-margin-vertical-tiny u-visually-hidden">
              {Element === "select" ? (
                <Element
                  className={selectInputClasses}
                  placeholder={label}
                  aria-invalid={errors.length > 0}
                  aria-describedby={errors.length > 0 ? errorId : helpId}
                  ref={ref}
                  disabled={disabled}
                  {...rest}
                >
                  {selectOptions.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Element>
              ) : (
                <Element
                  className={inputClasses}
                  placeholder={label}
                  aria-invalid={errors.length > 0}
                  aria-describedby={errors.length > 0 ? errorId : helpId}
                  ref={ref}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={disabled}
                  {...rest}
                />
              )}
              {Icon && <Icon />}
            </div>
            {helpLabel && (
              <p id={helpId} className="u-text-left u-font-primary u-margin-vertical-none">
                {helpLabel}
              </p>
            )}
          </>
        )}

        {errors.length > 0 && <ErrorList id={errorId} errors={errors} />}
      </WrapperElement>
    );
  }
);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  helpLabel: PropTypes.string,
  Icon: PropTypes.elementType,
  id: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  errors: PropTypes.array,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  selectEmptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelSubtitle: PropTypes.string,
  isCard: PropTypes.bool,
  onContainerClick: PropTypes.func
};

Input.defaultProps = {
  type: "text",
  Icon: null,
  label: "",
  helpLabel: "",
  showLabel: false,
  errors: [],
  selectOptions: [],
  selectEmptyValue: -1,
  labelSubtitle: "",
  isCard: false,
  onContainerClick: null
};

export default Input;
