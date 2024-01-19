import React from "react";

class FormInput extends React.Component {

  render() {
    const {
      title,
      date,
      id,
      status,
      onClickDelete,
      checked,
      onCheckChange,
      editTodo
    } = this.props;

    return (
      <div
        className={`bg-white flex ${status === "1"
          ? "bg-light"
          : status === "2"
            ? "bg-warning"
            : "bg-white"
          }`}
      >
        <div className="flex fix">
          <input
            type="checkbox"
            value={id}
            checked={checked}
            onChange={onCheckChange}
          />
          <div className="text-left todo-show">
            <p>{title}</p>
            <p>{date}</p>
          </div>
          <input type="text" value={id} disabled />
        </div>
        <div className="remove-edit">
          <button
            type="button"
            className="btn-icon"
            disabled={!checked}
            onClick={onClickDelete}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button type="button" className="btn-icon" onClick={editTodo}>
            <i className="fa-solid fa-pen"></i>
          </button>

        </div>
      </div>
    );
  }
}

export default FormInput;
