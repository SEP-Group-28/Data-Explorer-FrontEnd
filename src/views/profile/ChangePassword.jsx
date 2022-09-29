import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../assets/css/UpdateProfile.css";
import '../../assets/font-awesome/css/font-awesome.css';
import { Row, Col } from 'react-bootstrap';
import HeaderTwo from "../../components/headers/HeaderTwo";
import UserServices from '../../services/API/UserServices';
import Validations from '../../Validations';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import moment from 'moment';

// import Messages from "../../helpers/Messages";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const formValues = {
        'Current Password': '',
        'New Password': '',
        'Confirm Password': '',
    }

    var [state, setState] = useState(formValues);
    const [errordata, setError] = useState(formValues);
    // const [user, setUser] = useState([])
    // const [user_id, setUserID] = useState();
    const [currPasswordError,setCurrPasswordError] = useState("")
    const [newPasswordError,setNewPasswordError]=useState("")
    const [confirmPassError,setConfirmPassError]=useState("")

    const [showPassword,setShowPassword]=useState(false)
    const [showNewPassword,setShowNewPassword]=useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword=()=>{
        setShowPassword(!showPassword);
    }
    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const toggleNewPassword=()=>{
        setShowNewPassword(!showNewPassword);
    }
    const handleChange =(e)=>{
        setState({
          ...state,[e.target.name] : e.target.value,
        });
    };
    const handleUser = (event) => {
        // console.log(event.target.value);
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
        // console.log(moment(state['Birthday']).format("MM-DD-YYYY"))
    }

    const errors = {};

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        setLoader(true);
        try {
            // const getuser = await UserServices.getUser();
            // console.log("user",getuser.data.data)
            // setUserID(getuser.data.data.user_id);

            // state = {
            //     // 'First Name': getuser.data.data.firstname,
            //     // 'Last Name': getuser.data.data.lastname,
            //     // 'Email': getuser.data.data.email
            //     'First Name': 'Alex',
            //     'Last Name' : 'Ben',
            //     'Email'     : 'alex@gmail.com'
            // }
            // setState(state)

            //  console.log(getuser)
        }
        catch (err) {
            // console.log(err);

        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {value,error} = Validation.register(state);
        
        if(error){
          error.details.map((item)=>{
            errors[item.path[0]] = item.message;
          });
          if (errors["Confirm Password"]) setConfirmPassError(errors["Confim Password"])
          if(errors["Current Password"]) setCurrPasswordError(errors["Current Passowrd"])
          if(errors["New Password"]) setNewPasswordError(errors["New Passowrd"])

        }else{
          try{
            const response = await AuthServices.register(state);
            console.log(response);
          }catch(error){
            console.log(error.response.data.message)
            console.log("Failed registration")
          }
        }
      }
    if (loader) {
        return <Loader />
    } else {

        return (
            <div>

                <div className='form-container col-xl-5 mt-5 pt-5' style={{ background: 'none'}}>

                    <h1 className='fs-1 text-primary'>Change Password</h1>

                   
                        {/* <Link to={"/update-password"} state={{ user_id }} style={{ display: "flex", float: "right", textDecoration: "none", marginBottom: "10px", marginRight: "10px"}}>
                            <Button className="update_pwd_btn" variant="outline-primary" type="submit">Update Password</Button>
                        </Link> */}
                         <Form className="register-form container col-xl-10 d-flex flex-column ">
                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                                    <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                                    Current Password
                                    </InputLabel>
                                    <OutlinedInput className="outLineInput" id="outlined-adornment-password" type={showPassword ? "text" : "password"}
                                    style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                                    name="Password" placeholder='password' onChange={handleChange} error={currPasswordError != ""}
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
                        {currPasswordError !== "" && (
                            <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {currPasswordError}
                            </p>
                        )}

                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                                <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                                New Password
                                </InputLabel>
                                <OutlinedInput className="outLineInput" id="outlined-adornment-password" type={showNewPassword ? "text" : "password"}
                                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                                name="New Password" placeholder='password' onChange={handleChange} error={newPasswordError != ""}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={toggleNewPassword} edge="end">
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                                />
                        </FormControl>
                        {newPasswordError !== "" && (
                            <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {newPasswordError}
                            </p>
                        )}

                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                        <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-confirmPassword">
                        Confirm Password
                        </InputLabel>
                        <OutlinedInput className="outLineInput" id="outlined-adornment-confirmPassword" type={showConfirmPassword ? "text" : "password"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Confirm Password" onChange={handleChange} error={confirmPassError != ""}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton aria-label="toggle confrimPassword visibility" onClick={toggleConfirmPassword} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                        />
                        </FormControl>
                        {confirmPassError !== "" && (
                            <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {confirmPassError}
                            </p>
                        )}

                        <button data-testid='register-elem' type="submit" className="login-btn signup-btn" id="login-btn" onClick={handleSubmit}>Save</button>

                    </Form>
        </div>
    </div >
        )
    }
}

export default ChangePassword;