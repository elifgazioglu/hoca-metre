import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:8000/api/auth/email/${formData.email}`
      );
      if (res.data.user) {
        setErrorMessage("This email already exist!");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else if (formData.password.length < 6) {
        setErrorMessage("Şifre 6 karakterden uzun olmalıdır");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        const res = await axios.post(
          `http://localhost:8000/api/auth/register`,
          formData
        );
        const loginResponse = await axios.post(
          `http://localhost:8000/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
        );
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setFormData({ name: "", lastName: "", email: "", password: "" });
        navigate("/");
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center justify-content-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  id="firstName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn
                  className="mb-4 w-50 d-flex align-items-center justify-content-center custom-button"
                  type="submit"
                >
                  Sign in
                </MDBBtn>
              </form>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
