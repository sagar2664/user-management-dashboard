import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (updatedUser) => {
    try {
      const response=await updateUser(id, updatedUser);
      //to see the status of the response
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return user ? <UserForm onSubmit={handleSubmit} initialData={user} /> : <p>Loading...</p>;
};

export default EditUser;

