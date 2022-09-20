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
      first_name: data["First Name"],
      last_name: data["Last Name"],
      email: data["Email"],
      password: data["Password"],
    },
    // headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

export default register;
