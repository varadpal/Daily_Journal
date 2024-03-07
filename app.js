import express from "express"; 
import bodyParser from "body-parser";
import pg from "pg";

// To make __dirname 
import { dirname } from "path"; 
import {fileURLToPath} from "url"; 
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000; 

const db = new pg.Client({
    user:"postgres",
    host:"localhost", 
    database:"dailyJournal", 
    password:"varad",
    port: 5432,
});

db.connect();

// Initializing Body Parser
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("main");

    const result = db.query("SELECT journal FROM journals WHERE id = 1");
    console.log(result);
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