const express = require('express');

//Creating an instance of Router.
const router = express.Router();

//Importing the necessary modules from other folders
const runController = require('../controllers/runController.js');
const { isLoggedIn, isLoggedOut } = require('../middleware/authorization');

//Importing validators for connection creation or update
const connectionValidate = require('../middleware/validator').validateConnection;

//Router to display all connections
router.get("/connections", runController.getAllConnections);

//Router to display the connection page
router.get('/connection/:runId', runController.getRunObject);

//Router to create the connection
router.get('/createConnection', isLoggedIn, runController.createConnection);

//Router after submitting the create in create connection page
router.post('/createConnection', connectionValidate, isLoggedIn, runController.saveConnection);

//Router to get existing connection to update
router.get('/connection/:runId/update', isLoggedIn, runController.getUpdateRunObject);

//Router to save the RSVP connections
router.post('/connection/:runId/enrolledStatus', isLoggedIn, runController.saveEnrolledStatus);

//Router to save the updated connection
router.put('/connection/:runId', connectionValidate, isLoggedIn, runController.updateRunObject);

//Router to display the connections saved by the session user
router.get('/myConnections', isLoggedIn, runController.getSavedConnections);

//Router to delete the connection
router.delete('/connection/:id', isLoggedIn, runController.deleteRun);

//Router to delete RSVP
router.delete('/connection/:id/enrolledStatus', isLoggedIn, runController.deleteRSVP);

module.exports = router;