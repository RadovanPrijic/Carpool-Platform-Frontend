import React from "react";
import classes from "./styles/Dropdown.module.css";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label: string;
  id: string;
  name: string;
  options: Option[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  validationErrorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  validationErrorMessage,
  ...rest
}) => {
  return (
    <p>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes.dropdown}
        {...rest}
      >
        <option value="" className={classes.option}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={classes.option}
          >
            {option.label}
          </option>
        ))}
      </select>
      {validationErrorMessage && <p>{validationErrorMessage}</p>}
    </p>
  );
};

export default Dropdown;
