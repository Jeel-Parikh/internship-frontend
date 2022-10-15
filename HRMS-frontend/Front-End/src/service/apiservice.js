import axios from "axios";
import service from "./constant";
import { Redirect } from "react-router";


const API_URL = service.API_URL;

export const apiservice = {
    callServicePostFormdata: async (URL, data) => {
        console.log("This Method is called");
        console.log("i am doing the work")
        console.log(data);
        // console.log(data);
        return new Promise(async (resolve, reject) => {
            axios.post(API_URL + URL, data, { headers: { "Authorization": localStorage.getItem('token') } })
                .then((res) => {
                    if (res.data.response) {
                        resolve(res)
                    }
                    else {
                        window.location.replace("http://localhost:4400/login");
                    }
                })
                .catch((e) => { reject(e) })
        }
        )
    },
    PostLoginPreJwt: async (URL, data) => {
        console.log("This Method is called");
        console.log(data);
        // console.log(data);
        return new Promise(async (resolve, reject) => {
            axios.post(API_URL + URL, data)
                .then((res) => {
                    if (res.data.response) {
                        resolve(res)
                    }
                    else {
                        window.location.replace("http://localhost:4400/login");
                    }
                })
                .catch((e) => { reject(e) })
        }
        )




    },

    callServiceGet: async (URL) => {
        console.log("This method is called");
        return new Promise((resolve, reject) => {
            axios.get(API_URL + URL, { headers: { "Authorization": localStorage.getItem('token') } })
                .then((res) => {
                    if (res.data.response) {
                        resolve(res)
                    }
                    else {
                        window.location.replace("http://localhost:4400/login");
                    }
                })
                .catch((e) => { console.log(e) });

        })

    },
    callServicePut: async (URL, data) => {
        console.log("This Method is called");
        console.log("======>>PUT data", data);
        return new Promise(async (resolve, reject) => {
            axios.put(API_URL + URL, data, { headers: { "Authorization": localStorage.getItem('token') } })
                .then((res) => {
                    if (res.data.response) {
                        resolve(res)
                    }
                    else {
                        window.location.replace("http://localhost:4400/login");
                    }
                })
                .catch((e) => { reject(e) })
        }
        )
    },
    callServicePutWithFile: async (URL, data) => {
        console.log("This Method is called");
        return new Promise(async (resolve, reject) => {
            axios.put(API_URL + URL, data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": "multipart / form - data",

                }
            })
                .then((res) => {
                    if (res.data.response) {
                        resolve(res)
                    }
                    else {
                        window.location.replace("http://localhost:4400/login");
                    }
                })
                .catch((e) => { reject(e) })
        }
        )

    },



}   