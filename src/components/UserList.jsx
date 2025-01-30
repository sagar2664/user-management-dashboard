import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { deleteUser } from "../services/api";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./Appbar";

// UserList component to display a list of users
const UserList = () => {
    // State to store the list of users
    // I need a place to store the users fetched from the API
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch users when the component mounts
    // I want to load the users as soon as the component is rendered
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from the API
    // I need to get the list of users from the server
    const fetchUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data); // Update the state with the fetched users
        } catch (error) {
            console.error("Error fetching users", error); // Log any errors
        }
    };

    // Function to handle user deletion
    // I want to remove a user from the list when the delete button is clicked
    const handleDelete = async (id) => {
        try {
            await deleteUser(id); // Call the API to delete the user
            setUsers(users.filter(user => user.id !== id)); // Update the state to remove the deleted user
        } catch (error) {
            console.error("Error deleting user", error); // Log any errors
        }
    };

    // Function to navigate to the edit page
    // I want to go to the edit page when the edit button is clicked
    const onEdit = (id) => {
        navigate(`/edit/${id}`); // Navigate to the edit page with the user's id
    };

    return (
        <>
            {/* Render the Appbar component */}
            <Appbar />
            {/* Render the list of users */}
            {/* I want to display each user in a card format */}
            <div className="bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
};

export default UserList;