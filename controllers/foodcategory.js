const Category = require('../models/FoodCategory');
// const scriptName = require('path').basename(__filename);
// const moment = require('moment');
// const cache = require('memory-cache');

// const memCache = new cache.Cache();

exports.getFoodCategoryItem = (req, res, next) => {
    // let {  } = req.body.query;
    let query = {};
    let projection = {
        name: 1,
        displayName: 1,
    };
    Category.find(query, projection, (err, data) => {
        if (err) { return next(err); }
        console.log("TCL: exports.getFoodCategoryItem -> data", data)
        res.json(data);
    });
}



