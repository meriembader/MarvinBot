const express=require('express');
const app=express();
const bodyParser=require('body-parser');


app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

app.get('/',(req,res)=>{
    res.send({"name":"Hello Biswa"});
});

app.post('/api/df_text_query',(req,res)=>{
    res.send({"do":"text query"});
});

app.post('/api/df_event_query',(req,res)=>{
    res.send({"do":"event query"});
});

const PORT=process.env.PORT || 5000;


app.listen(PORT);




