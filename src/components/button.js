import React from "react";


export class Button extends React.Component {
  render() {
    return (
      <button
        type="submit"
        className="text-color bg-primary border-radius"
        onClick={this.props.onClick}
      >
        Add Task
      </button>
    );
  }
}

export class ButtonAdd extends React.Component {
  render() {
    return (
      <button
        type="submit"
        className="text-color btn-big bg-primary border-radius"
        onClick={this.props.onClick}
      >
        Add Task
      </button>
    );
  }
}

export function ButtonDelete({ isEnabled }) {
  return (
    <button
      type="button"
      className="text-color bg-success border-radius"
      disabled={!isEnabled}
    >
      Delete
    </button>
  );
}

export function ButtonSelectAll() {
  return (
    <button type="button" className="text-color bg-success border-radius">
      Select All
    </button>
  );
}


