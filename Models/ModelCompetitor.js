const mongoose = require('mongoose')

const {Schema} = mongoose

const schemaCompetitor=new Schema({
    id:{
        type : String,
        required :true,
        unique:true

    },
    name:{
        type : String,
        required : true
    },
    surName:{
        type : String,
        required :true

    },
    birthdate:{
        type:String,
        required: true
    },

    stakes: [
        {
          type : Schema.Types.ObjectId,
          ref : 'stake'
        }
      ],
    discipline : {
    type : Schema.Types.ObjectId,
    ref : 'discipline'
    }
    
}

)
module.exports = mongoose.model('competitor',schemaCompetitor);