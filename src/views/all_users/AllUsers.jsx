import "./AllUsers.css";
// import HeaderTwo from "../../components/headers/HeaderTwo";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Card, Form, Button, Table, FormControl, InputGroup, DropdownButton, Dropdown, Pagination, } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices from "../../services/API/AdminServices";
import UserServices from "../../services/API/UserServices";
import Paginate from "../../components/pagination/paginate";
// import { toast } from 'react-toastify';
// import Loader from "../../components/loader/Loader";
// import Messages from "../../helpers/Messages";
import { Link } from "react-router-dom";
// import 'font-awesome/css/font-awesome.css';

import Token from "../../services/Token";

const AllUsers = () => {

  //For Pagination
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [loader, setLoader] = useState(false);

  const changePage = async (skip_value) => {
    // console.log(skip_value);
    // setSkip(skip_value);
    getUsers(skip_value, take, '');
  }

  // const [usertype, setusertype] = useState('doctor');
  //When Doctor or Examiner is clicked
  // const displayDoctors = () => {
  //   // setSkip(0);
  //   getUsers("doctor", 0, take, '');

  // }
  // const displayExaminers = () => {
  //   // setSkip(0);
  //   getUsers("examiner", 0, take, '');

  // }

  // When update button is clicked
  const navigate = useNavigate();
  const params = useParams();
  // const updateUser = (user_id) => {
  //   navigate(`/updateUser/${user_id}`);
  // };

  // When activate/deactivate is clicked
  const changeActivation = async (user_id) => {
    // setLoader(true);
    // console.log("Inside activate changing");
    try {
      const response = await UserServices.changeActivation( {user_id} );
      console.log(response);
      if (response.status === 200) {
        // Messages.SuccessMessage("Changed activation successfully");
        
        getUsers(skip, take, search);
        
      }
    } catch (error) {
      
      // if(Token.getAuth()===null){
      //   console.log("SESSION EXPIRED");
      //   Messages.ErrorMessage({
      //     error:error,
      //     custom_message:'Session Expired. Please Login Again'
      //   });
      //   setLoader(false);
      //   navigate('/logout');
      //   return ;
      // }

      Messages.ErrorMessage({
        error:error,
        custom_message:'Activation change failed'
      });
  }
    
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  // Search term
  const [search, setSearch] = useState("");
  const searchUser = () => {
    getUsers(usertype, 0, take, search);
  }

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers( skip, take, search);
  }, []);

  const getUsers = async ( skip_value, take, search) => {
    setLoader(true);
    try {
      let response = null;
      // if (usertype === "doctor") {
      response = await AdminServices.getUsers(skip_value, take, search);
      // setusertype('doctor');
      console.log(response)
      // }
      // else if (usertype === "examiner") {
      //   response = await AdminServices.getExaminers(skip_value, take, search);
      //   setusertype('examiner');
      // }
      setSearch(search);
      setSkip(skip_value);
      setUsers(response.data.data.users);
      setTotalItems(response.data.data.usercount);
      // console.log(response);
    } catch (error) {
      console.log(error)
      // console.log(error);
      // if(Token.getAuth()===null){
      //   console.log("SESSION EXPIRED");
      //   Messages.ErrorMessage({
      //     error:error,
      //     custom_message:'Session Expired. Please Login Again'
      //   });
      //   setLoader(false);
      //   navigate('/logout');
      //   return ;
      // }
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  // if (loader) {
  //   return <Loader />
  // } else {
    return (
      <div className="all_users">
        {/* <HeaderTwo /> */}

        <h1 className="alluser_header">All Users</h1>

        <div className="container users">
{/* 
          <div className="d-flex form">
            <div className="row">
              <DropdownButton title={usertype.charAt(0).toUpperCase() + usertype.slice(1)} placeholder="&#xf2c2;" id="bg-vertical-dropdown-3" style={{ color: "black" }}>
                <Dropdown.Item eventKey="1" onClick={displayDoctors}>Doctors</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={displayExaminers}>Examiners</Dropdown.Item>
              </DropdownButton>
            </div>
          </div> */}

          <div className="title_search">
            {/* {usertype === 'doctor' && <h4 className="category">Doctors</h4>}
            {usertype === 'examiner' && <h4 className="category">Examiners</h4>} */}
            {/* <input
              type="search"
              placeholder={"   Search " + usertype}
              style={{
                borderRadius: "20px",
                border: "2px solid #1376BD",
                height: "40px",
                display: "flex",
                float: "right",
                width: "25%",
                marginBottom: "10px",
                marginTop: "20px",
              }}
              onChange={(event) => setSearch(event.target.value)}
            /> */}
          </div>
            <div></div>
          <div className="search display-fixed">
            <Button variant="outline-primary" onClick={() => searchUser()} style={{ borderRadius: "20px", float: "right" }}>Search</Button>
            <input
              type="search"
              placeholder={"   Search " }
              className="me-2"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
              style={{
                borderRadius: "20px",
                border: "2px solid #1376BD",
                height: "40px",
                float: "right",
              }}
            />
          </div>

          <div className="user_display">
            {users.length === 0 &&
              <div>
                {/* <h5 style={{ color: "black", textAlign: "center", margin: "10px" }}>No {usertype} to display</h5> */}
                <div className="image">
                  <img src="https://i.ibb.co/TLJmmJW/404.png" alt="" />
                </div>
              </div>}
            {users.length !== 0 &&
              <Table style={{ color: "#1376BD", width: "100%" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    {/* <th>Contact No</th> */}
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody style={{ color: "black" }}>
                  {/* sample database result object to html convert with search enabled */}
                  {users.map((value, key) => {
                    // Tables should come here

                    return (
                      <tr key={key}>
                        <td>
                          {parseInt(value.active) ? <i className="fa fa-check-square" aria-hidden="true" style={{color: "green"}}/> : <i className="fa fa-power-off" aria-hidden="true" style={{margin: "5px", color: "crimson"}}/>}
                          <i className=""></i>
                        </td>
                        <td>{value['_id']}</td>
                        <td>{value.firstname}</td>
                        <td>{value.lastname}</td>
                        {/* <td>{value.nic}</td> */}
                        {/* <td>{value['Contact No']}</td> */}
                        <td>{value['email']}</td>
                        <td>{value['DOB'] && value['DOB'].slice(0, 10)}</td>
                        <td>{value['Country']}</td>
                        <td>
                          {/* <Link to={"/update-user"} state={{ user_id: value['_id'] }}>
                            <Button
                              variant="outline-primary"
                              className=""
                              style={{ borderRadius: "20px" }}
                            >
                              Update
                            </Button>
                          </Link> */}
                        </td>
                        <td>
                          {console.log(value['active'])}
                          {console.log(parseInt(value.active))}
                          {parseInt(value.active) ? (
                            <Button
                              variant="outline-danger"
                              className=""
                              style={{ borderRadius: "20px" }}
                              onClick={() => changeActivation(value['_id'])}
                            >
                              <i className="fa fa-power-off" aria-hidden="true" style={{margin: "5px"}}></i>Deactivate
                            </Button>
                          ) : (
                            <Button
                              variant="outline-success"
                              className=""
                              style={{ borderRadius: "20px" }}
                              onClick={() => changeActivation(value['_id'])}
                            >
                              <i className="fa fa-check-square" aria-hidden="true" style={{margin: "5px"}}/>Activate
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>}

            <div className="container paginate_div text-center">
              <Paginate
                skip={skip}
                take={take}
                setSkip={changePage}
                totalItems={totalItems}
              />
            </div>
          </div>

        </div>

      </div>
    );
  


};

export default AllUsers;
