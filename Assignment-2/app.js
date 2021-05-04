const express = require("express");
const runs = require("./model/run_types.js");

var  runObjects = runs.runObjects;

const app = express();

app.listen(8084);
//app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/create', (req, res) => {
    res.render("createConnection");
});

app.get('/signup', (req, res) => {
    res.render("signUp");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/connections', (req, res) => {
    var simpleRun = [];
    var extensiveRun = [];
    runObjects.forEach(run => {
        var obj = {};
        if(run.connectionID.charAt(0) == "S"){
            obj['runId'] = run.connectionID;
            obj['runName'] = run.connectionName;
            simpleRun.push(obj);
        }else if(run.connectionID.charAt(0) == "E"){
            obj['runId'] = run.connectionID;
            obj['runName'] = run.connectionName;
            extensiveRun.push(obj);
        }else{
            res.status(404).render("error", {error: "The run type couldn't be found."});
        }
    });
    res.render("connections", {simpleRun, extensiveRun});
});

app.get('/connection/:runId', (req, res) => {
    var runId = req.params.runId;
    var runType = runs.getConnection(runId);
    var runTypeObject = runObjects[runType];
    if(runType != -1){
        res.render("connection", { runTypeObject });
    } else{
        res.status(404).render("error", {error: "The run type couldn't be found."});
    }
});

app.get('/savedConnections', (req, res) => {
    res.render("savedConnections");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});

app.use((req, res) => {
    res.status(404).render("error", {error: "Page cannot be found on the server"});
});