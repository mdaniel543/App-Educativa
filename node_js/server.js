const express = require('express');
const port = 8000;
const educativeApp = require("./routes/educative_app")
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('upload'));


app.get("/", (req,res)=>{
    res.json({"message":"ok"});
    console.log("this is a test");
});


app.use("/app",educativeApp);

app.listen(port,()=>{
    console.log("app listening on PORT:8000");
})