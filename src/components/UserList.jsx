import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { deleteUser } from "../services/api";

const UserList = () => {

    const [users, setUsers] = useState([]);

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

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <ul className="list-disc pl-5">
                {users.map(user => (
                    <li key={user.id} className="mb-2 flex justify-between items-center">
                        <span>{user.name}</span>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList
