const ManagerRequirement = require('../models/ManagerForm');
const mongoose = require('mongoose');

// const scriptName = require('path').basename(__filename);
// const moment = require('moment');
// const cache = require('memory-cache');

// const memCache = new cache.Cache();

exports.getManagerFromData = (req, res, next) => {
    let { category, itemName, quantity, foodCategory, role } = req.body.query;
    const vendor = [{
        vendor_name: 'vendor1',
        vendor_quantity: 0
    }, {
        vendor_name: 'vendor2',
        vendor_quantity: 0
    }]
    let managerNewFormQuery = new ManagerRequirement({ category, itemName, quantity, foodCategory, role, vendor });
    managerNewFormQuery.save((err, data) => {
        if (err) { return next(err); }
        res.json(data);
    });
}
exports.getVendor1FromData = (req, res, next) => {
    let { category, itemName, quantity, role, vendor_name, _id } = req.body.query;
    // let managerNewFormQuery = new ManagerRequirement({ category, itemName, quantity, role });
    // managerNewFormQuery.save((err, data) => {
    //     if (err) { return next(err); }
    //     res.json(data);
    // });
    // let projection = {
    //     category: 1,
    //     itemName: 1,
    //     quantity: 1,
    //     role: 1,
    //     foodCategory: 1,
    // };
    ManagerRequirement.findOne({ _id }, (err, dataList) => {
        if (err) { return next(err); }

        dataList.vendor.map(vendor => {
            if (vendor.vendor_name === vendor_name) {
                vendor.vendor_quantity = quantity;
            }
        });
        const ven1 = dataList.vendor;
        ManagerRequirement.updateOne({ _id }, { vendor: ven1 }, (err, data) => {
            if (err) { return next(err); }
            res.json(data);
        })

        // if (dataList.vendor.length === 2) {
        //     dataList.vendor.map(vendor => {
        //         if (vendor.vendor_name === vendor_name) {
        //             vendor.vendor_quantity = quantity;
        //         }
        //     });
        //     const ven1 = dataList.vendor;
        //     ManagerRequirement.updateOne({ _id }, { vendor: ven1 }, (err, data) => {
        //         if (err) { return next(err); }
        //         res.json(data);
        //     })

        // } else if (dataList.vendor.length === 1) {
        //     if (dataList.vendor[0].vendor_name === vendor_name) {
        //         dataList.vendor[0].vendor_quantity = quantity;
        //         let temp = dataList.vendor;
        //         ManagerRequirement.updateOne({ _id }, { vendor: temp }, (err, data) => {
        //             if (err) { return next(err); }
        //             res.json(data);
        //         })
        //     } else {
        //         let vendor = [{
        //             vendor_name,
        //             vendor_quantity: quantity
        //         }];
        //         vendor.push(dataList.vendor[0]);
        //         ManagerRequirement.updateOne({ _id }, { vendor }, (err, data) => {
        //             if (err) { return next(err); }
        //             res.json(data);
        //         });
        //     }
        // } else {
        //     let vendor = [{
        //         vendor_name,
        //         vendor_quantity: quantity
        //     }]
        //     ManagerRequirement.updateOne({ _id }, { vendor }, (err, data) => {
        //         console.log("TCL: data", data)
        //         if (err) { return next(err); }
        //         res.json(data);
        //     })

        // }
    });
}

exports.getVendor2FromData = (req, res, next) => {
    let { category, itemName, quantity, role } = req.body.query;
    let managerNewFormQuery = new ManagerRequirement({ category, itemName, quantity, role });
    managerNewFormQuery.save((err, data) => {
        if (err) { return next(err); }
        res.json(data);
    });
}

exports.getFoodItemName = (req, res, next) => {
    let { category, role } = req.body.query;
    let query = {
        category,
        role
    };
    let projection = {
        itemName: 1,
    }
    ManagerRequirement.find(query, projection, (err, data) => {
        if (err) { return next(err); }
        res.json(data);
    });
}

exports.getInventoryItemsData = (req, res, next) => {
    let query = {};
    let projection = {
        category: 1,
        itemName: 1,
        quantity: 1,
        role: 1,
        foodCategory: 1,
        vendor: [{
            vendor_name: 1,
            vendor_quantity: 1,
        }]
    }
    ManagerRequirement.find(query, projection, (err, data) => {
        if (err) { return next(err); }
        console.log("TCL: exports.getFoodCategoryItem -> data", data)
        res.json(data);
    });
}