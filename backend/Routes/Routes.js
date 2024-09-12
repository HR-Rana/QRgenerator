const express = require('express');
const imageUrl = require('../models/imageModel');
const router = express.Router();
const multer = require('multer');


router.get("/allImages", (req, res)=>{
    res.status(200).send("working successfully");
       
    
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
    const filePath = req.file.path;
    console.log(req)

    try {
        if(!reqData){
            return res.status(400).send("No file uploaded");
        }else{
            const saveData = await imageUrl.create({
                imgName: reqData,
                imgUrl: filePath
            })
            await saveData.save();
        }
        res.status(200).send(saveData);
    } catch (error) {
        res.status(500).send(error);
    }
    

});




router.delete("/deleteImage/:id",  (req, res)=>{
    const id = req.params.id;
    



});











module.exports = router;