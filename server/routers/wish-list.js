const mongoose = require('mongoose');
const router = require('express').Router();
const WishList = require('../models/wish-list');
const WishListHelper = require('../helper/wishListHelper');

const wishListHelper = new WishListHelper();

router.route('/').get((req, res) => {
    WishList.find()
        .then((wish) => {
            // intialize interest collection
            // Error: (node:24072) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: 
            // Cannot set headers after they are sent to the client
            if (Object.keys(wish).length === 0){
                const log = wishListHelper.createWishListCollection(req, res);
                console.log(log);
            }
            res.json(wish)
        })
        .catch((err) => res.status(400).json(err))
})

router.route('/addWish').post((req, res) => {
    const wishListId = 1;

    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const tag = req.body.tag;
    const rating = req.body.rating;
    const index = req.body.index;
    const date = new Date();

    const addWish = {
        title: title,
        description: description,
        img: img,
        tag: tag,
        rating: rating,
        index: index,
        date: date
    }

    let newWish = {};

    try{
        newWish = WishList.findOne({ _id: wishListId });
    } catch(err) {
        return res.status(400).json("Error: " + err);
    }

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