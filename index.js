// Importing Necessary Packages
import express from "express"; 
import bodyParser from "body-parser";
import pg from "pg";
import _ from "lodash";

// To make __dirname (The Following Code is not required as we are currently using ejs)
import { dirname } from "path"; 
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initializing express()
const app = express();
const port = 3000; 

// Initializing Database with pg module i.e for postgres
const db = new pg.Client({
    user:"postgres.njoelgqxtqpwzguyddqn",
    host:"aws-0-ap-south-1.pooler.supabase.com", 
    database:"postgres", 
    password:"socket'ssecretdailyjournal",
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

let result= [];

app.get("/", function (req, res) {
    
    db.query("SELECT * FROM journals ORDER BY id ASC;", (err, res) => {
        if (err) {
            console.error(err.stack);
        }else{
            result = res.rows; 
        }
    });

    res.render("main", {
        record: result
    });    
})

app.post("/", function (req, res) {
    let journal = req.body.journal;
    // console.log(journal);
    
    db.query("INSERT INTO journals (journal) VALUES ($1)",[journal,]); 
    res.redirect("/");
})

// app.get("/posts/:postName", function(req, res) {
//     const requestedTitle = _.lowerCase(req.params.postName);
//     res.render("journal", {
//         Heading: 'Temp',
//         Journal: result[requestedTitle]
//     });
    
//     console.log(requestedTitle);
// })

app.post("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    // console.log(result);
    res.render("journal", {
        Heading: requestedTitle,
        Date: result[requestedTitle-1].date.toString(),
        Journal: result[requestedTitle-1].journal
    });

})

app.listen(process.env.PORT || port, function () {
    console.log(`Successfully connected to ${port}.`);
})
