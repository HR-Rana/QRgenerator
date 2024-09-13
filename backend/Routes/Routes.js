const express = require('express');
const imageUrl = require('../models/imageModel');
const router = express.Router();
const multer = require('multer');


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


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })


router.post("/uploadImages", upload.single("image"), async (req, res)=>{
    const reqData = req.file.filename;
    const filePath = `http://localhost:3000/${req.file.path}`;
    // const title = req.body;
    console.log(reqData)

    try {
        if(!reqData){
            return res.status(400).send("No file uploaded");
        }else{
            const saveData = await imageUrl.create({
                imgName: reqData,
                imgUrl: filePath,
                // title:title,
            })
            await saveData.save();
        }
        res.status(200).send(saveData);
    } catch (error) {
        res.status(500).send(error);
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