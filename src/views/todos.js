import "./App.scss";
import logo from "./logo.svg";
import Modal from "../components/modal";
import { Button, ButtonDelete, ButtonSelectAll } from "../components/button";
import { SelectFilter } from "../components/Select";
import FormInput from "../components/FormImput";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    todoData: [],
    show: false,
    allChecked: false,
    isDeleteEnabled: false,
    filter: "",
    checkedItems: {},
    editedTodo: {},
    isEditing: false,
  };

  // Tạo mới todolist k cần load trang
  addNewTodoToList = (newTodo) => {
    this.setState((prevState) => ({
      todoData: [...prevState.todoData, newTodo],
    }));
  };

  handleEditTodo = (todo) => {
    console.log("handleEditTodo >>>>>>>>", todo);
    this.setState({
      editedTodo: { ...todo, todo },
      isEditing: true,
    });
  };

  // ================= Call Add data ================= //
  componentDidMount = () => {
    fetch("https://658af354ba789a9622383629.mockapi.io/api/ToDo-List")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((data) => {
        const formattedTodoData = data.map((todoItem) => ({
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
          // todoData: data,
        });
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }; // End call add

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
      const checkedItems = { ...prevState.checkedItems };

      if (prevState.checkedItems && prevState.checkedItems[id] !== undefined) {
        checkedItems[id] = !prevState.checkedItems[id];
      } else {
        checkedItems[id] = true;
      }

      return { checkedItems };
    });
  };

  // =================  Delete by id  call  ================= //
  deleteATodo = (todo) => {
    const todoList = this.state.todoData;

    this.setState({
      todoData: todoList.filter((item) => item.id !== todo.id),
    });

    fetch(
      `https://658af354ba789a9622383629.mockapi.io/api/ToDo-List/${todo.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast.success("Delete Successfully!");
      })
      .catch((error) => {
        toast.error("Deletion unsuccessful!");
      });
  }; // End Call delete

  render() {
    const { todoData, show, filter, checkedItems, isEditing, editedTodo } =
      this.state;

    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>TODO LIST</h1>
        </header>
        <nav className="d-flex navbar-todo">
          <div>
            <Button onClick={this.handleAddTaskClick} />
            <ButtonSelectAll />
          </div>
          <div className="d-flex w-20">
            <div className="">
              <ButtonDelete />
            </div>
            <SelectFilter value={filter} onChange={this.handleChangeFilter} />
          </div>
        </nav>
        <footer className="list-foocter border-radius">
          <div id="list">
            {todoData.length > 0 && todoData ? (
              todoData.map((todoItem, index) => (
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
                  isEditing={isEditing}
                  editedTodo={editedTodo}
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
