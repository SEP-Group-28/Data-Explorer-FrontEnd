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

// import Messages from "../../helpers/Messages";

const Profile = () => {

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

    const handleClick = event => {
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
                <UpdateProfile/>
                <div className='form-container col-xl-5 mt-5 pt-5 mx-auto' style={{ background: 'none', position:'abolute'}}>
                    
                    <h1 className='fs-1 text-primary'>Profile Details</h1>

                   
                        {/* <Link to={"/update-password"} state={{ user_id }} style={{ display: "flex", float: "right", textDecoration: "none", marginBottom: "10px", marginRight: "10px"}}>
                            <Button className="update_pwd_btn" variant="outline-primary" type="submit">Update Password</Button>
                        </Link> */}
                    {/* <div style={{position: 'relative', left: '40%'}}>
                      <Avatar
                        alt={state['First Name']}
                        src="src/assets/userImages/user.jpg"
                        sx={{ width: 100, height: 100 }}
                      />
                    </div> */}
                    <div className="profile-pic-div" style={{position: 'relative', left: '50%'}}>
                      <img src="src/assets/userImages/user.jpg" id="photo" className='photo'/>
                      <input type="file" id="file" className='file'/>
                      <label htmlFor="file" id="uploadBtn" className='uploadBtn'>Choose Photo</label>
                    </div>
                    <Helmet>
                    <script type='module' src="src/views/profile/photoUpload.jsx"/>
                    </Helmet>
                    <Form className='mb-5'>
                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='First Name'>
                            <Form.Label className='fa' column sm={4}>First Name</Form.Label>
                            <Col sm={6} >
                                <Form.Control disabled="disabled" className='fa' type="text" value={state['First Name']} name='First Name' placeholder='&#xf007; First Name' />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Last Name'>
                            <Form.Label className='fa' column sm={4} >Last Name </Form.Label>
                            <Col sm={6}>
                                <Form.Control disabled="disabled" className='fa' type="text" value={state['Last Name']} name='Last Name' placeholder='&#xf234; Last Name' />
                                
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto ' controlId='Email'>
                            <Form.Label className='fa' column sm={4} >Email</Form.Label>
                            <Col sm={6}>
                                <Form.Control disabled="disabled" className='fa' type="text" value={state['Email']} name='Email' placeholder='&#xf0e0; Email'/>
                      
                            </Col>

                        </Form.Group>

                        <Button className='btn btn-secondary button w-20 update-btn' size="lg" type="submit" onClick={handleClick} >Update</Button>

                    </Form>

                </div>
            </div >
        )
    }
}

export default Profile;
