import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6; // Number of users per page

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
        console.log("Edit user with id", id);
    };

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        if (indexOfLastUser < users.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* User Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={handleDelete} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-white bg-gray-500 rounded-lg transition ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                    }`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded-lg">{currentPage}</span>
                <button
                    onClick={nextPage}
                    disabled={indexOfLastUser >= users.length}
                    className={`px-4 py-2 text-white bg-gray-500 rounded-lg transition ${
                        indexOfLastUser >= users.length ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserList;
