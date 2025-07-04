const joi = require('joi');

const listings_schema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        discription : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.string().allow("",null)
    }).required()

});

module.exports = listings_schema;