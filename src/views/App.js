import logo from './logo.svg';
import './App.scss';
import Modal from '../components/modal';
import { Button, ButtonDelete } from '../components/button';
import { SelectFilter } from '../components/Select';


/**
 * 2 component:
 *  1. class cmponent
 *  2. function component (
 *  + function App() {}
 *  + cont App = () => {}
 *  ,arrow)
 * Compponent là 1 function và class
 */

function App() {
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
          <div id='list'></div>
      </footer>
    </div>
      <Modal/>
    </>
  );
}

export default App;
