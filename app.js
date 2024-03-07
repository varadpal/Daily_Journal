import express from "express"; 
import bodyParser from "body-parser";

// To make __dirname 
import { dirname } from "path"; 
import {fileURLToPath} from "url"; 
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000; 


// Initializing Body Parser
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("main");
})

app.post("/submit", function (req, res) {
    console.log(req.body);
})

app.listen(process.env.PORT || port, function () {
    console.log(`Successfully connected to ${port}.`);
})