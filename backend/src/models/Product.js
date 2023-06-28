module.exports = (sequelize , DataTypes)=>{
    const Product =  sequelize.define('product' , {
       name: {
           type: DataTypes.STRING
       },
       email: {
           type: DataTypes.STRING,
           allowNull: false
       },
       password: {
           type: DataTypes.STRING
       }
   
    })
    return Product
   }