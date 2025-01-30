import { useNavigate } from "react-router-dom";
import { addUser } from "../services/api";
import UserForm from "../components/UserForm";

// AddUser component to handle adding a new user
const AddUser = () => {
  const navigate = useNavigate(); // I need this to navigate to different pages

  // Function to handle form submission
  // When the form is submitted, I want to add the new user and then navigate back to the home page
  const handleSubmit = async (user) => {
    try {
      await addUser(user); // Call the API to add the user
      navigate("/"); // Navigate back to the home page after adding the user
    } catch (error) {
      console.error("Error adding user:", error); // Log any errors
    }
  };

  // Render the UserForm component and pass the handleSubmit function to it
  // I want to reuse the UserForm component for adding a new user
  return <UserForm onSubmit={handleSubmit} />;
};

export default AddUser;