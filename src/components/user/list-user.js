import axios from "axios";
import React from "react";
import logo from "../../views/logo.svg";
import { withRouter, Link } from "react-router-dom";

class ListUser extends React.Component {
  state = {
    listUsers: [],
  };

  async componentDidMount() {
    try {
      let resp = await axios.get('https://reqres.in/api/users');

      this.setState({
        listUsers: resp && resp.data && resp.data.data ? resp.data.data : [],
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  handleViewDetailUser = (user) => {
    this.props.history.push(`/user/${user.id}`);
  }

  render() {
    const { listUsers } = this.state;

    return (
      <div className="list-user-table">
        <img src={logo} className="App-logo" alt="logo" />
        <table>
          <caption>List Users</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {listUsers.length > 0 ? (
              listUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td onClick={this.handleViewDetailUser(user)}>
                    {/* {user.first_name} {user.last_name} */}
                    <Link className="text-color" to={{ pathname: `/user/${user.id}` }}>{`${user.first_name} ${user.last_name}`}</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="2">No Data!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(ListUser);
