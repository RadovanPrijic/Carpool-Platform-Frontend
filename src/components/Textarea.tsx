import React, { ChangeEvent } from "react";

interface TextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  name?: string;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 10,
  cols = 30,
  id,
  name,
  disabled = false,
}) => {
  return (
    <div className="textarea-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        cols={cols}
        disabled={disabled}
        className="textarea-field"
      />
    </div>
  );
};

export default Textarea;
