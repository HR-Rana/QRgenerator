const express = require('express');
const imageUrl = require('../models/imageModel');
const router = express.Router();
const multer = require('multer');
require("dotenv").config();
const Cloudinary = require('cloudinary').v2;



Cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.API,
    api_secret: process.env.SECRET
})



// console.log("the api kyes",process.env.CLOUD_NAME, process.env.CLOUD_APIKYE, process.env.CLOUD_API_SECRET)













// getting all qr data from database

router.get("/allImages", async (req, res)=>{
    
    try {
        const images = await imageUrl.find();
        res.status(200).json(images)
    } catch (error) {
        res.status(500).json(error);
    }
    
       
    
})
 



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
  
const upload = multer({ storage: storage });




router.post("/uploadImages", upload.single("image"), async (req, res)=>{
    const reqData = req.file.filename;
    const filePath =req.file.path;
    // const title = req.body;
    console.log(reqData, filePath)


    try {
        if(reqData){
            const ResultURl = await Cloudinary.uploader.upload(filePath);
            // const saveData = await imageUrl.create({
            //     imgName: reqData,
            //     imgUrl: ResultURl.url,
            //     // imgUrl: filePath,
            //     // title:title,  
            // })
            console.log("the url", ResultURl.url)
            // res.status(200).json(saveData);
        }
      
    } catch (error) {
        res.status(500).json(error.message);
    }
    

});




router.post("/deleteImage/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        await imageUrl.deleteOne({_id:id});
        res.status(200).json({
            status:"Success",
            message:"Image deleted successfully"
        })

        console.log(id, "image deleted successfully")

    } catch (error) {
        res.status(500).send(error);
    }

});











module.exports = router;