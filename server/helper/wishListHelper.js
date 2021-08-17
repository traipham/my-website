const mongoose = require('mongoose');
const WishList = require('../models/wish-list');

class WishListHelper{
    constructor(){
        this.createWishListCollection = this.createWishListCollection.bind(this);
    }

    /**
     * initialize interest collection
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createWishListCollection(req, res){
        let newWishListCollection = new WishList();
        newWishListCollection._id = 1;
        newWishListCollection.wishes = [{
            title: "Initialize Value",
            description: "Initialize Value",
            img: "Initialize_value.img",
            tag: "Initialize value",
            rating: 0,
            index: 0,
            date: new Date()
        }]

        try{
            newWishListCollection.save()
        } catch(err) {
            return res.status(400).json("Error: " + err);
        }
        return res.json("Added first Wish Collection!");
    }
}

module.exports = WishListHelper;