import React from "react";

export function Select() {
  return (
    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select id="status" className="form-control text-color border-radius">
        <option value="">Open this select menu</option>
        <option value="Completed">Completed</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
      </select>
      <span className="error-message"></span>
    </div>
  );
}


export  function SelectFilter () {

  return (

<div className="form-group">
      <select className="form-control  text-color border-radius border">
        <option value="Filter">Filter</option>
        <option value="">All</option>
        <option value="Completed">Completed</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
      </select>
</div>
  )

}
