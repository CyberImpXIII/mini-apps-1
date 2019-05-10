const express = require('express');
const port = 3000;
app = express();
app.use(express.static('./client/dist'))

app.listen(port, ()=>{
    console.log(`server is successfully running via express on port ${port}`);
})