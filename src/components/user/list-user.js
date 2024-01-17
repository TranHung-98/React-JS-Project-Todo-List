import React from "react";
import axios from "axios";

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

  };

  render() {
    const { listUsers } = this.state
    return (
      <div className="list-user-table">
        <table>
          <caption>List Users</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {listUsers.length > 0 ? (
              listUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img src={user.avatar} alt={`User ${user.id}`} />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="6">No Data!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}

export default ListUser;
