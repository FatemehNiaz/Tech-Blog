const {Post}=require("../models");
const postData=[
  {
    "postTitle": "MVC",
    "postContent": "MVC stands for Model view controller",
    "userId": 1
  },
  {
    "postTitle": "Bootcamp",
    "postContent": "I'm learning programming in my Bootcamp",
    "userId": 2
  },
  {
    "postTitle": "Apple",
    "postContent": "I don't like apple's mouse, I never use it",
    "userId": 3
  }
];
const seedPost=()=>Post.bulkCreate(postData);
module.exports=seedPost;