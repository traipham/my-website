const mongoose = require('mongoose');
const router = require('express').Router();
const Interest = require('../models/interest');
const InterestHelper = require('../helper/interestHelper');

const interestHelper = new InterestHelper();


router.route('/').get((req, res) => {

    Interest.find()
        .then((interest) => {
            // If interest object is empty, create the first interest
            if (Object.keys(interest).length === 0){
                const log = interestHelper.createInterestCollection(req, res);
                console.log(log);
            }
            res.json(interest)
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

router.route('/addAcadInterest').post((req, res) =>{

    const interestId = 1; // TO-DO generated ID?

    const interest = req.body.interest;
    const date = new Date(); // TO-DO replace with ref to input date?

    const addInterest = {
        interest: interest,
        date: date
    };

    let newInterest = {};

    try{
        newInterest = Interest.findOne({ _id: interestId });
    } catch(err) {
        res.status(400).json("Error: " + err)
    }

    newInterest.then((resolve) => {
        resolve.academicInterests.push(addInterest);
        resolve.save()
            .then(() => res.json("Academic interest added!"))
            .catch((err) => res.status(400).json("Error: " + err))
    })
})

router.route('/addPersonalInterest').post((req, res) =>{
    const interestId = 1; // TO-DO generated ID?

    const interest = req.body.interest;
    const date = new Date(); // TO-DO replace with input date?

    const addInterest = {
        interest: interest,
        date: date
    }

    let newInterest = {};

    try{
        newInterest = Interest.findOne({ _id: interestId })
    } catch ( err ) {
        return res.status(400).json("Error: " + err);
    }

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