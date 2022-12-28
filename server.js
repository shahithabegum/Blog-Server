const app=require('./index');
require('dotenv/config');

const port=process.env.port;

app.listen(port,()=>{
    console.log("server is runing",port)
})