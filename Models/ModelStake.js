const mongoose = require('mongoose')

const {Schema} = mongoose

const schemStake=new Schema({
    id:{
        type : String,
        required :true,
        unique:true

    },
    position:{
        type : Number,
        required : true
    },

    competitor : {
      type : Schema.Types.ObjectId,
      ref : 'competitor'
    },

    event : {
      type : Schema.Types.ObjectId,
      ref : 'event'
    }

    
}

)
module.exports = mongoose.model('stake',schemStake);