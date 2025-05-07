// @flow
import * as React from "react";
import "./_custom-select.scss";

type Props = {
  id: string,
  label: string,
  value: string,
  options: Array<{ label: string, value: string }>,
  onChange: (SyntheticInputEvent<HTMLSelectElement>) => void
};

const CustomSelect = ({ id, label, value, options, onChange }: Props): React.Node => {
  return (
    <div className="custom-select">
      <label htmlFor={id} className="c-questionnaire__label u-margin-bottom-xs">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
