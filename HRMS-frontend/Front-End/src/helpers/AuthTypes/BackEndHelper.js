import axios from "axios";
import React from "react";
import service from "../../service/constant";
import { LOGIN_SERVER, ADMIN_USER_REGISTER, USERS } from "../../service/url_helper";
const LOGIN = async (data) => {

    console.log("This Method is called");
    console.log(data);

    try {
        let res = await axios.post(service.API_URL + LOGIN_SERVER, { email: data.email, password: data.password });
        // console.log(res.status);
        console.log(res)
        const response = { data: res.data.user, status: res.data.status };

        // console.log("Data Sent");
        // console.log(person);
        return response;
    }
    catch (e) {
        return ("error has occured");
    }



}
const ADD_EMPLOYEE = async (values) => {
    let res = await axios.post(service.API_URL + USERS, values);
    const person = res.data.person;
    console.log("Data Sent");
    console.log(person);
    return res.status;

}
const fetchUsers = async () => {
    let res = await axios.get(service.API_URL + USERS);
    let user = res.data.result;
    return user;
}

export { LOGIN, ADD_EMPLOYEE, fetchUsers }