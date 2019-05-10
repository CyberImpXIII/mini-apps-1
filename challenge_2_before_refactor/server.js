const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router;
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

app.listen(port, ()=>{console.log('server.js running express is now listening on port 3000')});

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.post("/submission", (req,res)=>{
    let bodyString = JSON.parse(req.body["uploadtext"]);
    bodyString = childFlatten(bodyString);
    bodyString.forEach((element)=>{
        delete element.children
    });
    bodyString = flatChildList(bodyString);
    
    res.send(generateResponsePage(bodyString));
});

generateResponsePage = (string)=>{
    return newHtmlPage = `<!DOCTYPE HTML>
    <html lang ="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="form-container">
                <form method="POST" action="/submission">
                    <textarea id="text" name="uploadtext" rows="10" col="500"></textarea><br>
                    <input type="submit" value="submit">
            </form>
        </div>
        <div id='response-text'>
         ${string}   
        </div>
    </body>    
    </html>`
}

flatChildList = (arr)=>{
    string = "";
    arr.forEach((obj)=>{
        string += Object.values(obj).toString() + " <br>";
    })
    console.log(string);
    return string;
}

childFlatten = (obj)=>{
    let arr = [];
    recurse = (current)=>{
        if(JSON.stringify(current["children"])!=="[]"){
            arr.push(current);
            current["children"].forEach((child)=>{
                //console.log(child['firstName']);
                 recurse(child);
            })
        }else{
            arr.push(current);
            return;
        }
    }
    recurse(obj);
    return arr;
}