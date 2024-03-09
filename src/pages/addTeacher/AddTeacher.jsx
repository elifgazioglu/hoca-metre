import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTeacher.scss";
import axios from "axios"

const AddTeacher = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    university: "",
    faculty: "",
    department: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post(
        `http://localhost:8000/api/teachers/add`,
        user,
        { withCredentials: true }
      )
      window.location.reload();
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="addTeacher">
      <form onSubmit={handleSubmit}>
        <h1>Add Teacher</h1>
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          University:
          <input
            type="text"
            id="university"
            name="university"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Faculty:
          <input
            type="text"
            id="faculty"
            name="faculty"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            id="department"
            name="department"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};

export default AddTeacher;