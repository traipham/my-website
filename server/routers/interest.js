// Interest router
/**
 * TODO: 
 * 
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
 * GET all academic interests
 */
router.route('/academic-interest').get((req, res) => {
    Interest.findOne({}, {academicInterests: 1})
        .then((interest) => {
            res.json(interest);
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * GET all personal interests
 */
router.route('/personal-interest').get((req, res) => {
    Interest.findOne({}, {personalInterests: 1})
        .then((interest) => {
            res.json(interest)
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * ADD academic interest
 * 
 * @param interest - new interest to add
 */
router.route('/addAcadInterest').post((req, res) =>{

    const interestId = 1; // TODO: generate uniqueID?

    // Get user input
    const acadInterestId = new mongoose.Types.ObjectId;
    const interest = req.body.interest;
    const date = new Date();
    // Store values in object
    const addInterest = {
        _id: acadInterestId,
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
 * 
 * @param {string} interest - new interest to add
 */
router.route('/addPersonalInterest').post((req, res) =>{
    const interestId = 1; // TODO: generate unique ID?

    // Get user input
    const personalInterestId = new mongoose.Types.ObjectId;
    const interest = req.body.interest;
    const date = new Date(); // TODO: replace with input date?

    // Store values in object
    const addInterest = {
        _id: personalInterestId,
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
/**
 * DELETE specific academic interest
 * 
 * @param {string} id - interest collection ID
 * @param {string} acadInterestId - specific interest id
 */
router.route('/delete/acad/:id').delete((req, res) => {
    const acadInterestId = req.body._id;

    Interest.findById(req.params.id)
        .then((interest) => {
            // Filters through array and create new array based params of callback function of filter
            const newInterestArr = interest.academicInterests.filter((value, index, arr) => {
                return String(value._id) != acadInterestId
            })
            try{
                if (interest.academicInterests.length === newInterestArr.length){
                    throw 'Could not delete/find interest'
                } else {
                    interest.academicInterests = newInterestArr;

                    interest.save()
                        .then(() => res.json("Deleted academic interest!"))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            } catch (err) {
                res.status(400).json("Error: "+ err)
            }
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * DELETE specific personal interest
 * 
 * @param {string} id - interest collection ID
 * @param {string} personalInterestId - specific interest id
 */
router.route('/delete/personal/:id').delete((req, res) => {
    const personalInterestId = req.body._id;

    Interest.findById(req.params.id)
        .then((interest) => {
            // Filters through array and create new array based params of callback function of filter
            const newInterestArr = interest.personalInterests.filter((value, index, arr) => {
                return String(value._id) != personalInterestId
            })
            try {
                if (interest.personalInterests.length === newInterestArr.length) {
                    throw 'Could not delete/find interest'
                } else {
                    interest.personalInterests = newInterestArr;

                    interest.save()
                        .then(() => res.json("Deleted personal interest!"))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            } catch (err) {
                res.status(400).json("Error: " + err)
            }
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * UPDATE academic interest
 * 
 * @param {string} id - interest collection id
 * @param {string} acadInterestId - specific interest id
 * @param {string} updateInterest - updated interest content
 */
router.route('/update/acad/:id').post((req, res) => {
    const acadInterestId = req.body._id;

    const updateInterest = req.body.interest;
    const updateDate = new Date();

    Interest.findById(req.params.id)
        .then((interest) => {
            // Find and Update specify academic interest
            interest.academicInterests.forEach((post) => {
                if(String(post._id) === acadInterestId){
                    post.interest = updateInterest;
                    post.date = updateDate;

                    // Save interest
                    interest.save()
                        .then(() => res.json("Updated academic interest!"))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            })
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * UPDATE personal interest
 * 
 * @param {string} id - interest collection id
 * @param {string} personalInterestId - specific interest id
 * @param {string} updateInterest - updated interest content
 */
router.route('/update/personal/:id').post((req,res) => {
    const personalInterestId = req.body._id;

    const updateInterest = req.body.interest;
    const updateDate = new Date();

    Interest.findById(req.params.id)
        .then((interest) => {
            // Find and Update specify personal interest
            interest.personalInterests.forEach((post) => {
                if (String(post._id) === personalInterestId) {
                    post.interest = updateInterest;
                    post.date = updateDate;

                    // Save interest
                    interest.save()
                        .then(() => res.json("Updated personal interest!"))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            })
        })
        .catch((err) => res.status(400).json("Error: " + err))
})
module.exports = router;