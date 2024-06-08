const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/fullstack',{
         
        })
        console.log('connect successfull')
 
        
    } catch (error) {
        console.log('connect  not successfull')

    }
}


module.exports = {connect}