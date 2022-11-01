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
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CountryDropdown } from 'react-country-region-selector';
import ChangePassModal from '@mui/material/Modal';
// import Messages from "../../helpers/Messages";
import { useRef } from 'react';
import { Box } from '@mui/system';
import Token from "../../services/Token";
import jwtDecode from "jwt-decode";
import { ClassNames } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { save } from '../../redux/profile';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   menu: {
//     "& .MuiPaper-root": {
//       backgroundColor: "#292C31",
//     },
//   },

//   formControl: {
//     width: 120,
//   },
// }));
const style_ = {
    // outLineInput:disabled {
    //     background: #dddddd,
    // }
}
const style = {
    position: 'relative',
    top: '40%',
    left: '50%',
    width: 800,
    maxWidth: '80%',
    transform: 'translate(-60%, -5%)',
    paddingLeft: 0,
    paddingRight:0
    // bgcolor: 'background.paper',
  };
const style_1 = {
    position: 'relative',
    top: '50%',
    width: 800,
    maxWidth: '100%',
    transform: 'translate(0%, -5%)',
    bgcolor: 'background.paper',
    marginTop: -48,
    height: '650px'
};
const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        color: 'white',
        backgroundColor: 'blue',
    },
    input: {
        color: 'white'
    }
});
// const style_2 = {
//     position: 'relative',
//     top: '50%',
//     left: '28%',
//     width: 800,
//     maxWidth: 'calc(100% - 20px)',
//     transform: 'translate(-94%, -5%)',
//     bgcolor: 'background.paper',
// };

const Profile = () => {
    // const refprofilepicdiv=useRef(null)
    // const refimg=useRef(null)
    // const reffile=useRef(null)
    // const refuploadBtn=useRef(null)
    const navigate = useNavigate();
    const imageref=useRef()

    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const {link} = useSelector((state)=>state.profile)
    const dispatch = useDispatch()
    
    const userDecode = Token.getAuth()
    const id = userDecode['user_id']
    console.log("id:", id)
    const handleSubmit = async() => {
        
        console.log(state)
        try {
            
            const response=await UserServices.updateprofile(state,id)
        } catch (error) {
            console.log(error)
            
        }
      
        // setOpen(true)
    
    };
    const handleOpen=()=>{
        setOpen(true)
    }

    const formValues = {
        'First Name': '',
        'Last Name': '',
        'DOB':'',
        'Country':''
    }

    var [state, setState] = useState(formValues);
    const [errordata, setError] = useState(formValues);
    const [user, setUser] = useState([])
    const [user_id, setUserID] = useState();
    const [fNameError,setfNameError]=useState("")
    const [lNameError,setlNameError]=useState("")
    const [emailError, setEmailError] =useState("")
    const [dobError,setDobError]=useState("")
    const [isShown,setIsShown]=useState(false)
    // const handleUser = (event) => {
    //     // console.log(event.target.value);
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value
    //     })
    //     // console.log(moment(state['Birthday']).format("MM-DD-YYYY"))
    // }
    // const [value, setValue] = React.useState(dayjs('01/01/2004'));

    const errors = {};

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        setLoader(true);
        try {
            const response = await UserServices.getUser(id);
            const getuser=response.data.data
            console.log('response',getuser)
            dispatch(save(getUser['imagepath']))
            // console.log("user",getuser.data.data)
            // setUserID(getuser.data.data.user_id);

            state = {
                // 'First Name': getuser.data.data.firstname,
                // 'Last Name': getuser.data.data.lastname,
                // 'Email': getuser.data.data.email
                'First Name': getuser['firstname'],
                'Last Name' : getuser['lastname'],
                // 'Email'     : getuser['email'],
                'ImagePath':getuser['imagepath'],
                'DOB':getuser['dob'],
                'Country':getuser['country']
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

    // var imgDiv=refprofilepicdiv.current
    // var img = refimg.current
    // var file = reffile.current
    // var uploadBtn = refuploadBtn.current

    
    // console.log(img)
    // if(imgDiv){
    //     console.log('hi')
    //     imgDiv.addEventListener('mouseover', function(){
    //         uploadBtn.style.display = "block";
    //     });
    //     imgDiv.addEventListener('mouseout', function(){
    //         uploadBtn.style.display = "none";
    //     });

    // }
    // if(file){
        
       const handleChangePhoto= function(e){
            console.log(e.target.files)
            const choosedFile = e.target.files[0];
            console.log('name',choosedFile)
            console.log('namedfsdf',choosedFile.name)
    
            if (choosedFile) {
    
                const reader = new FileReader();
                reader.addEventListener('load', function(){
                    document.getElementById('photo').setAttribute('src', reader.result);
                   
                });
                
    
                reader.readAsDataURL(choosedFile);
                try{
                    console.log(choosedFile)
                    const formData=new FormData();
                    formData.append('Image',choosedFile)
                    // formData.append('ImageName',choosedFile.name)
                    // print('chooosed name',choosedFile.name)
                    const call=async()=>{
                        
                        // print('formData',formData)
                        try { 
                            const response =await UserServices.updatePhoto(id,formData);
                            if(response.status===200){
                                console.log('success')
                                console.log(response)
                                // dispatch(save(formData[]))
                            }
                            // imageref.current.getElementById('hi').setAttribute('src',reader.result)
                            console.log("imageref ", imageref.current)
                            
                        } catch (error) {
                            console.log(error)
                            
                        }
                      
                        
                    }
                    call()
                    
    
                }
                catch(error){
                    console.log(error)
                }
                
                
            }
        }
    // }

    const handleDOBChange = (newValue ) => {
        // console.log(newValue)
        // console.log(newValue['$d'].toLocaleDateString())
        setState({...state,'DOB':newValue['$d'].toLocaleDateString()});
      };
    

    const handleCountryChange=(value)=>{
        setState({...state,'Country':value})

    }
    

    const handleChange = event => {
      // 👇️ toggle shown state
      console.log(event)
      console.log(event.target.value)
      setState({...state,[event.target.name]:event.target.value})
        
      // 👇️ or simply set it to true
      // setIsShown(true);
    };
    

    if (loader) {
        return <Loader />
    } else {

        return (
            <div className='container2' style={{'display':'flex', 'flexDirection': 'column'}}>
                {console.log('image',state['ImagePath'])}
                <HeaderTwo  imagepath={state['ImagePath']}/>
                <div className='form-container col-xl-5 mt-5 pt-5 mx-auto' style={ style_1}>
                    
                    <h1 className='fs-1 text-primary' style={{marginTop:'-40px'}}>Profile Details</h1>

            
                    <div onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} className="profile-pic-div" style={{position: 'relative', left: '50%', marginTop:'-200px', maxWidth:'50%'}}>
                      <img  src={state['ImagePath']? state['ImagePath']:'src/assets/DefaultProfilePic/user.jpg'} id="photo" className='photo'/>
                      <input onChange={handleChangePhoto} type="file" id="file" className='file'/>
                     {isShown &&(<label    htmlFor="file" id="uploadBtn" className='uploadBtn'>Choose Photo</label>)}
                    </div>
                    {/* <Helmet>
                    <script type='module' src="src/views/profile/photoUpload.jsx"/>
                    </Helmet> */}
                    <Form className="form-group register-form container col-xl-10 d-flex flex-column " style={style}>

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
                    <OutlinedInput  value={state['Last Name']} className="outLineInput" id="outlined-adornment-lastname" type={"text"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Last Name" onChange={handleChange} error={lNameError != ""} label="Last Name"/>
                    </FormControl>
                    {lNameError !== "" && (
                        <p className=" login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                        {lNameError}
                        </p>
                    )}
                    {console.log(state['Email'])}
                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                
                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{backgroundColor:'white'}} >
                            
                                <MobileDatePicker
                                label="Date of Birth"
                                inputFormat="MM/DD/YYYY"
                                value={state['DOB']? state['DOB']:dayjs('01/01/2004')}
                                name={'DOB'}
                                sx={{ backgroundColor:'#0d6efd'}}
                                onChange={handleDOBChange}
                                renderInput={(params) => <TextField {...params} 
                                    sx={{
                                        width: 'auto',
                                        "& .MuiInputBase-root": {
                                            height: 40,
                                        color:'#C1C0C0',
                                        fontSize:'14px'
                                        },
                                        ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":{
                                            color:'#C1C0C0',
                                            marginTop:'-5px',
                                            fontSize: '14px'
                                        }
                                    }}
                                    />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                            {emailError !== "" && (
                        <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {dobError}
                        </p>
                            )
                        }

                    <CountryDropdown
                            className="register-form-control"
                            style={{color:'#C1C0C0', paddingTop:"8px", paddingBottom:'8px',paddingLeft:'14px',paddingRight:'14px', backgroundColor:'#30353F', fontSize:"13px", marginTop:"5px", maxWidth:'98%', marginLeft:'7px', marginRight:'8px'}}
                            value={state['Country']}
                            name={'Country'}
                            onChange={handleCountryChange} />

                    {/* <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                        <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-Location">
                    Country
                        </InputLabel>
                        <OutlinedInput  value={state['Location']} data-testid='DOB' className="outLineInput" id="outlined-adornment-Location" type={"text"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="DOB" onChange={handleChange} error={emailError != ""} label="Location"/>
                    </FormControl> */}
                    {emailError !== "" && (
                        <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {emailError}
                        </p>
                        )
                    }

                    <div className='container1'>
                    <Button data-testid='register-elem' className="button" size="lg" onClick={handleSubmit} style={{fontSize:'14px'}}>Save</Button>
                    <Button data-testid='register-elem' className="button" size='lg' onClick={handleShow} style={{fontSize:'14px'}}>Change Password</Button>
                    </div>
                    {/* <Button className='btn btn-secondary button w-20 update-btn' size="lg" onClick={handleOpen} style={{fontSize:'14px'}}>Edit</Button> */}
            </Form>


                </div>
                {/* { open &&
                    <div style={{position:'relative', left:'55%', top:'-5px', transform: 'translate(2%, -203%)'}}>
                    <UpdateProfile/>
                    </div>
                } */}
                { show &&
                    <div style={{marginRight:'18px', width:'10px'}}>
                    <ChangePassModal sx={{mt:-8, borderWidth:0 }}
                    open={show}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box style={{ maxWidth:'50%', transform:'translate(50%, 45%)'}}>                        
                        <ChangePassword sx={{w:'10px'}}/>
                        </Box>
                    </ChangePassModal>
                    </div>

                }
            </div >
           
        )
    }
}

export default Profile;
