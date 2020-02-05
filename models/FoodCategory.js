const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const BrandScore = require('../models/BrandScore');



const categorySchema = new mongoose.Schema({
    name: String,
    displayName: String,
}, { autoIndex: true });

const Category = mongoose.model('food_category', categorySchema, 'food_category');

module.exports = Category;