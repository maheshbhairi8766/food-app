const { default: mongoose } = require("mongoose")

const mongoURI= "mongodb://maheshbhairi8766:8766@ac-yiwmg34-shard-00-00.eq2pb9t.mongodb.net:27017,ac-yiwmg34-shard-00-01.eq2pb9t.mongodb.net:27017,ac-yiwmg34-shard-00-02.eq2pb9t.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-g5wq8k-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB =async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("connected");
            const fetched_data= mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err,data){
                const foodCategory= mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    global.foodCategory=catData;
                    global.food_items=data;
                })
                
            })
        }
    });
}

module.exports = mongoDB;