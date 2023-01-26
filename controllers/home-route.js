const router=require("express").Router();


//router for homepage
router.get("/", async (req, res)=>{
  try {



    res.render("home");
  }
  catch(err){
    res.status(500).json(err);
  }
});

/*//
router.get("/", async (req, res)=>{

});
*/
module.exports=router;