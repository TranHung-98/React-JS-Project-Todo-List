import React from "react";
import logo from "../../views/logo.svg"
import { Link } from "react-router-dom";


class DetailUser extends React.Component {
  render() {
    const { user, onBackClick } = this.props;
    return (
      <div className="list-user-table detail-user">
        <img src={logo} className="App-logo" alt="logo" />
        <table>
          <caption>User Item</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.avatar} alt="Avatar" />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/user" className="m-2 come-back text-color"
          onClick={onBackClick}
        >
          <i className="fa-solid fa-backward"></i> Back
        </Link>
      </div>
    );
  }
}

export default DetailUser;


