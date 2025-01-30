// import React from 'react';

// const UserCard = ({ user, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col space-y-4">
//       {/* User Name and Username */}
//       <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
//       <p className="text-sm text-gray-500">@{user.username}</p>

//       {/* Contact Details */}
//       <p className="text-gray-700">
//         📧 <span className="font-medium">{user.email}</span>
//       </p>
//       <p className="text-gray-700">
//         📞 <span className="font-medium">{user.phone}</span>
//       </p>
//       <p className="text-gray-700">
//         🌍 <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//           {user.website}
//         </a>
//       </p>

//       {/* Address */}
//       <div className="text-sm text-gray-600">
//         <p>🏠 {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
//       </div>

//       {/* Company Details */}
//       <div className="text-sm text-gray-600">
//         <p className="font-medium">🏢 {user.company.name}</p>
//         <p className="italic">"{user.company.catchPhrase}"</p>
//       </div>

//       {/* Buttons */}
//       <div className="mt-4 flex space-x-3">
//         <button
//           onClick={() => onEdit(user.id)}
//           className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(user.id)}
//           className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import React, { useState } from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col space-y-2">
      {/* User Name and Username */}
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>

      {/* Contact Details */}
      <p className="text-gray-700">
        📧 <span className="font-medium">{user.email}</span>
      </p>

      {showDetails && (
        <>
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
        </>
      )}

      {/* Buttons */}
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onEdit(user.id)}
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset"
        >
          Delete
        </button>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;