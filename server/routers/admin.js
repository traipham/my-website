const mongoose = require('mongoose');
const router = require('express').Router();
const Admin = require('../models/admin');


/**
 * GET admin document
 */

router.route("/").get((req,res) => {
    Admin.find().then((admin) => {
        res.json(admin)
    })
})

/**
 * POST admin document
 */

router.route("/newAdmin").post(async (req, res) => {
    const adminId = new mongoose.Types.ObjectId;
    const pw = req.body.pw;
    // let newAdmin = {
    //     _id: adminId,
    //     pw: pw
    // }
    // Admin.find().then((res) => {
    //     res.push(newAdmin);
    //     try{
    //         res.save();
    //     } catch(err){
    //         return res.status(400).json("Error: " + err);
    //     }
    //     return res.status(200).json("Added new Admin! With pw: ", pw);
    // })

    let newAdmin = new Admin();
    newAdmin._id = adminId;
    newAdmin.pw = pw;

    await newAdmin.save()
        .then(() => res.json('Created new Admin!'))
        .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;