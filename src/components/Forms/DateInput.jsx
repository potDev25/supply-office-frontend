import React from "react";

export default function DateInput({className, col, handleChange, label, placeholder, value, name, error}) {
  return (
    <div className={`col-md-${col}`}>
       <label htmlFor={label}>{label}</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="icon-calendar" />
          </span>
        </div>
        <input
          type="date"
          id={label}
          className={`form-control ${error ? 'border border-danger' : ''}`}
          name={name}
          value={value}
          onChange={handleChange}
          required
          placeholder={placeholder}
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
