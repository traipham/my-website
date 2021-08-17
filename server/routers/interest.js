// Interest router
/**
 * TODO: 
 *  - GET personal interest
 *  - GET academic interest
 */
const mongoose = require('mongoose');
const router = require('express').Router();
const Interest = require('../models/interest');
const InterestHelper = require('../helper/interestHelper');

const interestHelper = new InterestHelper();

/**
 * GET all interests 
 */
router.route('/').get((req, res) => {

    Interest.find()
        .then((interest) => {
            // If interest collection does not exist, create one
            // Error: (node:24072) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: 
            // Cannot set headers after they are sent to the client
            // ( use db.createCollection() )
            if (Object.keys(interest).length === 0){
                const log = interestHelper.createInterestCollection(req, res);
                console.log(log);
            }
            res.json(interest)
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * ADD academic interest
 */
router.route('/addAcadInterest').post((req, res) =>{

    const interestId = 1; // TODO: generate uniqueID?

    // Get user input
    const interest = req.body.interest;
    const date = new Date(); // TODO: replace with ref to input date?

    // Store values in object
    const addInterest = {
        interest: interest,
        date: date
    };

    // Reference variable to Interest query
    let newInterest = {};

    try{
        // Find specific interest query based on Id ( only 1 )
        newInterest = Interest.findOne({ _id: interestId });
    } catch(err) {
        return res.status(400).json("Error: " + err)
    }

    // Add user input ( academic interest ) to interest query
    newInterest.then((resolve) => {
        resolve.academicInterests.push(addInterest);
        try{
            resolve.save();
        } catch(err) {
            return res.status(400).json("Error: " + err)
        }
        return res.json("Academic interest added!")
    })
})

/**
 * ADD personal interest
 */
router.route('/addPersonalInterest').post((req, res) =>{
    const interestId = 1; // TODO: generate unique ID?

    // Get user input
    const interest = req.body.interest;
    const date = new Date(); // TODO: replace with input date?

    // Store values in object
    const addInterest = {
        interest: interest,
        date: date
    }

    // Reference varible to interest query
    let newInterest = {};

    try{
        // Find specific interest query based on Id ( only 1 )
        newInterest = Interest.findOne({ _id: interestId })
    } catch ( err ) {
        return res.status(400).json("Error: " + err);
    }
    // Add user input( personal interest ) to interest query 
    newInterest.then((resolve) => {
        resolve.personalInterests.push(addInterest);
        try{
            resolve.save()
        } catch (err) {
            return res.status(400).json("Error: " + err);
        }  
        return res.json("Added new personal Interest!");
    })


})

module.exports = router;