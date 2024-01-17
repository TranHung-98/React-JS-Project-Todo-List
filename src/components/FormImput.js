import React from "react";
import PropTypes from "prop-types";

class FormInput extends React.Component {
  static propTypes = {
    // other prop types
    editedTodo: PropTypes.shape({
      todo: PropTypes.string,
      date: PropTypes.string,
    }).isRequired,
  };

  handleSaveTodo = (editedTodo) => {
    this.setState({
      editedTodo: editedTodo,
    });
  };

  handleInputChange = (field, value) => {
    const { editTodo, editedTodo } = this.props;
    editTodo({ ...editedTodo, [field]: value });
  };
  render() {
    const {
      title,
      date,
      id,
      status,
      onClickDelete,
      checked,
      onCheckChange,
      editTodo,
      isEditing,
      editedTodo,
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
            {isEditing && editedTodo.id === id ? (
              <>
                <div className="form-input">
                  <input
                    type="text"
                    className="form-control"
                    value={editTodo.todo}
                    // onChange={(e) =>
                    //   editTodo({ ...editedTodo, todo: e.target.value })
                    // }
                    onChange={(e) =>
                      this.handleInputChange("todo", e.target.value)
                    }
                  />
                </div>
                <div className="form-input">
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={editTodo.date}
                    // onChange={(e) =>
                    //   editTodo({ ...editedTodo, date: e.target.value })
                    // }
                    onChange={(e) =>
                      this.handleInputChange("date", e.target.value)
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <p>{title}</p>
                <p>{date}</p>
              </>
            )}
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
            <i className="fa-solid fa-trash icon-click"></i>
          </button>
          {isEditing && editedTodo.id === id ? (
            <>
              <button
                type="button"
                className="btn-icon"
                onClick={() => this.handleSaveTodo(editedTodo)}
              >
                <i className="fa-solid fa-download"></i>
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn-icon" onClick={editTodo}>
                <i className="fa-solid fa-pen icon-click"></i>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default FormInput;
