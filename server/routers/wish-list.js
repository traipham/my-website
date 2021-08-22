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
/**
 * DELETE specific wish based on index
 * 
 * @param {string} id - wish collection id
 * @param {Number} wishIndex - index of wish being deleted
 */
router.route('/delete/:id').delete((req, res) => {
    const wishIndex = req.body.index;

    WishList.findById(req.params.id)
        .then((wish) => {
            wish.wishes.splice(wishIndex, 1);

            wish.save()
                .then(() => res.json("Deleted wish!"))
                .catch((err) => res.status(400).json("Error: " + err))
        })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * UPDATE wish based on id
 * 
 * @param {string} id - wish collection id
 * @param {string} wishId - wish id
 * @param {string} title - update title
 * @param {string} description - update description
 * @param {string} img - update path/source of img
 * @param {string} tag - update tag
 * @param {Number} rating - update rating 
 * @param {Number} index - update index
 * @param {Date} date - update date
 */
router.route('/update/:id').post((req, res) => {
    const wishId = req.body._id;

    const updateTitle = req.body.title;
    const updateDescription = req.body.description;
    const updateImg = req.body.img;
    const updateTag = req.body.tag;
    const updateRating = req.body.rating;
    const updateIndex = req.body.index;
    const updateDate = new Date();

    WishList.findById(req.params.id)
        .then((wish) => {
            wish.wishes.forEach((post) => {
                if(String(post._id) === wishId){
                    post.title = updateTitle;
                    post.description = updateDescription;
                    post.img = updateImg;
                    post.tag = updateTag;
                    post.rating = updateRating;
                    post.index = updateIndex;
                    post.date = updateDate;

                    wish.save()
                        .then(() => res.json("Updated post!"))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            })
        })
        .catch((err) => res.status(400).json("Error: " + err))
})



module.exports = router;