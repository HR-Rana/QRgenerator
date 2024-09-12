const app = require("./app");
const port = process.env.PORT || 3000;




app.get('/', (req, res) => {
    res.send("this is home-page");
})






app.use( (req, res)=>{
    res.send("Route did not found!");
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
