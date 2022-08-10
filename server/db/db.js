const { Sequelize } = require('sequelize');
const{Chat} =require("../modal/Chat")
const{ChatConnection} =require("../modal/ChatConnection")
const{User} =require("../modal/User")


let connection = new Sequelize("Socket", "postgres", "tr70ysumvgGTPFzN3AiX", {
    host: "schedassist-dev.cryaxoom3tga.us-east-2.rds.amazonaws.com",
    dialect:
      "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  });


  try {
   connection.authenticate();
   Chat.init(connection)
   ChatConnection.init(connection)
   User.init(connection)


   //relation
   User.hasOne(ChatConnection);
   ChatConnection.belongsTo(User);
   ChatConnection.hasMany(Chat);
   Chat.belongsTo(ChatConnection);
   User.hasMany(Chat);
   Chat.belongsTo(User);

  //  connection.sync({ alter: true })
  //    .then((result) => {
  //      console.log(result);
  //    }).catch((err) => {
  //      console.log(err);
  //    })
   
    
    
  
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }