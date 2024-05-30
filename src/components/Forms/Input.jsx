import React from "react";

export default function Input({className, col, handleChange, label, placeholder, value, name, error, type = 'text',  readOnly=false}) {
  return (
    <div className={`col-md-${col} ${className}`}>
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          id={label}
          className={`form-control ${error ? 'border border-danger' : ''}`}
          name={name}
          value={value}
          onChange={handleChange}
          required
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {
            error ? 
            <p className="text-danger mt-1" style={{fontSize: '12px', fontStyle: 'italic'}}> <i className="icon-info"></i> Error</p>
            : null
        }
      </div>
    </div>
  );
}
