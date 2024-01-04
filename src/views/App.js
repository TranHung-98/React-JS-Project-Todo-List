import logo from './logo.svg';
import './App.scss';
import Modal from '../components/modal';
import { Button, ButtonDelete } from '../components/button';
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
    show: false
  }

  componentDidMount = () => {
    // Fetch data from the API
    fetch("https://658af354ba789a9622383629.mockapi.io/api/ToDo-List")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with fetched data
        this.setState({ todoData: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  render() {

    const { todoData } = this.state;

    return (
      <>
        <div className="App ">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1> TDO LIST</h1>
          </header>
          <nav className='d-flex navbar'>
            <div>
              <Button />
            </div>
            <div className='d-flex w-20'>
              <div>
                <ButtonDelete />
              </div>
              <SelectFilter />
            </div>
          </nav>
          <footer className='list-foocter border-radius' >
            <div id='list'>
              {todoData.length > 0 ? (
                todoData.map((todoItem) => (
                  <FormInput
                    key={todoItem.id}
                    checkboxValue={todoItem.status === "status 1"}
                    title={todoItem.name}
                    date={new Date(todoItem.createdAt * 1000).toLocaleString()}
                    inputValue={todoItem.todo}
                  />
                ))
              ) : (
                <p>Không có dữ liệu</p>
              )}
            </div>
          </footer>
        </div>
        <Modal />
      </>
    );

  }

}


export default App;
