import loadConfig from "next/dist/server/config";
import { get, post, del, put } from "src/@core/helpers/api_helper";
import accessToken from "src/helpers/jwt-token-access/accessToken";



export const addUserData = (event: any) => {
    return new Promise((resolve, reject) => {
        post('', event).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const loadUserData = () => {
    return new Promise((resolve, reject) => {
       get("", accessToken).then((response) => {
           resolve(response.map((item:any) => {
               return {
                   id: item._id,
                   name: item.title,
                   email: item.from_date
               }
           }))
       }).catch(err => {
           reject(err)
       });
   })
}