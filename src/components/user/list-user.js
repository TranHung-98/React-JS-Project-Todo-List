import axios from "axios";
import React from "react";
import logo from "../../views/logo.svg";
import DetailUser from "./detailUser";


class ListUser extends React.Component {

  state = {
    listUsers: [],
    selectedUser: false,
  };

  async componentDidMount() {
    try {
      let resp = await axios.get("https://reqres.in/api/users");

      this.setState({
        listUsers: resp && resp.data && resp.data.data ? resp.data.data : [],
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  handleUserClick = (selectedUser) => {
    this.setState({
      selectedUser: selectedUser,
    });
  };

  handleBackClick = () => {
    this.setState({
      selectedUser: null,
    });
  };

  render() {
    const { listUsers, selectedUser } = this.state;

    if (selectedUser) {
      return (
        <DetailUser
          user={selectedUser}
          onBackClick={this.handleBackClick}
        />
      );
    }

    return (
      <div className="list-user-table">
        <img src={logo} className="App-logo" alt="logo" />
        <table>
          <caption>List User Name</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {listUsers.length > 0 ? (
              listUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td
                    onClick={() => this.handleUserClick(user)}
                    className="cursor"
                  >
                    {`${user.first_name} ${user.last_name}`}
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

export default ListUser;





