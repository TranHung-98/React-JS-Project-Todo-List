import axios from 'axios';
import { toast } from "react-toastify";

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://65afd90e2f26c3f2139be446.mockapi.io/user/user/${userId}`);
      dispatch({ type: 'DELETE_USER', payload: { id: userId } });
      toast.success("Delete Successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.response);
    }
  };
};

export const createUser = () => {
  return async (dispatch) => {
    try {
      let id = Math.floor(Math.random() * 100000);
      let user = {
        id: id,
        username: `random${id}`,
        password: `password${id}`
      };
      const response = await axios.post('https://65afd90e2f26c3f2139be446.mockapi.io/user/user', user);
      dispatch({ type: 'CREATE_USER', payload: response.data });
      toast.success("Add user Successfully!");
    } catch (error) {
      console.error("Error creating user:", error.response);
    }
  };
};

export const updateUser = (userId, updatedUserInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`https://65afd90e2f26c3f2139be446.mockapi.io/user/user/${userId}`, updatedUserInfo);

      dispatch({ type: 'UPDATE_USER', payload: { id: userId, updatedUserInfo } });
    } catch (error) {
      console.error("Error updating user:", error.response);
    }
  };
};


export const getData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://65afd90e2f26c3f2139be446.mockapi.io/user/user');
      dispatch({ type: 'GET_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
