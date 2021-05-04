const { populate } = require('../model/Run.js');
const Run = require('../model/Run.js');
const User = require('../model/user.js');
//Validation result to validate the input in forms
const validationResult = require('express-validator').validationResult;

//Gets all the runs to display in connections page
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

//Gets the run object to display in connection page
exports.getRunObject = (req, res, next) => {
    var runId = req.params.runId;
    Run.findById(runId)
    .then((run) => {
            res.render("./runs/connection", { run });
    })
    .catch((err) => {
        console.log(err);
        next();
    });
};

//Gets the saved connections for the user to display in myConnections
exports.getSavedConnections = (req, res, next) => {
    let sessionUser = req.session.user;
    runs = [];
    if(sessionUser != null){
        User.findOne({_id: sessionUser.id}).populate('rsvp.run')
            .then(user => {
                Run.find({'user': sessionUser.id})
                    .then(run => {
                        res.render("./runs/myConnections", {users: user, runs: run});  
                    })
            })
        .catch((err) => {
            console.log(err);
            next();
        })
    }else{
        res.redirect("/users/login");
    }
};

//Create a new run
exports.createConnection = (req, res, next) => {
    res.render("./runs/createConnection");
};

//Saves the run to the model
exports.saveConnection = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        res.redirect('back');
    }else{
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
            user: req.session.user.id
        });
    
        newConnection.save()
        .then((result) => {
            req.flash('success', newConnection.connectionName+' is created');
            res.redirect('/runs/connections');
        })
        .catch((err) => {
            console.log(err);
            next();
        });
        
    }

};

//Gets the run object to display in updateform
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

//Updates the run object to model
exports.updateRunObject = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        res.redirect('back');
    }

    let updateConnection = {
        connectionName: req.body.connectionName,
        category: req.body.category,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventArea: req.body.eventArea,
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
            Run.findByIdAndDelete(req.params.id)
            .then(run => {
                console.log(run);
                User.updateMany({ },
                    { $pull: { rsvp: { run: req.params.id } } },
                    { multi: true }
                  ).then(result => {
                      console.log(result);
                      res.redirect('/runs/connections');
                    })
                req.flash('success', 'Successfully deleted the run');
            });
        }else{
            req.flash('error', 'User is not authorized to delete');
            res.redirect('/runs/connections');
        }
    })
    .catch(err => {
        console.log(err);
        next();
    });
};

//Saves the RSVP value to the model for which the user is interested
exports.saveEnrolledStatus = (req, res, next) => {
    let runId = req.params.runId;
    let userId = req.session.user.id;
    let yes = req.body.yes;
    let no = req.body.no;
    let nextTime = req.body.nexttime;
    let containsRun = false;
    let status = "Next Time";
    let enrolled = "";

    if(yes){
        status = "Yes";
    }else if(no){
        status = "No";
    }

    User.findById(userId)
    .then(users =>{
        users.rsvp.forEach(run =>{
            if(run.run == runId){
                containsRun = true;
                enrolled = run.enrolled;
            }
        });
        if(yes && enrolled!=status){
            Run.findById(runId)
            .then(res => {Run.updateOne({_id: runId}, {$inc: {numberOfEnrollments: 1}})
            .then(result=>console.log(result))
        })
        }else if(no && enrolled!=status){
            Run.findById(runId)
            .then(result => {numberOfEnrollments = result.numberOfEnrollments;
            if(numberOfEnrollments > 0){
                Run.updateOne({_id: runId}, {$inc: {"numberOfEnrollments": -1}})
                .then(result=>{console.log(result)});
            }
        }).catch(err => {
            console.log(err);
            next();
        })
        }
        //If user is already enrolled, update the status change
        if(!containsRun){
            User.findByIdAndUpdate(userId,
                { $push: { 
                    rsvp:{
                        run: runId,
                        enrolled: status
                    }
                } 
                }).then(result => {
                    res.redirect('/runs/myConnections');
                })
        }else{
            //Create a new rsvp in user if not enrolled
            User.updateOne({ _id: userId, "rsvp.run": runId},
            {$set: {"rsvp.$.enrolled": status}}
            ).then(result => {
                res.redirect('/runs/myConnections');
            })
        }
    })
    .catch(err => {
        console.log(err);
        next();
    });
}; 

//Deletes the RSVP, if user clicks on delete
exports.deleteRSVP = (req, res, next) => {
    let enroll = 'no';
    User.findById(req.session.user.id)
    .then(user => {
        user.rsvp.forEach(rsvp =>{
            if(rsvp.run == req.params.id){
                enroll = rsvp.enrolled;
            }
        });
        if(user && user._id == req.session.user.id){
            User.updateOne(user, {$pull: {'rsvp': {run: req.params.id}}})
            .then(user => {
                //If the status for that rsvp is yes, decrement the numberOfEnrollments
                if(enroll == 'Yes'){
                    Run.findById(req.params.id)
                    .then(result => {
                        numberOfEnrollments = result.numberOfEnrollments;
                        if(numberOfEnrollments > 0){
                            Run.updateOne({_id: req.params.id}, {$inc: {"numberOfEnrollments": -1}})
                            .then(result=>{console.log(result)});
                        }
                })    
                }
                req.flash('success', 'RSVP deleted successfully');
                res.redirect('/runs/connections');
            })
        }else{
            req.flash('error', 'User is not authorized to delete');
            res.redirect('/runs/connections');
        }
    })
    .catch(err => {
        console.log(err);
        next();
    });  
};