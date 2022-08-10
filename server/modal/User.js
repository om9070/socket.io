const Sequelize = require('sequelize');
const DataTypes=require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      uid:{
        type:DataTypes.STRING(120),
        primaryKey:true,
        allowNull:false
    },
    email:{
       type:DataTypes.STRING(100),
       allowNull:true
    },
    // username:{
    //   type:DataTypes.STRING(100),
    //   allowNull:true
    // },
    password:{
      type:DataTypes.STRING(100),
      allowNull:true
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        default:true,
    },
    socketID:{
        type:DataTypes.STRING(120),
        allowNull:true
    },
    botlogUid:{
      type:DataTypes.STRING
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    role:{
      type:DataTypes.INTEGER,     
      default:0,
     },    
    name:{
        type:DataTypes.STRING
    },
    }, {
      sequelize,
      modelName: 'user',
    });
  }
}

module.exports = { User };


