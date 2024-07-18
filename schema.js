const joi =require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().min(0).required(),
        country: joi.string().required(),
        location: joi.string().required(),
        image: joi.string().allow(null,""),      
    })
});

module.exports.reviewSchema = joi.object({
    review:joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment:joi.string().required(),
    }).required()
});