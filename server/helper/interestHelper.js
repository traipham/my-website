const mongoose = require('mongoose');
const Interest = require('../models/interest');

class InterestHelper{
    constructor(){
        this.createInterestCollection = this.createInterestCollection.bind(this);
    }

    async createInterestCollection(req, res){
        const interestCollection = new Interest();

        interestCollection._id = 1;
        interestCollection.academicInterests = [{
            interest: " ",
            date: new Date()
        }]
        interestCollection.personalInterests = [{
            interest: " ",
            date: new Date()
        }]
        try{
            await interestCollection.save()
        } catch ( err ) {
            res.status(400).json("Failed to create and add new interest Collection!");
        }

        return res.json("Created and added first interest Collection!");
    }
}

module.exports = InterestHelper;