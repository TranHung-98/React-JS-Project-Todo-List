import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../store/action/actionRedux";

class ModalEditRedux extends React.Component {

  state = {
    closeModal: false,
    id: this.props.userData.id || "",
    username: this.props.userData.username || "",
    password: this.props.userData.password || "",
    email: this.props.userData.email || ""
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleSave = () => {

    const { username, email, password, id } = this.state;
    const { userId, updateUser } = this.props;

    const updatedUserData = {
      id: id,
      username: username,
      email: email,
      password: password
    };


    console.log("changer >>>>", updatedUserData, "useer >>>>", userId)

    updateUser(userId, updatedUserData);

    this.handleCloseModal();
  }


  render() {
    const { username, email, password, closeModal, id } = this.state;
    return (
      <>
        {!closeModal && (
          <div className="modal bg-none">
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
                  <label htmlFor="username">Id</label>
                  <input
                    id="number"
                    type="text"
                    placeholder="Java and level"
                    value={id}
                    readOnly
                  />
                  <span className="error-message"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="username">UserName</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Java and level"
                    value={username}
                    onChange={this.handleChangeUsername}
                  />
                  <span className="error-message"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={this.handleChangePassword}
                  />
                  <span className="error-message"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={this.handleChangeEmail}
                  />
                  <span className="error-message"></span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="text-color btn-big bg-primary border-radius"
                  onClick={this.handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    users: state.userId,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userId, updatedUserData) => dispatch(updateUser(userId, updatedUserData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditRedux);
