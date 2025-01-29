const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 flex flex-col space-y-3">
      {/* User Name and Username */}
      <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>

      {/* Contact Details */}
      <p className="text-gray-700">
        📧 <span className="font-medium">{user.email}</span>
      </p>
      <p className="text-gray-700">
        📞 <span className="font-medium">{user.phone}</span>
      </p>
      <p className="text-gray-700">
        🌍 <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {user.website}
        </a>
      </p>

      {/* Address */}
      <div className="text-sm text-gray-600">
        <p>🏠 {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
      </div>

      {/* Company Details */}
      <div className="text-sm text-gray-600">
        <p className="font-medium">🏢 {user.company.name}</p>
        <p className="italic">"{user.company.catchPhrase}"</p>
      </div>

      {/* Buttons */}
      <div className="mt-3 flex space-x-2">
        <button
          onClick={() => onEdit(user.id)}
          className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
