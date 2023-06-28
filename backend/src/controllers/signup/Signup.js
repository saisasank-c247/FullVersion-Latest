const db = require('../../models')

const UserSignup = db.userSignUp

const addUser = async (req, res) => {

    let info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.role || "USER",
    }

    const userSignUp = await UserSignup.create(info)
    res.status(200).send(userSignUp)
    console.log(userSignUp)

}
module.exports={
    addUser
}
