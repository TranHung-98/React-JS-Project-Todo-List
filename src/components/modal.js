import React from "react";
import { Select } from "./Select";
import { ButtonAdd } from "./button";


class Modal extends React.Component {

  state = {
    closeModal: false,
    todo: '',
    date: '',
    status:'',
    errors: {
      todo: '',
      date: '',
      status: '',
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
        todo: '',
      },
    });
  };

  handleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
      errors: {
        ...this.state.errors,
        date: '',
      },
    });
  };

  handleChangeStatus = (event) => {
    this.setState({
      status: event.target.value,
      errors: {
        ...this.state.errors,
        status: '',
      },
    });
  };

  handleSubmit = () => {
    const { todo, date, status } = this.state;

    let errors = {};

    if (!todo.trim()) {
      errors.todo = 'Todo is required';
    }

    // Validate date
    if (!date) {
      errors.date = 'Date is required';
    }

    // Validate status
    if (!status) {
      errors.status = 'Status is required';
    }

    // Update state with errors
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      // The rest of your code remains unchanged
      // Gửi dữ liệu lên server
      fetch("https://658af354ba789a9622383629.mockapi.io/api/ToDo-List", {
        method: "POST",
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
          // Xử lý phản hồi từ server nếu cần
          console.log("Data added successfully:", data);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding data:", error);
        });

      // Đóng modal sau khi gửi dữ liệu lên
      this.handleCloseModal();

      this.handleCloseModal();
    }

  };


  render() {
    const { closeModal, todo, date,status,errors } = this.state;

    return (
      <>
        {!closeModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex">
                  <h5 className="modal-title">Add Row</h5>
                  <p onClick={this.handleCloseModal}>&times;</p>
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
                    style={{ border: errors.todo ? '1px solid red' : '' }}
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
                    style={{ border: errors.date ? '1px solid red' : '' }}
                  />
                  <span className="error-message">{errors.date}</span>
                </div>
                <Select
                value={status} onChange={this.handleChangeStatus}
                  errors={errors.status}
                />
              </div>
              <div className="modal-footer">
                <ButtonAdd onClick={this.handleSubmit} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}



export default Modal;

