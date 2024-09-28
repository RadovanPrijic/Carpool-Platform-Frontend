import React, { ChangeEvent } from "react";
import classes from "./styles/Input.module.css";

interface InputProps {
  label: string;
  id: string;
  name?: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  validationErrorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  validationErrorMessage,
  ...rest
}) => {
  return (
    <p>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={classes.input}
        {...rest}
      />
      {validationErrorMessage && <p>{validationErrorMessage}</p>}
    </p>
  );
};

export default Input;
