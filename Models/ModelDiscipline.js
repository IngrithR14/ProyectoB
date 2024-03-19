const mongoose = require('mongoose')

const {Schema} = mongoose

const schemaDiscipline=new Schema({
    id:{
        type : String,
        required :true,
        unique:true

    },
    name:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required :true

    },
    group:{
        type:Boolean,
        required: true
    },

    competitors : [
        {
          type : Schema.Types.ObjectId,
          ref : 'competitor'
        }
      ]
    
}

)
module.exports = mongoose.model('discipline',schemaDiscipline);