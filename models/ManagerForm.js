const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const BrandScore = require('../models/BrandScore');



const managerFormSchema = new mongoose.Schema({
    category: String,
    itemName: String,
    quantity: Number,
    role: String,
    foodCategory: [String],
    vendor: [{
        vendor_name: String,
        vendor_quantity: String,
    }]
}, { autoIndex: true });

const ManagerForm = mongoose.model('manager_form', managerFormSchema, 'manager_form');

module.exports = ManagerForm;
