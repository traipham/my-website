const mongoose = require('mongoose');
const WishList = require('../models/wish-list');
/**
 * Class that contains helper methods for Wishlist router
 */
class WishListHelper{
    constructor(){
        this.createWishListCollection = this.createWishListCollection.bind(this);
    }

    /**
     * Create new interest collection
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