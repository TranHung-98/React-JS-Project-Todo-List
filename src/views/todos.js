import "../style/App.scss";
import logo from "./logo.svg";
import Modal, { ModalEdit } from "../components/modal";
import { Button, ButtonSelectAll } from "../components/button";
import { SelectFilter } from "../components/Select";
import FormInput from "../components/FormImput";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


/**
 * 2 component:
 *  1. class cmponent
 *  2. function component (
 *  + function App() {}
 *  + cont App = () => {}
 *  ,arrow)
 * Compponent là 1 function và class
 */

class Todo extends Component {
  state = {
    filter: "",
    show: false,
    todoData: [],
    editedTodo: {},
    isEditing: false,
    showEdit: false,
    allChecked: false,
    checkedItems: {},
    isDeleteEnabled: false,
  };


  // Tạo mới todolist k cần load trang
  addNewTodoToList = (newTodo) => {
    this.setState((prevState) => ({
      todoData: [...prevState.todoData, newTodo],
    }));
  };

  handleEditTodo = (todo) => {

    const formattedDate = new Date(todo.date).toISOString().slice(0, -8);
    const todoWithFormattedDate = { ...todo, date: formattedDate };

    this.setState({
      showEdit: true,
      editedTodo: todoWithFormattedDate,
    })
  };

  handleEditSubmit = (updatedTodo) => {
    // Update the todoData array with the editedTodo
    const updatedTodoData = this.state.todoData.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );

    const formattedTodoData = updatedTodoData.map((todoItem) => ({
      ...todoItem,
      date: new Date(todoItem.date).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }));

    this.setState({
      todoData: formattedTodoData,
    });
  };

  // ================= Call Add data ================= //
  async componentDidMount() {
    try {
      let response = await axios.get("https://658af354ba789a9622383629.mockapi.io/api/ToDo-List");

      if (response.data && response.data.length > 0) {
        const formattedTodoData = response.data.map((todoItem) => ({
          ...todoItem,
          date: new Date(todoItem.date).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }));

        this.setState({
          todoData: formattedTodoData,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }//End Add

  handleAddTaskClick = () => {
    this.setState({ show: true });
  };


  handleChangeFilter = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  handleClickDelete = (todo) => {
    this.deleteATodo(todo);
  };

  handleCheckedOnEnableRemove = (id) => {
    this.setState((prevState) => {
      const checkedItems = { ...prevState.checkedItems, [id]: !prevState.checkedItems[id] };

      const totalItems = prevState.todoData.length;
      const checkedCount = Object.values(checkedItems).filter(Boolean).length;

      const allChecked = checkedCount === totalItems;
      const indeterminate = checkedCount > 0 && checkedCount < totalItems;

      return { checkedItems, allChecked, indeterminate };
    });
  };

  handleSeleckAllChecked = () => {
    this.setState((prevState) => ({
      allChecked: !prevState.allChecked,
      checkedItems: prevState.allChecked
        ? {} // Uncheck all when toggling off
        : prevState.todoData.reduce((items, todo) => {
          items[todo.id] = true;
          return items;
        }, {}),
      indeterminate: false, // Reset indeterminate state
    }));
  };


  // =================  Delete by id  call  ================= //
  deleteATodo = (todo) => {
    const todoList = this.state.todoData;

    this.setState({
      todoData: todoList.filter((item) => item.id !== todo.id),
    });

    axios.delete(
      `https://658af354ba789a9622383629.mockapi.io/api/ToDo-List/${todo.id}`
    )
      .then((response) => {
        toast.success("Delete Successfully!");
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
        toast.error("Deletion unsuccessful!");
      });
  };

  render() {
    const { todoData, show, filter, checkedItems, showEdit, allChecked } =
      this.state;

    const filteredTodoData = todoData.filter(todoItem => {
      if (filter === "") {
        return true;
      } else {
        return todoItem.status === filter;
      }
    });

    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>TODO LIST</h1>
        </header>
        <nav className="d-flex navbar-todo">
          <div>
            <Button onClick={this.handleAddTaskClick} />
          </div>
          <div className="d-flex w-20">
            <div className="">
              <ButtonSelectAll
                onClick={this.handleSeleckAllChecked}
                indeterminate={this.state.indeterminate}
              />
            </div>
            <SelectFilter value={filter} onChange={this.handleChangeFilter} />
          </div>
        </nav>
        <footer className="list-foocter border-radius">
          <div id="list">
            {filteredTodoData.length > 0 && filteredTodoData ? (
              filteredTodoData.map((todoItem, index) => (
                <FormInput
                  key={todoItem.id}
                  id={todoItem.id}
                  title={todoItem.todo}
                  date={todoItem.date}
                  status={todoItem.status}
                  inputValue={todoItem.todo}
                  onClickDelete={() => this.handleClickDelete(todoItem)}
                  checked={!!checkedItems[todoItem.id]}
                  onCheckChange={() =>
                    this.handleCheckedOnEnableRemove(todoItem.id)
                  }
                  editTodo={() => this.handleEditTodo(todoItem)}
                  allChecked={allChecked}
                />
              ))
            ) : (
              <p className="empty-data">Không có dữ liệu!</p>
            )}
          </div>
        </footer>
        {show && (
          <Modal
            onClose={() => this.setState({ show: false })}
            addNewTodoToList={this.addNewTodoToList}
          />
        )}

        {showEdit && (
          <ModalEdit
            onClose={() => this.setState({ showEdit: false })}
            editedTodo={this.state.editedTodo}
            onEditSubmit={this.handleEditSubmit}
          />
        )
        }
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }
}

export default Todo;
