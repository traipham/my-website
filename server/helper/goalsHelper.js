const mongoose = require('mongoose');
let Goals = require('../models/goals.js');

/**
 * class that contains helper methods for Routing for router>goals.js
 */
module.exports = class GoalsHelper{

    constructor(){
        this.createGoals = this.createGoals.bind(this);
    }
    async createGoals(req, res) {
        const goalId = 1;

        let newGoals = new Goals();
        newGoals._id = goalId;
        newGoals.goals = [];

        try {
            await newGoals.save();

        } catch (err) {
            return res.status(400).json({ success: false, err });
        }
        return (res.state(201).json({ success: true }));
    }
}