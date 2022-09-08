//REST API calls via express

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt  = require("bcryptjs");

//middleware
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.post("/blog", async(req, res) => {
    try {
        const { content, title, user_id, created_at } = req.body;
        const newBlog = await pool.query("INSERT INTO blog (content, title, user_id, created_at) VALUES($1, $2, $3, $4)", [content, title, user_id, created_at]);
        res.json(newBlog);
    } catch (error) {
        console.error(error.message);
    }
});


app.get("/", (req, res) => {
    res.send("home");
});

app.post("/signin", async (req, res) => {
    try {
        var { name, email, password, cpassword, created_at } = req.body;
        if(!name || !email || !password || !cpassword){
            return res.status(422).json({error: "Please fill all the fields"});
        } else if(password !== cpassword) {
            return res.status(422).json({error: "Password are not matching."});
        }

        const isUserExists = await pool.query("SELECT uid FROM users WHERE email = '"+email+"'");
    
        if(isUserExists.rowCount){
            return res.status(422).json({error: "User already exists."});
        }

        password = await bcrypt.hash(password, 12);
        cpassword = await bcrypt.hash(cpassword, 12);
        
        const newUser = await pool.query("INSERT INTO users (name, email, password, created_at) VALUES($1, $2, $3, $4)", [name, email, password, created_at]);
        res.status(200).json(newUser);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/signup", async (req, res) => {
    try {
        var {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "Please fill all the fields"});
        }

        password = bcrypt.hash(password, 12);
        const loginUser = await pool.query("SELECT uid FROM users WHERE email = '"+email+"' AND password = '"+password+"'");
        if(!loginUser.rowCount){
            return res.status(400).json({error: "Invalid username or password."}) ;
        } else {
            res.json({message: "User signin successfull"});
        }

    } catch (error) {
        console.error(error.message);
    }
});

app.listen(4000, () => {
    console.log("server has started 4000");
});

//websocket server

const webSocketsServerPort = '5000';
const webSocketServer = require('websocket').server;
const http = require("http");
const { NOW } = require("sequelize");

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listen on port 5000');


const wsServer = new webSocketServer({
    httpServer: server
});


const clients = {};

const getUniqueId = () => {
    const id = () => Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1);
    return id() + id() + '-' + id();
}

wsServer.on('request', function(request){
    var userId = getUniqueId();
    console.log((new Date()) + 'Receive a new connection from origin ' + request.origin + '.');

    //create connection
    var connection = request.accept(null, request.origin);
    clients[userId] = connection;
    
    //on message 
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);

            for(key in clients){
                clients[key].sendUTF(message.utf8Data);

            }
        }
    });
    //connection close with server
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});