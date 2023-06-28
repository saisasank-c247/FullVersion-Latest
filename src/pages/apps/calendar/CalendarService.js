// import { get, post, del, put } from "helpers/api_helper";

import { resolve } from "path";
import { get, post, del, put } from "src/@core/helpers/api_helper";
import accessToken from "src/helpers/jwt-token-access/accessToken";

// const token = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).token : '';
const token = "";
const loadConfig = () => {
    return {
        headers: { Authorization: token }
    }
}

export const userLogin = (event) => {
    return new Promise((resolve, reject) => {
        post('/auth/login', event).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const signup = (event) =>{
    return new Promise((resolve,reject)=> {
        post('/auth/signup',event).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export const loadCalendarEvents = () => {
     return new Promise((resolve, reject) => {
        get("/events/getAll", accessToken).then((response) => {
            resolve(response.map(item => {
                return {
                    id: item._id,
                    title: item.title,
                    start: item.from_date,
                    end: item.to_date
                }
            }))
        }).catch(err => {
            reject(err)
        });
    })
}

export const addCalendarData1 = (event) => {
    return new Promise((resolve, reject) => {
        post('/events/insert', event, loadConfig()).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateCalendarData = (event) => {
    return new Promise((resolve,reject)=>{
        put('/events/update/' + event.id, event, loadConfig()).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
        })
    })
}

export const deleteCalendarData = (event) =>{
    return new Promise((resolve,reject)=>{
        del('/events/delete/' + event, loadConfig()).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
        })
    })
}