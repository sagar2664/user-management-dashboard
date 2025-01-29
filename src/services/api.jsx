import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// While debugging, we can use these error messages 
// to identify the source of the error
const ERROR_FETCH_USERS = "Failed to fetch users";
const ERROR_FETCH_USER = "Failed to fetch user";
const ERROR_ADD_USER = "Failed to add user";
const ERROR_UPDATE_USER = "Failed to update user";
const ERROR_DELETE_USER = "Failed to delete user";


// Function to handle errors
const handleError = (error, errorMessage) => {
  console.error(error);
  return { error: errorMessage };
};

const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return handleError(error, ERROR_FETCH_USERS);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error, ERROR_FETCH_USER);
  }
};

const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    return handleError(error, ERROR_ADD_USER);
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    return handleError(error, ERROR_UPDATE_USER);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error, ERROR_DELETE_USER);
  }
};

export default {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};