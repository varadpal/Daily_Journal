// Importing Necessary Packages
import express from "express"; 
import bodyParser from "body-parser";
import pg from "pg";

// To make __dirname (The Following Code is not required as we are currently using ejs)
import { dirname } from "path"; 
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initializing express()
const app = express();
const port = 3000; 

// Initializing Database with pg module i.e for postgres
const db = new pg.Client({
    user:"postgres",
    host:"localhost", 
    database:"dailyJournal", 
    password:"varad",
    port: 5432,
});

db.connect();   // Do not forget to write connect() else our app.js won't connect to db

// Initializing Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Here, we are:
// 1. Setting view engine to ejs so that our express connects with ejs modules. 
// 2. Also we are defining where our static elements used for designing
//    (like images and css) are located. 
app.set("view engine", "ejs");
app.use(express.static("public"));

let result= []



app.get("/", function (req, res) {
    
    db.query("SELECT * FROM public.journals ORDER BY id ASC;", (err, res) => {
        if (err) {
            console.error(err.stack);
        }else{
            result = res.rows; 
        }
    });
    // console.log(result[8].journal.slice(0,100));
    res.render("main", {
        record: result
    });    
})

app.post("/submit", function (req, res) {
    let journal = req.body.journal;
    // console.log(journal);
    
    db.query("INSERT INTO journals (journal) VALUES ($1)",[journal,]); 
    res.redirect("/");
})

app.listen(process.env.PORT || port, function () {
    console.log(`Successfully connected to ${port}.`);
})