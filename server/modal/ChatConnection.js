const Sequelize = require('sequelize');
const DataTypes=require('sequelize');

class ChatConnection extends Sequelize.Model {
  static init(sequelize) {
    super.init({
        uid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
    
        admin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        User: {
          type: DataTypes.STRING,
          allowNull: true
      },
  
        roomID: {
            type: DataTypes.STRING,
            allowNull: true
    
        },
        botId: {
          type: DataTypes.STRING,
          allowNull: true
  
       },
        lastConversation:{
            type:DataTypes.DATE
        }
    
    }, {
      sequelize,
      modelName: 'ChatConnection',
    },
  
    );
  }
}

module.exports = { ChatConnection };