import React, { Component } from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { deleteUser, createUser, getData } from "../store/action/actionRedux";
import { ToastContainer } from "react-toastify";
import ModalEditRedux from "../components/modalEditRedux";


class About extends Component {

  state = {
    showModalEdit: false,
    editUserData: {
      id: '',
      username: '',
      password: '',
      email: '',
    },
  };

  componentDidMount() {
    this.props.getData();
  }

  handleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  }

  handleCreateUser = () => {
    this.props.createUser();
  }

  handleEditUser = (user) => {
    this.setState({
      showModalEdit: true,
      editUserData: {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
  }


  // Thực hiện khi đóng modal
  handleCloseModalEdit = () => {
    this.setState({
      showModalEdit: false,
      editUserData: {
        id: '',
        username: '',
        password: '',
        email: '',
      },
    });
  }


  render() {

    const { showModalEdit, editUserData } = this.state;
    const myStyle = {
      display: 'none'
    };
    let listUser = this.props.dataRedux;

    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <div className="list-user-table list-redux-demo">
            <div className="w-100">
              <button
                type="button"
                className="btn-icon float-left"
                onClick={() => this.handleCreateUser()}
              >
                Add new
              </button>
            </div>
            <table>
              <caption>List Users Redux</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  listUser.map((user, index) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {`${user.username}`}
                      </td>
                      <td>{`${user.email}`}</td>
                      <td>{`${user.password}`}</td>
                      <td style={myStyle}>{user.id}</td>
                      <td
                        className="cursor   "
                      >
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => this.handleDeleteUser(user)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button type="button" className="btn-icon"
                          onClick={() => this.handleEditUser(user)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan="5">No Data!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
        {showModalEdit && (
          <ModalEditRedux
            userData={editUserData}
            userId={editUserData.id}
            closeModalEdit={this.handleCloseModalEdit}
          />
        )}
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
    )
  }
}


const mapStateToPorops = (state) => {
  return {
    dataRedux: state.users,
  }
}

const mapDisPatchToProps = (dispatchEvent) => {
  return {
    deleteUser: (userId) => dispatchEvent(deleteUser(userId)),
    createUser: () => dispatchEvent(createUser()),
    getData: () => dispatchEvent(getData()),
  }
}

export default connect(mapStateToPorops, mapDisPatchToProps)(About);
