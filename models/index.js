const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = require('bluebird')

const UserSchema = new Schema({
    name:{type: String, require: true},
    pwd: {type: String, require: true}
})

const OfoSchema = new Schema({
    number:{type: String,require: true},
    pwd:{type: Number, require: true}
})

const Models = {
    User: mongoose.model('user',UserSchema),
    Ofo: mongoose.model('Ofo', OfoSchema)
}

const init = () => {
    Models.User.find({}).exec().then(docs => {
        if(!docs.length){
            Models.User.create({name: 'admin', pwd: 'admin'})
        }
    }).catch(err => {
        console.log(err)
    })
}

const url = 'mongodb://localhost:27017/ofo'
mongoose.connect(url)
const connection = mongoose.connection
connection.on('error', () => {
    console.log('mongodb connect error')
})

connection.once('open', () => {
    console.log('mongodb connect success')
    init()
} )

module.exports = Models