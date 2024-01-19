import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../views/logo.svg"
import { Link } from "react-router-dom";


const DetailUser = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching data
        let resp = await axios.get(`https://reqres.in/api/users/${user.id}`);
        setUserDetails(resp && resp.data ? resp.data : null);
      } catch (error) {
        console.error("Error fetching user details:", error);
        console.error("Axios error details:", error.response);
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <div className="list-user-table detail-user">
      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <>
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
                <td>{userDetails.id}</td>
                <td>{`${userDetails.first_name} ${userDetails.last_name}`}</td>
                <td>{userDetails.email}</td>
                <td>
                  <img src={userDetails.avatar} alt="Avatar" />
                </td>
              </tr>
            </tbody>
          </table>
          <Link to="/user" className="m-2 come-back text-color">
            <i className="fa-solid fa-backward"></i> Back
          </Link>
        </>
      ) : (
        <p>No details available for the selected user.</p>
      )}
    </div>
  );
};

export default DetailUser;


