/** @format */
export { default as UserModel } from "./User";
export { default as AdminModel } from "./Admin";
export {default as LoginModel} from  "./login"
// const sequelizedb = require('../../../backend/config/config.json')
// const {Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize(
//     sequelizedb.sequelizedb.DB,
//     sequelizedb.sequelizedb.USER,
//     sequelizedb.sequelizedb.PASSWORD, {
//         host: sequelizedb.sequelizedb.HOST,
//         dialect: sequelizedb.sequelizedb.dialect,
//         // operatorsAliases: false,

//         pool: {
//             max: sequelizedb.sequelizedb.pool.max,
//             min: sequelizedb.sequelizedb.pool.min,
//             acquire: sequelizedb.sequelizedb.pool.acquire,
//             idle: sequelizedb.sequelizedb.pool.idle

//         }
//     }
// )
// sequelize.authenticate()
// .then(() => {
//     console.log('connected to sequelize database')
// })
// .catch(err => {
//     console.log('Error'+ err)
// })

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize

// db.products = require('../models/Product.js')(sequelize, DataTypes)
// db.userSignUp=require('../models/Signup')(sequelize,DataTypes)
// db.userLogin=require('../models/Login')(sequelize,DataTypes)
// db.sequelize.sync({ force: false })
// .then(() => {
//     console.log('yes re-sync done!')
// })

// // db.reviews.belongsTo(db.products, {
// //     foreignKey: 'product_id',
// //     as: 'product'
// // })


// module.exports = db