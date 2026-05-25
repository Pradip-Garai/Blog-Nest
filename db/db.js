import mongoose from "mongoose";

const DataBase_Connection = async (req,res)=>{
    try{

        await mongoose.connect(process.env.DB_URL);

    }catch(err){
        console.log(`Error from Database Connection: ${err}`);
        res.status(500).json({
            message:`Internal Server Error`,
            success:false
        })
    }
}

export default DataBase_Connection;