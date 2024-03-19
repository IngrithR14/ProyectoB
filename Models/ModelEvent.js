const mongoose = require('mongoose')

const {Schema} = mongoose

const schemaEvent=new Schema({
    id:{
        type : String,
        required :true,
        unique:true

    },
    name:{
        type : String,
        required : true
    },
    startDate:{
        type : String,
        required :true

    },
    endingDate:{
        type:String,
        required: true
    },

    stakes : [
        {
          type : Schema.Types.ObjectId,
          ref : 'stake'
        }
      ]
    
}

)
module.exports = mongoose.model('event',schemaEvent);