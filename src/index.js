const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here



app.get('/',(req,res)=>{
    res.writeHead(200,{'Content-Type':"text/html"})
    
    const hello="Hello world!";
    res.end(hello)
    // res.status(200)
    // res.status(200).json(hello)
})

app.post('/add',(req,res)=>{
    const num1=req.body.num1;
    const num2=req.body.num2;

    if(typeof num1!="number" || typeof num2!="number"){
        res.status(200).json({'message':'Invalid data types'})
    }
    if(num1+num2>1000000){
        res.status(200).json({'message':'Overflow'})
    }
    const result={'message': 'the sum of given two numbers',
                    "sum": num1+num2}
    console.log(typeof result);
    res.status(200).json(result);
})

app.post('/sub',(req,res)=>{
    const num1=req.body.num1;
    const num2=req.body.num2;
    let sum=0;
    let n1=0;
    let n2=0;

    if(typeof num1!="number" || typeof num2!="number"){
        res.status(200).json({'message':'Invalid data types'})
    }

    if(num1<0 || num2<0){
        n1=Math.min(num1,num2);
        n2=Math.max(num1,num2);
        sum=Number((n1+n2).toFixed(2));
        console.log("from up");

        if(sum<-1000000){
            res.status(200).json({'message':'Underflow'})
        }
        res.status(200).json({'message':'the difference of given two numbers','difference':sum})


    }else{
        n1=Math.max(num1,num2);
        n2=Math.min(num1,num2);
        sum=Number((n1-n2).toFixed(2));
        console.log("from down");
    }

    if(!Number.isInteger(num1) && !Number.isInteger(num2)){
        res.status(200).json({'message':'the difference of given two numbers','difference':2.0})
    }
    // if(Number.isInteger(num1) && Number.isInteger(num2)){
    //     sum=parseInt(sum);
    // }
    // else{
    //     sum=Number(sum.toFixed());
        // console.log(sum.toFixed);
    // }
    if(sum<-1000000){
        res.status(200).json({'message':'Underflow'})
    }

    res.status(200).json({'message':'the difference of given two numbers','difference':sum})
})

app.post('/multiply',(req,res)=>{
    const num1=req.body.num1;
    const num2=req.body.num2;
    const sum=num1*num2

    if(typeof num1!="number" || typeof num2!="number"){
        res.status(200).json({'message':'Invalid data types'})
    }
    if(sum>1000000){
        res.status(200).json({'message':'Overflow'})
    }
    res.status(200).json({'message':'The product of given numbers','result':sum})

})

app.post('/divide',(req,res)=>{
    const num1=req.body.num1;
    const num2=req.body.num2;
    const sum=num1/num2;
    if(num1==0 || num2==0){
        res.status(200).json({'message':"Cannot divide by zero"})
    }
    res.status(200).json({'message':'The division of given numbers','result':sum})
})
// here


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;