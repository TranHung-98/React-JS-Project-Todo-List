import React from "react";

export function Select({ value, onChange ,errors}) {
  return (
    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select id="status"
        className={`form-group text-color border-radius select-fix  ${errors ? 'has-error' : ''}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Select Status</option>
        <option value="1">Completed</option>
        <option value="2">Not Started</option>
        <option value="3">In Progress</option>
      </select>
      {errors && <span className="error-message">{errors}</span>}
    </div>
  );
}


export function SelectFilter({ value, onChange }) {

  return (

<div className="form-group">
      <select id="filter"
        className="form-control text-color border-radius border"
        value={value}
        onChange={onChange}>
        <option value="">All</option>
        <option value="1">Completed</option>
        <option value="2">Not Started</option>
        <option value="3">In Progress</option>
      </select>
</div>
  )

}
