const router=require("express").Router();
const homeRoutes=require("./home-route.js");

router.use("/",homeRoutes);

module.exports=router;