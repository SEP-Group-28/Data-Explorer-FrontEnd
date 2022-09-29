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
// import moment from 'moment';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Messages from "../../helpers/Messages";

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const formValues = {
        'First Name': '',
        'Last Name': '',
        'Email': '',
    }

    var [state, setState] = useState(formValues);
    const [errordata, setError] = useState(formValues);
    const [user, setUser] = useState([])
    const [user_id, setUserID] = useState();
    const [fNameError,setfNameError]=useState("")
    const [lNameError,setlNameError]=useState("")
    const [emailError, setEmailError] =useState("")

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

            state = {
                // 'First Name': getuser.data.data.firstname,
                // 'Last Name': getuser.data.data.lastname,
                // 'Email': getuser.data.data.email
                'First Name': 'Alex',
                'Last Name' : 'Ben',
                'Email'     : 'alex@gmail.com'
            }
            setState(state)

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
    //     e.preventDefault();
    //     const {value,error} = Validation.register(state);
        
    //     if(error){
    //       error.details.map((item)=>{
    //         errors[item.path[0]] = item.message;
    //       });
    //       if(errors["First Name"]) setfNameError(errors["First Name"])
    //       if(errors["Last Name"]) setlNameError(errors["Last Name"])
    //       if(errors["Email"]) setEmailError(errors["Email"])
    
    //     }else{
    //     //   try{
    //     //     const response = await AuthServices.register(state);
    //     //     console.log(response);
    //     //   }catch(error){
    //     //     console.log(error.response.data.message)
    //     //     console.log("Failed update")
    //     //   }
    //     }
      }

    if (loader) {
        return <Loader />
    } else {

        return (
            <div>

                <div className='form-container col-xl-5 mt-5 pt-5' style={{ background: 'none'}}>

                    <h1 className='fs-1 text-primary'>Update Profile</h1>

                   
                        {/* <Link to={"/update-password"} state={{ user_id }} style={{ display: "flex", float: "right", textDecoration: "none", marginBottom: "10px", marginRight: "10px"}}>
                            <Button className="update_pwd_btn" variant="outline-primary" type="submit">Update Password</Button>
                        </Link> */}


                    <Form className="register-form container col-xl-10 d-flex flex-column ">

                    <FormControl sx={{ m: 1  }} variant="outlined" className="register-form-control">
                    <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-firstname">
                    First Name
                    </InputLabel>
                    <OutlinedInput value={state['First Name']} className="outLineInput" id="outlined-adornment-firstname" type={"text"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="First Name" onChange={handleChange} error={fNameError != ""} label="First Name"/>
                    </FormControl>
                    {fNameError !== "" && (
                        <p className="login-signup-error  mb-0" style={{ color: "red", fontSize: "10px" }}>
                        {fNameError}
                        </p>
                    )}


                    <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                    <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-lastname">
                    Last Name
                    </InputLabel>
                    <OutlinedInput value={state['Last Name']} className="outLineInput" id="outlined-adornment-lastname" type={"text"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Last Name" onChange={handleChange} error={lNameError != ""} label="Last Name"/>
                    </FormControl>
                    {lNameError !== "" && (
                        <p className=" login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                        {lNameError}
                        </p>
                    )}


                    <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                        <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-email">
                        Email
                        </InputLabel>
                        <OutlinedInput value={state['Email']} data-testid='email' className="outLineInput" id="outlined-adornment-email" type={"email"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Email" onChange={handleChange} error={emailError != ""} label="Email"/>
                    </FormControl>
                    {emailError !== "" && (
                        <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {emailError}
                        </p>
                        )
                    }

                    <button data-testid='register-elem' type="submit" className="login-btn signup-btn" id="login-btn" onClick={handleSubmit}>Update</button>
                        </Form>

                </div>
                </div >
                    )
                }
}

export default UpdateProfile;