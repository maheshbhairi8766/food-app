const express = require("express");

const router = express.Router()

const order = require('../models/Order')

router.post('/orderdata',async(req,res)=>{
    let data = req.body.order_data
    await data.splice(0, 0, {order_date:req.body.order_date})

    let eid = await order.findOne({'email':req.body.email})
    
    if(eid == null)
    {
        try{
            await order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch(error){
            res.send("Server error bhaiya")
        }
    }   
    else
    {
        try{
            console.log(eid)
            await order.findOneAndUpdate({email:req.body.email },
            { $push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
        }catch(error)
        {
            res.send("server error  heyyyy")
        }
    }

})

router.post('/myordersdata',async(req,res)=>{
    try {
        let mydata=await order.findOne({'email':req.body.email})
        res.json({orderdata:mydata})
    } catch (error) {
        res.send("server error  heyyyy")
    }
})
module.exports = router;

