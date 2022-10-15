import axios from "axios";
import service from "./constant";
// import s;lafmlsa form; ca; c; ' ././.cc/';


const API_URL = service.API_URL;

export const apiservice = {
    callServicePostFormdata: async (URL, data) => {
        console.log("This Method is called");
        console.log(data);
        // console.log(data);
        return new Promise(async (resolve, reject) => {
            axios.post(API_URL + URL, data, { headers: { "Authorization": localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
                .then((res) => { resolve(res) })
                .catch((e) => { reject(e) })
        }
        )




    },
    callServiceGet: async (URL) => {
        console.log("This method is called");
        return new Promise((resolve, reject) => {
            axios.get(API_URL + URL, { headers: { "Authorization": localStorage.getItem('token') } })
                .then((res) => { console.log("res", res); resolve(res) })
                .catch((e) => { console.log(e) });

        })

    },
    callServicePut: async (URL, data) => {
        console.log("This Method is called");
        console.log(data);
        // console.log(data);
        return new Promise(async (resolve, reject) => {
            axios.put(API_URL + URL, data, { headers: { "Authorization": localStorage.getItem('token') } })
                .then((res) => { resolve(res) })
                .catch((e) => { reject(e) })
        }
        )




    }


}