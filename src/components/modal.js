import React from "react";
import { Select } from "./Select";

class Modal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex">
              <h5 className="modal-title">Edit</h5>
              <button type="button">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="todo">Todo</label>
                <input id="todo" type="text" readOnly placeholder="Java and level" />
                <span className="error-message"></span>
              </div>
              <Select />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
