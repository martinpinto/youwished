/**
 * Helper class for mapping the datamodel and ensuring no database mappings are exposed to the client.
 */
var WishModel = {
};

// empty wishes model
WishModel.defaultWishSchema = {
    id: -1, // Number, external client-exposed id
    title: '', // String, mandatory
    description: '', // String
    categories: '', // String
    upvotes: 0, // Number
    author: '', // String, mandatory
    url: '' // String
};

WishModel.createWishFromBody = function createWishFromBody(body) {
    var wishSchema = this.defaultWishSchema;
    
    wishSchema.id = body._id;
    
    if (body.title !== 'undefined') {
        wishSchema.title = body.title;    
    }
    if (body.description !== 'undefined') {
        wishSchema.description = body.description;    
    }
    if (body.categories !== 'undefined') {
        wishSchema.categories = body.categories;    
    }
    if (body.upvotes !== 'undefined') {
        wishSchema.upvotes = body.upvotes;    
    }
    if (body.author !== 'undefined') {
        wishSchema.author = body.author;    
    }
    if (body.url !== 'undefined') {
        wishSchema.url = body.url;    
    }
    return wishSchema;
};

module.exports = WishModel;
