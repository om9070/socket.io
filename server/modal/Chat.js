
const Sequelize = require('sequelize');
const DataTypes=require('sequelize');

class Chat extends Sequelize.Model {
  static init(sequelize) {
    super.init({
        uid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        read: {
            type: DataTypes.BOOLEAN
        },
        timeSent: {
          type:DataTypes.DATE(),
        },
        replyId:{
            type:DataTypes.UUID
        },
        fileLink:{
            type:DataTypes.STRING
        },
        containsFile:{
            type:DataTypes.BOOLEAN,
            defaultValue:false        
        },
        replyContainsFile:{
            type:DataTypes.BOOLEAN,
            defaultValue:false        
        },    
        replyMessage:{
          type: DataTypes.TEXT,
            allowNull: true,
        },
        
        connectionid:{
          type:DataTypes.STRING,
           allowNull:true
      }
    }, {
      sequelize,
      modelName: 'chat',
    });
  }
}

module.exports = { Chat };