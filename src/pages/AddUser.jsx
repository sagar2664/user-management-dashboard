import { useNavigate } from "react-router-dom";
import { addUser } from "../services/api";
import UserForm from "../components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      await addUser(user);
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return <UserForm onSubmit={handleSubmit} />;
};

export default AddUser;
