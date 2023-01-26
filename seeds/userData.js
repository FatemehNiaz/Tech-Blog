const {User}=require("../models");
const userData=[
  {
    "username":"pretty-pink",
    "password":"123456"
  },
  {
    "username":"party-guy",
    "password":"123456"
  },
  {
    "username":"boss-lady",
    "password":"123456"
  },
  {
    "username":"pretty-black",
    "password":"123456"
  },
  {
    "username":"pretty-brown",
    "password":"123456"
  }
];

const seedUser=()=> User.bulkCreate(userData,{
  individualHooks:true, 
  returning:true
});

module.exports=seedUser;