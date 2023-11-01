import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilePic: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(formData);
      setFormData({ email: "", password: "" });
      navigate("/");
      console.log("logged in...");
    } catch (err) {
      setErrorMessage("E-posta veya şifre geçersiz...");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.log(formData);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <MDBContainer className="my-4">
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

export default Login;
