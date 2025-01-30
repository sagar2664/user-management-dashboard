import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { deleteUser } from "../services/api";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const onEdit = (id) => {
        //will navigate to the edit page
        navigate(`/edit/${id}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default UserList