const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static('public'))

app.listen(port, ()=>{console.log(`Multistep Checkout Experience Server is now running via Express on port ${port}`)});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jacob',
    password: 'password',
    database: 'Checkout'
  });

  connection.connect((error)=>{
      console.log(error);
  })

app.get('/' , (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/', (req,res)=>{
    connection.query(`INSERT INTO info (name, email, pass, SA1, SA2, City, State, Zip, Phone, cc, exp, CCV, BillingZip) VALUES ('jacob', 'test@test.com', 'testeroni', 'test', 'test', 'test_city', 'NewYork', 12498, 'test', 1, 1, 1, 1);`, (err, results, fields)=>{
        console.log('trying to atleast');
        res.send(err);
    });
})