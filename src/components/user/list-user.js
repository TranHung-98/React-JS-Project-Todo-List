import axios from "axios";
import React from "react";
import logo from "../../views/logo.svg";
import { Link } from "react-router-dom";
import DetailUser from "./detailUser";


class ListUser extends React.Component {
  state = {
    listUsers: [],
    selectedUser: null,
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

  handleUserClick = async (userId) => {
    try {
      let resp = await axios.get(`https://reqres.in/api/users/${userId}`);

      this.setState({
        selectedUser: resp && resp.data ? resp.data : null,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      console.error("Axios error details:", error.response);
    }
  };

  render() {
    const { listUsers, selectedUser } = this.state;
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
              listUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td onClick={() => this.handleUserClick(user)}>
                    <Link className="text-color" to={`/user/${user.id}`}>
                      {`${user.first_name} ${user.last_name}`}
                    </Link>
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
        {selectedUser && <DetailUser user={selectedUser} />}
      </div>
    );
  }
}



export default ListUser;





