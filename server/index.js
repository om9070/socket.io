const express=require("express");

const app=express();
require("./db/db");
const io=require('socket.io')(8000);
const {User}=require("./modal/User");
const {ChatConnection}=require("./modal/ChatConnection")
var base64id = require("base64id");
const { Chat } = require("./modal/Chat");





io.on("connection", (socket) => {
    var chatdatauid="";
    var adminsecrate="";
    var usersecrate="";
   socket.on("join_user",async(data)=>{
       console.log(data,socket.id,"555")
       socket.join(data.room)
       



       if (data.isAdmin=="admin" || data.isAdmin=="user") {
        let id =data.isAdmin;
        console.log("=====id", id);


        //finds user with the email ID
        User.findOne({ where: { email: id } })
          .then(async (user) => {
            //  console.log(user);
            console.log('step varifiaction ===== 2');
            if (user == null) {
              return User.create({
                email: id,
                status: true,
                uid: base64id.generateId(),
                socketID: socket.id,
                isAdmin: id == "admin" ? true : false,
                role: id == "admin" ? 1 : 0,
              });
            } else {
              user.socketID = socket.id;
              user.status = true;
              console.log('step varifiaction ===== 3');
              await user.save();
    
              return user;
            }
          })
          .then((updatedUser) => {
            if (id !== "admin") {
                console.log("1.", "coming");
                console.log('step varifiaction ===== 4');
            } else {
              socket.emit("written", 1);
              console.log('step varifiaction ===== 5');
              socket.broadcast.emit("adminOnline", true);
            }
    
            next();
          })
          .catch((err) => {
            //   console.log(err)
            (new Error("We encouterned a problem with your credentials"));
          });





      } else (new Error("We encouterned a problem with your credentials"));


      const isadminreal=await User.findOne({where:{email:"admin"}});
      adminsecrate=isadminreal.uid;
      
      const userreal=await User.findOne({where:{email:"user"}});
      usersecrate=userreal.uid;
      
      

if(adminsecrate||usersecrate){
    const connection_data=await ChatConnection.findAll({where:{admin:adminsecrate,User:usersecrate}})
    if(!connection_data){
       ChatConnection.create({
        admin:adminsecrate,
        User:usersecrate,
        })
    }
    const ChatConnectionid=await ChatConnection.findAll({admin:adminsecrate,User:usersecrate})
    chatdatauid=ChatConnectionid[0].dataValues.uid;
console.log(chatdatauid,"999999")


    }
   })




socket.on("send_message",async(data)=>{
console.log(data.room[0],"8888",chatdatauid,adminsecrate,usersecrate,"eeeeeeeeeeee")
// var realdata=data.room[0];
if(data.room[0]==adminsecrate ||data.room[0]==usersecrate){
    socket.join(chatdatauid);

    if(data.room[0]==adminsecrate ){
        Chat.create({
            connectionid:chatdatauid,
            message:data.sms,
        })
        // console.log("adminoooooooooooooo")

    }else if(data.room[0]==usersecrate){
        // console.log("user111111111",data.room[0])
        Chat.create({
            connectionid:chatdatauid,
            replyMessage:data.sms,
        }) 

    }else{
        console.log("nothing data")
    }
}



// const allchats=await Chat.findAll({where:{connectionid:chatdatauid}})

    io.in(chatdatauid).emit("receive_message", await Chat.findAll({where:{connectionid:chatdatauid}}))
    // io.to(data.room).emit("receive_message",data)
    // socket.broadcast.emit("receive_message",data)
    // console.log(allchats,"pppppppppp")
    })


  });








app.get("/",(req,res)=>{
    res.send("this is running")
})

app.listen(5000,()=>{
    console.log("port is running")
})