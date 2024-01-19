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

export class ButtonEdit extends React.Component {
  render() {
    return (
      <button
        type="submit"
        className="text-color btn-big bg-primary border-radius"
        onClick={this.props.onClick}
      >
        Save
      </button>
    );
  }
}


export class ButtonDelete extends React.Component {
  render() {
    return (
      <button type="button" className="text-color bg-success border-radius">
        Delete
      </button>
    );
  }
}

export function ButtonSelectAll({ onClick }) {
  return (
    <button
      type="button"
      className="text-color bg-success border-radius"
      onClick={() => {
        onClick();
      }}
    >
      Select  <i className="fa-solid fa-circle-check"></i> / <i className="fa-solid fa-circle-xmark"></i>
    </button>
  );
}
