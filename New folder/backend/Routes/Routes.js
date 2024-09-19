const express = require('express');
const imageUrl = require('../models/imageModel');
const router = express.Router();
const multer = require('multer');
require("dotenv").config();
const Cloudinary = require('cloudinary').v2;



Cloudinary.config({
    cloud_name: "dluihnhff",
    api_key: '576717877318924',
    api_secret: '5OB93M0m2Ow_Nw3t-Jz-mxi5YUg'
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
            var ResultURl = await Cloudinary.uploader.upload(filePath, (err, res)=>{
                if (err) {
                    console.log(err)
                    return res.status(500).json(err.message)
                }
                console.log("image uploaded successfully")
                console.log("the iamge url", ResultURl.url)
            });
            const saveData = await imageUrl.create({
                imgName: reqData,
                imgUrl: ResultURl.url,
            })
            res.status(200).json(saveData);
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