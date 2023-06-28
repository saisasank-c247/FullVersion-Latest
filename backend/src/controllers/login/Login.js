const db = require('../../models')
var bcrypt= require('bcrypt');

const UserLogin = db.userLogin


const LoginUser = async (req, res) => {
    const { username, password } = req.query;
      var sql= db.sequelize.query(`SELECT * FROM signups WHERE email = '${username}' AND password = '${password}'`, function (err, result) {
            if (err) {
                console.log(err,"errr");
            } else {
                console.log(result, "result");
            };
        });
    try {
        console.log("reqest",req,username, password);
        const user = await db.userSignUp.findOne({sql},{ where: { username }}, { id: 1 } );
       
[p]
        console.log(req, "user");

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password == user.password

        console.log( password,user.password,passwordMatch, "password");

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.json({ message: 'Login successfully',user:username,role:"admin" });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    LoginUser
}
