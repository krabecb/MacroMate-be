//index.js within the models directory serves as a hub for all model schemas to be used throughout application
module.exports = {
    Post: require('./Post'),
    User: require('./User')
}