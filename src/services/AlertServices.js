import config from "../config.json";
import axios from "axios";
// import axios from "./HttpServices"
import token from "./Token";

const APIEndpoint = config.DOMAIN_NAME;

const getAlerts = () => {
    return axios({
        method: "get",
        url: APIEndpoint + '/alerts/get-alerts',
        // headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const addAlert = (data) => {
    return axios({
        method: 'post',
        url: APIEndpoint + '/alerts/add-alert',
        data: data,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

const removeAlert = (data) => {
    return axios({
        method: 'post',
        url: APIEndpoint + '/alerts/remove-alert',
        data: data,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

export default{
    getAlerts,
    addAlert,
    removeAlert
};