import React,{useState} from "react";
import { Link } from "react-router-dom";
import HeaderOne from "../../components/headers/HeaderOne";
import { Form, FormControl } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useEffect } from "react";
import { CLIENT_ID } from "../../config";
import Validation from "../../Validations";
import AuthServices from "../../services/AuthServices"

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Password } from "@mui/icons-material";

function Register() {

  const formValues = {
    "First Name": "",
    "Last Name": "",
    Email: "",
    Password : "",
    "Confirm Password":"",
    
  };
  const [state, setState] = useState(formValues);
  const [errorData,setErrorData] = useState({});
  const [confirmPassError,setConfirmPassError]=useState("")
  const errors = {};

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword=()=>{
    setShowPassword(!showPassword);
  }
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleChange =(e)=>{
    setState({
      ...state,[e.target.name] : e.target.value,
    });
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const {value,error} = Validation.register(state);
    
    if(error){
      error.details.map((item)=>{
        errors[item.path[0]] = item.message;
      });
    

    }else{
      try{
        const response = await AuthServices.register(state);
        console.log(response);
      }catch(error){
        console.log(error.response.data.message)
        console.log("Failed registration")
      }
  
    }
    
    setErrorData(errors);

    
    

    
  }

  // const handleCallbackResponse =(response)=>{
  //   console.log("Encoded JWT ID token:" + response.credential)
  // }

  // useEffect(()=>{
  //   google.accounts.id.initialize({
  //     client_id: CLIENT_ID,
  //     callback: handleCallbackResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("signUpDiv"),
  //     {theme: "outline", size:"large"}
  //   );

  // },[])
  return (
    <div className="Register ">
      <HeaderOne />
      <div className="register-container col-lg-5 container d-flex flex-column " style={{ backgroundColor: "rgb(17, 23, 38)" }}>
        <header>Create your account</header>

        <Form className="register-form container  d-flex flex-column col-9">
          {errorData["First Name"] !== "" && (
              <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                {errorData["First Name"]}
              </p>
            )}
          <Form.Group className="formGroup mb-3 d-flex flex-row" id="formFirstName">
            <Form.Label className="register-form-label">First Name</Form.Label>
            <Form.Control className="register-form-control" type="text" placeholder="Enter first name" name="First Name"
              onChange={handleChange} required/>
          </Form.Group>
          
          {errorData["Last Name"] !== "" && (
              <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                {errorData["Last Name"]}
              </p>
            )}
          <Form.Group className="formGroup mb-3 d-flex flex-row" id="formLastName">
            <Form.Label className="register-form-label">Last Name</Form.Label>
            <Form.Control className="register-form-control" type="text" placeholder="Enter last name" name="Last Name"
              onChange={handleChange} required/>
          </Form.Group>
          
          {errorData["Email"] !== "" && (
              <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                {errorData["Email"]}
              </p>
            )}
          <Form.Group className="formGroup mb-3 d-flex flex-row" id="formEmail">
            <Form.Label className="register-form-label">Email</Form.Label>
            <Form.Control data-testid='email' className="register-form-control" type="email" placeholder="Enter email" name="Email"
              onChange={handleChange} required/>
          </Form.Group>
          
          {errorData["Password"] !== "" && (
              <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                {errorData["Password"]}
              </p>
            )}
          <Form.Group className="formGroup mb-3 d-flex flex-row" id="formPassword">
            <Form.Label className="register-form-label">Password</Form.Label>
            <Form.Control data-testid="password" className="register-form-control" placeholder="Enter password" name="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange} required/>
              <IconButton style={{backgroundColor:"#30353F", width:"0px",height:"0px",color:"white"}} onClick={togglePassword}>
              {showPassword? <VisibilityOff   /> : <Visibility/> }
              </IconButton>
          </Form.Group>

          {errorData["Confirm Password"] !== "" && (
              <p className="d-flex justify-content-center mb-0" style={{ color: "red" }}>
                {errorData["Confirm Password"]}
              </p>
            )}
          <Form.Group className="formGroup  mb-3 d-flex flex-row" id="formFirstName">
            <Form.Label className="register-form-label">Confirm password</Form.Label>
            <Form.Control  className="register-form-control passControl"  placeholder="Re enter password" name="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={handleChange} required/>   
              <IconButton style={{backgroundColor:"#30353F", width:"0px",height:"0px",color:"white"}} onClick={toggleConfirmPassword}>
              {showConfirmPassword? <VisibilityOff   /> : <Visibility/> }
              </IconButton>
          </Form.Group>
        
          
            <button data-testid="register-elem" type="submit" className="login-btn mb-10" id="login-btn" onClick={handleSubmit}>Sign up</button>
            {/* <div id="signUpDiv"></div> */}
            <div className="d-flex flex-row col-7 align-self-center justify-content-between">
            <p>Already have an account?</p>
            <Link style={{textDecoration:"none"}} to="/login"><span>Sign in</span></Link>
            </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
