// Goals router
const mongoose = require('mongoose');
const router = require('express').Router();
// import GoalsController from '../controller/goalsController.js';
const GoalsHelper = require('../helper/goalsHelper.js');
const Goals = require('../models/goals.js');
// const GoalPost = require('../models/goalPost'); // individual posts for goals

let goalsHelper = new GoalsHelper();
/**
 * GET all goals
 */
router.route('/').get((req, res) => {
    Goals.find()
        .then(goal => {
            // If goals collection does not exist, create one
            // Error: (node:24072) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: 
            // Cannot set headers after they are sent to the client
            // ( use db.createCollection() )
            if (Object.keys(goal).length === 0) {
                const log = goalHelper.createGoals(req, res);
                console.log(log);
            }
            res.json(goal);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * ADD new goal
 * 
 * @param {string} content - add content
 * @param {string} tagColor - add tagColor
 * @param {Number} index - add index
 */
router.route('/addGoal').post((req, res)=>{
    // const goalId = mongoose.Types.ObjectId();
    const goalId = 1; // TODO: generate unique ID?

    // Get user input 
    const goalPostId = new mongoose.Types.ObjectId;
    const content = req.body.content;
    const tagColor = req.body.tagColor;
    const index = req.body.index;
    const date = new Date(); // TODO: input date?
    
    // Store values in object
    const addGoal = {
        _id: goalPostId,
        content: content,
        tagColor: tagColor,
        index: index,
        date: date
    }

    // Reference variable to Goals query
    let newGoals = new Goals();

    try {
        // Find specific Goals query based on Id ( only 1 )
        newGoals = Goals.findOne({ _id: goalId })
    } catch(err){
        return res.status(400).json('Error: ' + err);
    }
    // console.log("individual goal: " + JSON.stringify(goal));

    // Add user input to Goals query
    newGoals.then((resolve) => {
        resolve.goals.push(addGoal)
        try {
            resolve.save();
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
        return res.json('Goals added!');
    })

});
// /**
//  * Get specific goal collection
//  * 
//  * NEED TO TEST, not needed yet
//  */
// router.route('/:id').get((req, res) => {
//     Goals.findById(req.params.id)
//         .then((post) => res.json(post))
//         .catch((err) => res.status(400).json("Error: " + err))
// })

/**
 * DElETE specific goal Post from collection
 * @param {string} id - collection id
 * @param {Number} index - index of this goal
 */
router.route('/delete/:id').delete((req, res) => {
    // Get input of post index to delete
    const goalPostIndex = Number(req.body.index);
    
    Goals.findById(req.params.id)
        .then((post) => {
            post.goals.splice(goalPostIndex, 1)

            post.save()
                .then(() => res.json("Deleted goal!"))
                .catch((err) => res.status(400).json("Error: " + err))
        })
        .catch((err) => res.status(400).json("Error: " + err))
}) 
/**
 * UPDATE goal post
 * 
 * @param {string} id - collection ID
 * @param {string} goalPostId - specific goal ID
 * @param {string} updateContent - updated content
 * @param {string} updateTagColor - updated tagColor
 * @param {Number} updateIndex - updated index
 */
router.route('/update/:id').post((req, res) => {
    // Get the previous id
    const goalPostId = req.body._id;
    // Get previous Index
    const goalPostPrevIndex = req.body.prevIndex;

    const updateContent = req.body.content;
    const updateTagColor = req.body.tagColor;
    const updateIndex = req.body.index;
    const updateDate = new Date;
    Goals.findById(req.params.id)
        .then((post) => {
            // FIND and UPDATE specify post
            post.goals.forEach((gPost) => {
                if(String(gPost._id) === goalPostId){
                    gPost.content = updateContent;
                    gPost.tagColor = updateTagColor;
                    gPost.index = updateIndex;
                    gPost.date = updateDate;

                    post.save()
                        .then(() => res.json("Updated goal!"))
                        .catch((err) => res.status(400).json("Error: " + err));
                }
            })
        })
        .catch((err) => res.status(400).json("Error: " + err))
})
module.exports = router;