
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://12345:8jjOpOF2Pkwbk6X5@cluster1.lqd6sol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';



mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to MongoDB');
}).then((err)=>{console.log(err)})

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDB connected');
// }).catch(err => console.log(err));






const imageLinks = mongoose.Schema({
    // title:{
    //     type: 'string',
    //     required: true
    // },
    imgName:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
    }
})





const   imageUrl= mongoose.model('imgUrl', imageLinks);
module.exports = imageUrl;