const express = require("express");

const router = express.Router()

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.food_items,global.foodCategory])
    }catch(error)
    {
        console.log(error.message);
        console.log("Server bhaiya error hey !")
    }
})
module.exports = router;