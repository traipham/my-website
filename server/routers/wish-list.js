// WishList router
const mongoose = require('mongoose');
const router = require('express').Router();
const WishList = require('../models/wish-list');
const WishListHelper = require('../helper/wishListHelper');

const wishListHelper = new WishListHelper();

/**
 * GET all wishes 
 */
router.route('/').get((req, res) => {
    WishList.find()
        .then((wish) => {
            // intialize interest collection ( use db.createCollection() ) next time
            // Error: (node:24072) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: 
            // Cannot set headers after they are sent to the client
            if (Object.keys(wish).length === 0) {
                const log = wishListHelper.createWishListCollection(req, res);
                console.log(log);
            }
            return res.json(wish)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
})

/**
 * ADD new wishes
 */
router.route('/addWish').post((req, res) => {
    const wishListId = 1; // TODO: Generate unique Id?

    // Get user input 
    const wishPostId = new mongoose.Types.ObjectId;
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const tag = req.body.tag;
    const rating = req.body.rating;
    const index = req.body.index;
    const date = new Date(); // TODO: input date? 

    // Store values in object
    const addWish = {
        _id: wishPostId,
        title: title,
        description: description,
        img: img,
        tag: tag,
        rating: rating,
        index: index,
        date: date
    }

    // Reference variable to Wishlist query
    let newWish = {};

    try{
        // Find specific Wishlist query based on Id ( only 1 )
        newWish = WishList.findOne({ _id: wishListId });
    } catch(err) {
        return res.status(400).json("Error: " + err);
    }

    // Add user input to Wishlist query
    newWish.then((resolve) => {
        resolve.wishes.push(addWish)
        try{
            resolve.save()
        } catch(err) {
            return res.status(400).json("Error: " + err)
        }
        return res.json("Added new wish!")
    })
})

module.exports = router;