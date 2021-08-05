const router = require('express').Router();
let Goals = require('../models/goals.js');

// Gets all the goals and return it in json format
router.route('/').get((req, res) => {
    Goals.find()
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res)=>{
    const content = req.body.content;
    const tagColor = req.body.tagColor;
    const index = req.body.index;
    const date = req.body.date;

    // create a new variable of type Goals to save newly pushed entry in
    let goals = Goals;

    const goal = {
        content: content,
        tagColor: tagColor,
        index: index,
        date: date
    }

    // Add to the goals array
    Goals.goals.push(goal);

    Goals.save(done)
        .then(() => res.json('Goal added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;