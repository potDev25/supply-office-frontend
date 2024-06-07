import React from "react";

export default function Select({className, col, handleChange, label, value, name, error, options}) {
  return (
    <div className={`col-md-${col} ${className}`}>
      <label>{label}</label>
      <div className="form-group">
        <select className="custom-select" onChange={handleChange} name={name}>
          <option value='' selected>Select</option>
          {
            options.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))
          }
        </select>
        {
            error ? 
            <p className="text-danger mt-1" style={{fontSize: '12px', fontStyle: 'italic'}}> <i className="icon-info"></i> Error</p>
            : null
        }
      </div>
    </div>
  );
}
