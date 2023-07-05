import { post, get, put,del } from "src/@core/helpers/api_helper";

export const addUser = (event) => {
    return new Promise((resolve, reject) => {
        post('/createpage/insert', event).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateUser = (event, id) => {
    return new Promise((resolve, reject) => {
        put('/createpage/update/' + id, event).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getDetailsById = (event) => {
    return new Promise((resolve, reject) => {
        get('/createpage/getById/' + event, event).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getAllDetails = () => {
    return new Promise((resolve, reject) => {
       get("/createpage/getAll").then((response) => {
           resolve(response.map(item => {
               return {
                   id: item._id,
                   name: item.name,
                   description: item.description,
                   content: item.content,
                   status:item.status,
                   template:item.template,
                   image:item.image
               }
           }))
       }).catch(err => {
           reject(err)
       });
   })
}


export const deleteUser= (event) =>{
    return new Promise((resolve,reject)=>{
        del('/createpage/delete/' + event).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
        })
    })
}