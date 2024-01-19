import React from "react";
import { Select } from "./Select";
import { ButtonAdd, ButtonEdit } from "./button";
import { toast } from "react-toastify";
import axios from 'axios';


class Modal extends React.Component {
  state = {
    closeModal: false,
    todo: "",
    date: "",
    status: "",
    errors: {
      todo: "",
      date: "",
      status: "",
    },
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
    this.props.onClose();
  };

  handleChangeTodo = (event) => {
    this.setState({
      todo: event.target.value,
      errors: {
        ...this.state.errors,
        todo: "",
      },
    });
  };

  handleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
      errors: {
        ...this.state.errors,
        date: "",
      },
    });
  };

  handleChangeStatus = (event) => {
    this.setState({
      status: event.target.value,
      errors: {
        ...this.state.errors,
        status: "",
      },
    });
  };


  handleSubmit = async () => {
    const { todo, date, status } = this.state;
    let errors = {};

    if (!todo.trim()) {
      errors.todo = "Todo is required";
    }

    // Validate date
    if (!date) {
      errors.date = "Date is required";
    }

    // Validate status
    if (!status) {
      errors.status = "Status is required";
    }

    // Update state with errors
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://658af354ba789a9622383629.mockapi.io/api/ToDo-List",
          {
            todo: todo,
            date: date,
            status: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        let formattedDate = new Date(data.date).toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        data.date = formattedDate;
        this.props.addNewTodoToList(data);
        toast.success("Add Successfully!");

        // Đóng modal sau khi gửi dữ liệu lên
        this.handleCloseModal();
      } catch {
        toast.error("Add is unsuccessful!");
      }
    }
  };




  render() {
    const { closeModal, todo, date, status, errors } = this.state;

    return (
      <>
        {!closeModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex">
                  <h5 className="modal-title">Add Row</h5>
                  <p onClick={this.handleCloseModal} className="close">
                    &times;
                  </p>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="todo">Todo</label>
                  <input
                    id="todo"
                    type="text"
                    placeholder="Java and level"
                    value={todo}
                    onChange={this.handleChangeTodo}
                    style={{ border: errors.todo ? "1px solid red" : "" }}
                  />
                  <span className="error-message">{errors.todo}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="datetime-local"
                    value={date}
                    onChange={this.handleChangeDate}
                    style={{ border: errors.date ? "1px solid red" : "" }}
                  />
                  <span className="error-message">{errors.date}</span>
                </div>
                <Select
                  value={status}
                  onChange={this.handleChangeStatus}
                  errors={errors.status}
                />
              </div>
              <div className="modal-footer">
                <ButtonAdd
                  onClick={this.handleSubmit}
                  addNewTodoList={() => this.addNewTodoList()}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}


export default Modal;



export class ModalEdit extends React.Component {

  state = {
    closeModal: false,
    todo: this.props.editedTodo.todo || "",
    date: this.props.editedTodo.date || "",
    status: this.props.editedTodo.status || "",
    errors: {
      todo: "",
      date: "",
      status: "",
    },
  };


  handleCloseModal = () => {
    this.setState({ closeModal: true });
    this.props.onClose();
  };

  handleChangeTodo = (event) => {
    this.setState({
      todo: event.target.value,
      errors: {
        ...this.state.errors,
        todo: "",
      },
    });
  };

  handleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
      errors: {
        ...this.state.errors,
        date: "",
      },
    });
  };

  handleChangeStatus = (event) => {
    this.setState({
      status: event.target.value,
      errors: {
        ...this.state.errors,
        status: "",
      },
    });
  };

  handleSubmit = () => {
    const { todo, date, status } = this.state;
    const { editedTodo, onEditSubmit } = this.props;

    let errors = {};

    if (!todo.trim()) {
      errors.todo = "Todo is required";
    }

    // Validate date
    if (!date) {
      errors.date = "Date is required";
    }

    // Validate status
    if (!status) {
      errors.status = "Status is required";
    }

    // Update state with errors
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      // Gửi dữ liệu lên server
      fetch(`https://658af354ba789a9622383629.mockapi.io/api/ToDo-List/${editedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: todo,
          date: date,
          status: status,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          onEditSubmit({ ...editedTodo, todo, date, status });
          toast.success("Update Successfully!");
        })
        .catch(() => {
          toast.error("Update is unsuccessful!");
        });

      // Đóng modal sau khi gửi dữ liệu lên
      this.handleCloseModal();
    }
  };

  render() {
    const { closeModal, todo, date, status, errors } = this.state;
    const { openEdit } = this.props;
    return (
      <>
        {!closeModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex">
                  <h5 className="modal-title">Edit Row</h5>
                  <p onClick={this.handleCloseModal} className="close">
                    &times;
                  </p>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="todo">Todo</label>
                  <input
                    id="todo"
                    type="text"
                    placeholder="Java and level"
                    value={todo}
                    onChange={this.handleChangeTodo}
                    style={{ border: errors.todo ? "1px solid red" : "" }}
                  />
                  <span className="error-message">{errors.todo}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="datetime-local"
                    value={date}
                    onChange={this.handleChangeDate}
                    style={{ border: errors.date ? "1px solid red" : "" }}
                  />
                  <span className="error-message">{errors.date}</span>
                </div>
                <Select
                  value={status}
                  onChange={this.handleChangeStatus}
                  errors={errors.status}
                />
              </div>
              <div className="modal-footer">
                <ButtonEdit
                  openEdit={openEdit}
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

}
