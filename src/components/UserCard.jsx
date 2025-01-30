import React, { useState } from 'react';

// UserCard component to display user information and actions
const UserCard = ({ user, onEdit, onDelete }) => {
  // State to toggle the visibility of additional user details
  // I want to show/hide more details about the user when a button is clicked
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col space-y-2">
      {/* User Name and Username */}
      {/* Displaying the user's name and username */}
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>

      {/* Contact Details */}
      {/* Showing the user's email */}
      <p className="text-gray-700">
        📧 <span className="font-medium">{user.email}</span>
      </p>

      {showDetails && (
        <>
          {/* Showing more details if showDetails is true */}
          {/* Displaying the user's phone number */}
          <p className="text-gray-700">
            📞 <span className="font-medium">{user.phone}</span>
          </p>
          {/* Displaying the user's website */}
          <p className="text-gray-700">
            🌍 <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {user.website}
            </a>
          </p>

          {/* Address */}
          {/* Showing the user's address */}
          <div className="text-sm text-gray-600">
            <p>🏠 {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
          </div>

          {/* Company Details */}
          {/* Displaying the user's company details */}
          <div className="text-sm text-gray-600">
            <p className="font-medium">🏢 {user.company.name}</p>
            <p className="italic">"{user.company.catchPhrase}"</p>
          </div>
        </>
      )}

      {/* Action Buttons */}
      {/* Buttons to edit, delete, and toggle details */}
      <div className="mt-4 flex space-x-3">
        {/* Edit Button */}
        {/* When clicked, it calls the onEdit function with the user's id */}
        <button
          onClick={() => onEdit(user.id)}
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset cursor-pointer"
        >
          Edit
        </button>
        {/* Delete Button */}
        {/* When clicked, it calls the onDelete function with the user's id */}
        <button
          onClick={() => onDelete(user.id)}
          className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset cursor-pointer"
        >
          Delete
        </button>
        {/* Toggle Details Button */}
        {/* When clicked, it toggles the showDetails state */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset cursor-pointer"
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;