import React, { useState, useEffect } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Validation from "../../Validations";
import AuthServices from "../../services/AuthServices";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../../components/loader/Loader";
import jwtDecode from "jwt-decode";
import Token from "../../services/Token";
function Login() {

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from || "/navigate";

  const formValues = {
    Email: "",
    Password: "",
  };


  const [state, setState] = useState(formValues);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loader, setLoader] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const { value, error } = Validation.login(state);
    if (error) {
      const errors = {};
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      if (errors.Email) setEmailError("Invalid email");

      if (errors.Password) setPasswordError("Invalid password");
    } else {
      try {
        const response = await AuthServices.login(state);
        console.log(" response is", response);
        try {
          console.log(jwtDecode(Token.getAccessToken()));
        } catch (error) {
          
        }
        

        // navigate(from, { replace: true });

      } catch (error) {
        console.log("error",error?.response?.data?.message);
        console.log("Login failed");
      }
      setEmailError("");
      setPasswordError("");
    }

      setLoader(false);
    
  };

  if (loader) {
    return <Loader position="absolute" top="45%" left="47%"/>
  } else {
    return (
      <div className="Login">
        <HeaderOne />
        <div
          className="login-container col-9 col-sm-6 col-lg-4 col-md-5 col-xl-4 col-xxl-4 container d-flex flex-column"
          style={{ backgroundColor: "rgb(17, 23, 38)" }}
        >
          <header>Welcome</header>
          <Form className="register-form container col-xl-10 d-flex flex-column ">
            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-email">
                Email
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-email" type={"email"}
                style={{ color: "rgb(194, 193, 193)" , fontSize: "13px"}}
                name="Email" onChange={handleChange} error={emailError != "" && true} label="Password"/>
            </FormControl>
            {emailError !== "" && (
              <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                {emailError}
              </p>
            )}

            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-password" type={showPassword ? "text" : "password"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="Password" onChange={handleChange} error={passwordError != ""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {passwordError !== "" && (
              <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                {passwordError}
              </p>
            )}

            <button type="submit"className="login-btn mb-10" id="login-btn" onClick={handleSubmit} >
              Login
            </button>

            <div className=" col-7 align-self-center justify-content-between register-login-footer login-footer">
              <p style={{ fontSize: "12px" }}>No account?</p>
              <span style={{ fontSize: "12px" }}>{" "}
                <Link style={{ textDecoration: "none", alignItems: "center" }} to="/register">
                  Signup now{" "}
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
