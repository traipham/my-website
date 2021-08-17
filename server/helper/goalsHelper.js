const mongoose = require('mongoose');
let Goals = require('../models/goals.js');

/**
 * class that contains helper methods for Goals router
 */
module.exports = class GoalsHelper{

    constructor(){
        this.createGoals = this.createGoals.bind(this);
    }
    /**
     * Create new goals collection
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
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