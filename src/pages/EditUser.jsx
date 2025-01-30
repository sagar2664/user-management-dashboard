import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";
import UserForm from "../components/UserForm";

// EditUser component to handle editing an existing user
const EditUser = () => {
  const { id } = useParams(); // I need the user ID from the URL to fetch the correct user
  const navigate = useNavigate(); // I need this to navigate to different pages
  const [user, setUser] = useState(null); // State to store the user data

  // Fetch the user data when the component mounts or the ID changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id); // Call the API to get the user data
        setUser(response.data); // Update the state with the fetched user data
      } catch (error) {
        console.error("Error fetching user:", error); // Log any errors
      }
    };
    fetchUser(); // Call the function to fetch the user data
  }, [id]); // Dependency array to re-run the effect if the ID changes

  // Function to handle form submission
  // When the form is submitted, I want to update the user and then navigate back to the home page
  const handleSubmit = async (updatedUser) => {
    try {
      const response = await updateUser(id, updatedUser); // Call the API to update the user
      // to see the status of the response
      console.log(response); // Log the response for debugging
      navigate("/"); // Navigate back to the home page after updating the user
    } catch (error) {
      console.error("Error updating user:", error); // Log any errors
    }
  };

  // Render the UserForm component with the fetched user data
  // If the user data is not yet fetched, show a loading message
  return user ? <UserForm onSubmit={handleSubmit} initialData={user} /> : <p>Loading...</p>;
};

export default EditUser;