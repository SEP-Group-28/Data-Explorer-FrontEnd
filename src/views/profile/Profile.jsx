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
import UpdateProfile from './UpdateProfile';
import Avatar from '@mui/material/Avatar';
import '../../assets/css/Profile.css';
// import moment from 'moment';
import {Helmet} from "react-helmet";
import ChangePassword from './ChangePassword';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import Messages from "../../helpers/Messages";

const style_ = {
    // outLineInput:disabled {
    //     background: #dddddd,
    // }
}
const style_1 = {
    position: 'relative',
    top: '50%',
    left: '30%',
    width: 800,
    maxWidth: 'calc(100% - 20px)',
    transform: 'translate(-50%, -5%)',
    bgcolor: 'background.paper',
};
const style_2 = {
    position: 'relative',
    top: '50%',
    left: '28%',
    width: 800,
    maxWidth: 'calc(100% - 20px)',
    transform: 'translate(-94%, -5%)',
    bgcolor: 'background.paper',
};

const Profile = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleOpen = () => setOpen(true);

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
    // const handleUser = (event) => {
    //     // console.log(event.target.value);
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value
    //     })
    //     // console.log(moment(state['Birthday']).format("MM-DD-YYYY"))
    // }

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

    const handleChange = event => {
      // 👇️ toggle shown state
      
  
      // 👇️ or simply set it to true
      // setIsShown(true);
    };
    

    if (loader) {
        return <Loader />
    } else {

        return (
            <div>
                <HeaderTwo />
                <div className='form-container col-xl-5 mt-5 pt-5 mx-auto' style={ !open ? style_1: style_2}>
                    
                    <h1 className='fs-1 text-primary'>Profile Details</h1>

            
                    <div className="profile-pic-div" style={{position: 'relative', left: '50%', marginTop:'150px'}}>
                      <img src="src/assets/userImages/user.jpg" id="photo" className='photo'/>
                      <input type="file" id="file" className='file'/>
                      <label htmlFor="file" id="uploadBtn" className='uploadBtn'>Choose Photo</label>
                    </div>
                    <Helmet>
                    <script type='module' src="src/views/profile/photoUpload.jsx"/>
                    </Helmet>
                    <Form className="register-form container col-xl-10 d-flex flex-column ">

                    <FormControl sx={{ m: 1  }} variant="outlined" className="register-form-control">
                    <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-firstname">
                    First Name
                    </InputLabel>
                    <OutlinedInput disabled='disabled' value={state['First Name']} className="outLineInput" id="outlined-adornment-firstname" type={"text"}
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
                    <OutlinedInput disabled='disabled' value={state['Last Name']} className="outLineInput" id="outlined-adornment-lastname" type={"text"}
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
                        <OutlinedInput disabled='disabled' value={state['Email']} data-testid='email' className="outLineInput" id="outlined-adornment-email" type={"email"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Email" onChange={handleChange} error={emailError != ""} label="Email"/>
                    </FormControl>
                    {emailError !== "" && (
                        <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {emailError}
                        </p>
                        )
                    }

                    <Button data-testid='register-elem' className="login-btn signup-btn" id="login-btn" size="lg" onClick={handleOpen} style={{fontSize:'14px'}}>Edit</Button>
                    <Button data-testid='register-elem' className="login-btn signup-btn" id="login-btn" onClick={handleShow}>Change Password</Button>
                    <Button className='btn btn-secondary button w-20 update-btn' size="lg" onClick={handleOpen} style={{fontSize:'14px'}}>Edit</Button>
            </Form>


                </div>
                { open &&
                    <div style={{position:'relative', left:'55%', top:'-5px', transform: 'translate(2%, -203%)'}}>
                    <UpdateProfile/>
                    </div>
                }
                { show &&
                    <div>
                    <ChangePassword/>
                    </div>

                }
            </div >
           
        )
    }
}

export default Profile;
