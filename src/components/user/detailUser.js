import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import logo from "../../views/logo.svg"

class DetailUser extends React.Component {

  state = {
    user: {}
  }

  async componentDidMount() {

    if (this.props.match && this.props.match.params) {
      let id = this.props.match.params.id;

      let res = await axios.get(`https://reqres.in/api/users/${id}`)

      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {}
      })
    }

  }

  handleBackButton = () => {
    this.props.history.push("/user")
  }


  render() {


    const { user } = this.state;

    let isEmptyObj = Object.keys(user).length === 0;

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
            {isEmptyObj === false &&
              <tr>
                <td>{user.id}</td>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.avatar} alt="Avatar" />
                </td>
              </tr>
            }
          </tbody>
        </table>
        <button type="button" className="m-2"
          onClick={() => this.handleBackButton()}
        >Back</button>
      </div>
    );
  }
}

export default withRouter(DetailUser);
