import { useState } from "react";

const UserForm = ({ onSubmit, initialData }) => {
  const [user, setUser] = useState(
    initialData || {
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
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    console.log(name, value, keys);
    setUser((prev) => {
      let updatedUser = { ...prev };
      let temp = updatedUser;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return updatedUser;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </div>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div>
        <label>Street</label>
        <input type="text" name="address.street" value={user.address.street} onChange={handleChange} />
      </div>
      <div>
        <label>Suite</label>
        <input type="text" name="address.suite" value={user.address.suite} onChange={handleChange} />
      </div>
      <div>
        <label>City</label>
        <input type="text" name="address.city" value={user.address.city} onChange={handleChange} />
      </div>
      <div>
        <label>Zipcode</label>
        <input type="text" name="address.zipcode" value={user.address.zipcode} onChange={handleChange} />
      </div>
      <div>
        <label>Latitude</label>
        <input type="text" name="address.geo.lat" value={user.address.geo.lat} onChange={handleChange} />
      </div>
      <div>
        <label>Longitude</label>
        <input type="text" name="address.geo.lng" value={user.address.geo.lng} onChange={handleChange} />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" value={user.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Website</label>
        <input type="text" name="website" value={user.website} onChange={handleChange} />
      </div>
      <div>
        <label>Company Name</label>
        <input type="text" name="company.name" value={user.company.name} onChange={handleChange} />
      </div>
      <div>
        <label>Catch Phrase</label>
        <input type="text" name="company.catchPhrase" value={user.company.catchPhrase} onChange={handleChange} />
      </div>
      <div>
        <label>BS</label>
        <input type="text" name="company.bs" value={user.company.bs} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  );
};

export default UserForm;