module.exports = (sequelize , DataTypes)=>{
const LoginModel = sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
       type: DataTypes.STRING,
       default: "USER", 
       enum: ["ADMIN", "USER"] },
  })
  return LoginModel
}
