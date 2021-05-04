const Run = require('../model/Run.js');

//Gets all the connections
exports.getAllConnections = (req, res, next) => {
    var categories = [];

    Run.find()
    .then((runs) => {
        runs.forEach(run => {
            if(!categories.includes(run.category)){
                categories.push(run.category);
            }
        })
        res.render("./runs/connections", {runs, categories});
    })
    .catch((err) => {
        console.log(err);
        next();
    });
};

//Gets the connection object
exports.getRunObject = (req, res, next) => {
    var runId = req.params.runId;
    Run.findById(runId)
    .then((run) => {
        console.log(run.user);
            res.render("./runs/connection", { run });
    })
    .catch((err) => {
        console.log(err);
        next();
    });
};

//Gets the saved connections by the user
exports.getSavedConnections = (req, res, next) => {
    if(req.session.user != null){
        Run.find({eventHost: req.session.user.name})
        .then((runs) => {
            res.render("./runs/myConnections", {runs});
        })
        .catch((err) => {
            console.log(err);
            next();
        })
    }else{
        res.redirect("/users/login");
    }
};

//Create connection
exports.createConnection = (req, res, next) => {
    res.render("./runs/createConnection");
};

//Saves the connection
exports.saveConnection = (req, res, next) => {
    let newConnection = new Run({
        connectionName: req.body.connectionName,
        category: req.body.category,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventArea: req.body.eventArea,
        eventHost: req.session.user.name,
        description: req.body.description,
        benefits: req.body.benefits,
        imageURL: req.body.imageURL,
        enrolled: 'Yes',
        user: req.session.user.id
    });

    newConnection.save()
    .then((result) => {
        res.redirect('/runs/connections');
    })
    .catch((err) => {
        console.log(err);
        next();
    });
    
};

//Gets the run object to update
exports.getUpdateRunObject = (req, res, next) => {
    var runId = req.params.runId;
    Run.findById(runId)
    .then((run) => {
        if(run.eventHost == req.session.user.name){
            res.render("./runs/updateConnection", { run });
        }else{
            res.redirect('/runs/connections');
        }
    })
    .catch((err) => {
        console.log(err);
        next();
    });
};

//Updates the run object
exports.updateRunObject = (req, res, next) => {
    let updateConnection = {
        connectionName: req.body.connectionName,
        category: req.body.category,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventArea: req.body.eventArea,
        enrolled: req.body.enrolled,
        description: req.body.description,
        benefits: req.body.benefits,
        imageURL: req.body.imageURL,
    };

    Run.findById(req.params.runId)
    .then(result => {
        if (result && result.user._id == req.session.user.id){
            return Run.findByIdAndUpdate(req.params.runId, { $set: updateConnection });
        }else{
            res.redirect('/runs/connections');
        }
    }).then(result => {
        res.redirect('/runs/connection/'+req.params.runId);
    })
    .catch(err => {
        console.log(err);
        next();
    })
};

//Deletes the run object selected
exports.deleteRun = (req, res, next) => {
    
    Run.findById(req.params.id)
    .then(result => {
        if(result && result.user._id == req.session.user.id){
            return Run.findByIdAndDelete(req.params.id);
        }else{
            res.redirect('/runs/connections');
        }
    })
    .then(result => {
        res.redirect('/runs/connections');
    })
    .catch(err => {
        console.log(err);
        next();
    });
};