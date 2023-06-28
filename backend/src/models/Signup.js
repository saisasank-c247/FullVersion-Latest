module.exports = (sequelize, DataTypes) => {
    const SignupModel = sequelize.define('signup', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING,
            default: "USER", 
            enum: ["ADMIN", "USER"] 
        },

    })
    return SignupModel
}
