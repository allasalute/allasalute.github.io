import React from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

const FormDatePicker = ({ value, placeholder, ...rest }) => {
  const { i18n } = useTranslation();

  // Ignore any user timezones.
  const getNormalizedDate = date => {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const updated = new Date(date.getTime() + userTimezoneOffset);
    return updated;
  };

  return (
    <DatePicker
      selected={value instanceof Date ? getNormalizedDate(value) : value}
      locale={i18n.language}
      value={value}
      placeholderText={placeholder}
      {...rest}
    />
  );
};

export default FormDatePicker;
