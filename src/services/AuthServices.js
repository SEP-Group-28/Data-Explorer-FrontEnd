import config from "../config.json";
import axios from "axios";
import token from "./Token";

const APIEndpoint = config.DOMAIN_NAME + "/auth";

const register = (data) => {
  console.log(data);

  return axios({
    method: "post",
    url: APIEndpoint + "/register",
    data: {
      firstname: data["First Name"],
      lastname: data["Last Name"],
      email: data["Email"],
      password: data["Password"],
    },
    // headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

  const login = async(data)=>{
    console.log(data);

    const response = await axios({
      method : "post",
      url: APIEndpoint + '/login',
      data:{
        email : data.Email,
        password : data.password
      }
    });
    console.log("response", response);
    token.setAccessToken(response.data.access_token);
    return response;
  }

  const logout = async (data) => {
    return axios({
      method: "get",
      url: APIEndpoint + "/logout",
    });
  };

export default {register,login,logout};
