import axios from 'axios';
import { toast } from "react-toastify";

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://65afd90e2f26c3f2139be446.mockapi.io/user/user/${userId}`);
      dispatch({ type: 'DELETE_USER', payload: { id: userId } });
      toast.success("Delete Successfully!");
    } catch {
      toast.error("Delete unsuccessful!")
    }
  };
};

export const createUser = () => {
  return async (dispatch) => {
    try {
      let id = Math.floor(Math.random() * 100000);
      let user = {
        id: id,
        username: `username${id}`,
        password: `password${id}`,
        email: `email${id}@gmail.com`
      };
      const response = await axios.post('https://65afd90e2f26c3f2139be446.mockapi.io/user/user', user);
      dispatch({ type: 'CREATE_USER', payload: response.data });
      toast.success("Add User Successfully!");
    } catch { }
  };
};

export const updateUser = (userId, updatedUserData) => {
  console.log("up>>>>>", userId, " >>>>>>>", updatedUserData)
  return async (dispatch) => {
    try {
      const response = await axios.put(`https://65afd90e2f26c3f2139be446.mockapi.io/user/user/${userId}`, updatedUserData);
      dispatch({ type: 'UPDATE_USER', payload: response.data });
      toast.success("Update Successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
};

export const getData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://65afd90e2f26c3f2139be446.mockapi.io/user/user');
      dispatch({ type: 'GET_DATA_SUCCESS', payload: response.data });
    } catch { }
  };
};
