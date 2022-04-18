const express = require('express');
const app = express();
const port = 8000;
const educativeApp = require("./routes/educative_app")



app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
);

app.get("/", (req,res)=>{
    res.json({"message":"ok"});
    console.log("this is a test");
});


app.use("/app",educativeApp);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.error(err.message,err.stack);
    res.status(statusCode).json({message:err.message});
    return;
});

app.listen(port,()=>{
    console.log("hello world");
})