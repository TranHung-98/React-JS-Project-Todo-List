import logo from './logo.svg';
import './App.scss';
import Modal from '../components/modal';
import { Button, ButtonDelete, ButtonSelectAll } from '../components/button';
import { SelectFilter } from '../components/Select';
import FormInput from '../components/FormImput';
import React, { Component } from 'react';



/**
 * 2 component:
 *  1. class cmponent
 *  2. function component (
 *  + function App() {}
 *  + cont App = () => {}
 *  ,arrow)
 * Compponent là 1 function và class
 */


class App extends Component {

  state = {
    todoData: [],
    show: false,
    allChecked: false,
    isDeleteEnabled: false,
    filter: '',
  }

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
          date: new Date(todoItem.date).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }));

        // Update state with formatted data
        this.setState({
          todoData: formattedTodoData
        });

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  handleAddTaskClick = () => {
    this.setState({ show: true });
  };


  handleChangeFilter = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };


  handleClickDelete = (todo) => {
      this.deleteTodo(todo);
  }


  deleteTodo = (todo) => {
    const todoList = this.state.todoData;

    this.setState({
      todoData: todoList.filter(item => item.id !== todo.id)
    });


    fetch(`https://658af354ba789a9622383629.mockapi.io/api/ToDo-List/${todo.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Todo deleted successfully on the server');
      })
      .catch(error => {
        console.error('Error deleting todo on the server:', error);
      });
  }


  render() {

    const { todoData, show, filter } = this.state;

    return (
      <>
        <div className="App ">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1> TODO LIST</h1>
          </header>
          <nav className='d-flex navbar'>
            <div>
              <Button onClick={this.handleAddTaskClick} />
              <ButtonSelectAll />
            </div>
            <div className='d-flex w-20'>
              <div className=''>
                <ButtonDelete />
              </div>
              <SelectFilter value={filter} onChange={this.handleChangeFilter} />
            </div>
          </nav>
          <footer className='list-foocter border-radius' >
            <div id='list'>
              {todoData.length > 0 ? (
                todoData.map((todoItem, index) => (
                  <FormInput
                    key={todoItem.id}
                    id={todoItem.id}
                    title={todoItem.todo}
                    date={todoItem.date}
                    status={todoItem.status}
                    inputValue={todoItem.todo}
                    onClickDelete={() => this.handleClickDelete(todoItem)}
                  />
                ))
              ) : (
                <p>Không có dữ liệu!</p>
              )}
            </div>
          </footer>
        </div>
        {show && <Modal onClose={() => this.setState({ show: false })} />}
      </>
    );

  }

}


export default App;
