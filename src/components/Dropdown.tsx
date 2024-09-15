import React from "react";
import classes from "./Dropdown.module.css";

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
  ...rest
}) => {
  return (
    <div className={classes["dropdown-group"]}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes["dropdown"]}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
