import jwtDecode from "jwt-decode";

const setAccessToken =(value)=>{
    localStorage.setItem("AccessToken",value)
}

const getAccessToken =(value)=>{
    localStorage.getItem("AccessToken")
}

const removeAccessToken = ()=>{
    localStorage.removeItem("AccessToken")
}

const getAuth = () =>{
    
}

export default {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    getAuth
}