const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(
    cors({
        origin:"*",
    })
);
server.get('/',(req,res)=>{res.json({data:"hello"});});
const user = require("./routes/connectroutes");
server.use(user);
server.listen(8000,()=>{console.log("server started at port 8000")});
require("./config/dbconnect").dbonnect();
module.exports = server;