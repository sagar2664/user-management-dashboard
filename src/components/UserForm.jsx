import { useState } from "react";
import { Link } from "react-router-dom";

// UserForm component to handle user data input and submission
const UserForm = ({ onSubmit, initialData }) => {
  // Initialize state with user data, errors, and popup visibility
  // I want to set up the initial state for the form, using initialData if provided, otherwise setting default empty values
  const [state, setState] = useState({
    user: initialData || {
      name: "",
      username: "",
      email: "", 
      address: {
        street: "",
        suite: "", 
        city: "", 
        zipcode: "", 
        geo: {
          lat: "", 
          lng: "" 
        }
      },
      phone: "", 
      website: "", 
      company: {
        name: "", 
        catchPhrase: "", 
        bs: "" 
      }
    },
    errors: {}, // To store validation errors
    isPopupVisible: false, // To control the visibility of the popup message
    popupMessage: '' // To store the message to be displayed in the popup
  });

  // Handle input changes and update state
  // I want to update the state dynamically based on the input field that changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setState((prev) => {
      let updatedUser = { ...prev.user };
      let temp = updatedUser;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value; // Update the final key with the new value
        } else {
          temp = temp[key]; // Traverse to the nested key
        }
      });
      return { ...prev, user: updatedUser }; // Return the updated state
    });
  };

  // Validate user input and return errors if any
  // I want to ensure that all required fields are filled out correctly
  const validate = () => {
    const newErrors = {};
    if (!state.user.name) newErrors.name = "Name is required";
    if (!state.user.username) newErrors.username = "Username is required";
    if (!state.user.email) newErrors.email = "Email is required";
    if (!state.user.address.street) newErrors["address.street"] = "Street is required";
    if (!state.user.address.city) newErrors["address.city"] = "City is required";
    if (!state.user.phone) newErrors.phone = "Phone is required";
    if (!state.user.company.name) newErrors["company.name"] = "Company name is required";

    const err = [];
    for (const key in newErrors) {
      if (newErrors[key]) err.push(newErrors[key]); // Collect all error messages
    }
    return { err, newErrors }; // Return errors and error messages
  };

  // Handle form submission
  // I want to validate the form and either show errors or submit the data
  const handleSubmit = (e) => {
    e.preventDefault();
    const { err, newErrors } = validate();
    if (err.length > 0) {
      setState((prev) => ({
        ...prev,
        errors: newErrors, // Set validation errors
        popupMessage: err.join(', '), // Show all error messages in the popup
        isPopupVisible: true // Show the popup
      }));
    } else {
      setState((prev) => ({
        ...prev,
        errors: {}, // Clear errors
        popupMessage: 'User added successfully!', // Success message
        isPopupVisible: true // Show the popup
      }));
      onSubmit(state.user); // Call the onSubmit function with user data
    }
  };

  // Close the popup message
  // I want to hide the popup when the user clicks the close button
  const closePopup = () => {
    setState((prev) => ({ ...prev, isPopupVisible: false }));
  };

  // Render input fields with labels and error messages
  // I want to create a reusable input field component
  const renderInput = (label, name, type = "text") => (
    <div className="sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          value={name.split('.').reduce((acc, key) => acc[key], state.user)} // Get the value from the nested state
          onChange={handleChange} // Handle input change
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        {state.errors[name] && <span className="text-sm text-red-600">{state.errors[name]}</span>} {/* Show error message if any*/}
      </div>
    </div>
  );

  // Render the form and popup message
  // I want to structure the form layout and include all necessary input fields
  return (
    <div className="bg-gray-200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 w-full max-w-4xl p-8 shadow-md rounded-lg">
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="text-center">
              <h1 className=" text-2xl font-semibold text-gray-900 mb-4">Profile</h1>
              <p className="mt-1 text-sm text-gray-600 italic">
                Fill the form below to update or add user details
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                {renderInput("Name", "name")}
              </div>
              <div className="sm:col-span-3">
                {renderInput("Username", "username")}
              </div>
              <div className="sm:col-span-6">
                {renderInput("Email", "email", "email")}
              </div>
              <div className="sm:col-span-6">
                <h3 className="py-5 text-md font-medium text-gray-900">Address :</h3>
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    {renderInput("Street", "address.street")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("Suite", "address.suite")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("City", "address.city")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("Zipcode", "address.zipcode")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("Latitude", "address.geo.lat")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("Longitude", "address.geo.lng")}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                {renderInput("Phone", "phone")}
              </div>
              <div className="sm:col-span-6">
                {renderInput("Website", "website")}
              </div>
              <div className="sm:col-span-6">
                <h3 className="py-5 text-md font-medium text-gray-900">Company :</h3>
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    {renderInput("Company Name", "company.name")}
                  </div>
                  <div className="sm:col-span-3">
                    {renderInput("Catch Phrase", "company.catchPhrase")}
                  </div>
                  <div className="sm:col-span-6">
                    {renderInput("BS", "company.bs")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/" className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-md font-medium text-gray-700 ring-1 ring-gray-700/10 ring-inset">
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-md font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>

      {state.isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-lg font-semibold">{state.popupMessage}</p>
            <button onClick={closePopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;