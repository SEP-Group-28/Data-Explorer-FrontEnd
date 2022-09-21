import React, { useState,useEffect } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { CLIENT_ID } from "../../config";
import Validation from "../../Validations";
import AuthServices from "../../services/AuthServices";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

function Login() {
    const formValues = {
      Email: "",
      Password: "",
    };

    const [state, setState] = useState(formValues);
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");
   

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };
    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {value,error} =Validation.login(state);
        if(error){
          const errors = {};
            error.details.map((item)=>{
              errors[item.path[0]] = item.message;
              });
              if(errors.Email)
                setEmailError(errors.Email)
      
              if(errors.Password)
                setPasswordError(errors.Password)
            
        }else{
          try{
            const response =await AuthServices.login(state);
            console.log(" response is",response);
          }catch(error){
            console.log(error.response.data.message)
            console.log("Login failed")
          }
          setEmailError("");
          setPasswordError("")
        }
        
       
    }

  return (
    <div className="Login">
      <HeaderOne />
      <div className="login-container col-md-4 container d-flex flex-column" style={{ backgroundColor: "rgb(17, 23, 38)" }}>
        <header>Welcome</header>
        <Form className="register-form container  d-flex flex-column col-9">
            {emailError !== "" && (
                <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                    {emailError}
                </p>
                )}
            <Form.Group className="formGroup mb-3 d-flex flex-row" id="formEmail">
                <Form.Label className="register-form-label">First Name</Form.Label>
                <Form.Control className="register-form-control" type="Email" place holder="Enter email" name="Email"
                onChange={handleChange} required/>
            </Form.Group>

            {passwordError !== "" && (
                <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                    {passwordError}
                </p>
                )}
            <Form.Group className="formGroup mb-3 d-flex flex-row" id="formPassword">
                <Form.Label className="register-form-label">Password</Form.Label>
                <Form.Control className="register-form-control"  place holder="Enter password" name="Password"
                 type={showPassword ? 'text' : 'password'}
                onChange={handleChange} required/>
                <IconButton style={{backgroundColor:"#30353F", width:"0px",height:"0px",color:"white"}} onClick={togglePassword}>
              {showPassword? <VisibilityOff   /> : <Visibility/> }
              </IconButton>
            </Form.Group>

            <button type="submit" className="login-btn mb-10" id="login-btn" onClick={handleSubmit}>Login</button>
           
            <div className="d-flex flex-row col-7 align-self-center justify-content-between">
            <p>No account?</p>
            <Link style={{textDecoration:"none"}} to="/register"><span>Signup now</span></Link>
            </div>

          </Form>
        </div>
    </div>
  );
}

export default Login;
