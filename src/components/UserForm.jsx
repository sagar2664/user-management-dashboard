import { useState } from "react";

const UserForm = ({ onSubmit, initialData }) => {
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
    errors: {},
    isPopupVisible: false,
    popupMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setState((prev) => {
      let updatedUser = { ...prev.user };
      let temp = updatedUser;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });
      return { ...prev, user: updatedUser };
    });
  };

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
      if (newErrors[key]) err.push(newErrors[key]);
    }
    return { err, newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { err, newErrors } = validate();
    if (err.length > 0) {
      setState((prev) => ({
        ...prev,
        errors: newErrors,
        popupMessage: err.join(', '),
        isPopupVisible: true
      }));
    } else {
      setState((prev) => ({
        ...prev,
        errors: {},
        popupMessage: 'User added successfully!',
        isPopupVisible: true
      }));
      onSubmit(state.user);
    }
  };

  const closePopup = () => {
    setState((prev) => ({ ...prev, isPopupVisible: false }));
  };

  const renderInput = (label, name, type = "text") => (
    <div className="sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          value={name.split('.').reduce((acc, key) => acc[key], state.user)}
          onChange={handleChange}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        {state.errors[name] && <span className="text-sm text-red-600">{state.errors[name]}</span>}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="text-center">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Profile</h2>
              <p className="mt-1 text-sm text-gray-600 italic">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
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
                <h3 className="text-sm font-medium text-gray-900">Address</h3>
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
                <h3 className="text-sm font-medium text-gray-900">Company</h3>
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
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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