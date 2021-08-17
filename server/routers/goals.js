const mongoose = require('mongoose');
const router = require('express').Router();
// import GoalsController from '../controller/goalsController.js';
const GoalsHelper = require('../helper/goalsHelper.js');
const Goals = require('../models/goals.js');

let goalsHelper = new GoalsHelper();
// Gets all the goals and return it in json format
router.route('/').get((req, res) => {
    Goals.find()
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Need to initialize a goal array of object if it doesn't exist
router.route('/add').post((req, res)=>{
    // const goalId = mongoose.Types.ObjectId();
    const goalId = 1; // Manual placement key for now 

    const content = req.body.content;
    const tagColor = req.body.tagColor;
    const index = req.body.index;
    const date = new Date();
    
    let addGoals = new Goals();

    try {
        addGoals = Goals.findOne({ _id: goalId })
    } catch(err){
        goalsHelper.createGoals(req, res);
        addGoals = Goals.findOne({ _id : goalId});
        res.status(400).json('Error: ' + err);
    }
    const goal = {
        content: content,
        tagColor: tagColor,
        index: index,
        date: date
    }
    // console.log("individual goal: " + JSON.stringify(goal));


    addGoals.then((resolve) => {
        resolve.goals.push(goal)
        resolve.save()
            .then(() => res.json('Goals added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })

});

module.exports = router;