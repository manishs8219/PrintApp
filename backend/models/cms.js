const mongoose = require('mongoose')

const cmsSchema = mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    type:{
        type:Number,
        enum:[0,1] // 0 =privacyplicy, 1 = termsandcondition
    }
},
{
    timestamps: true,
  })

  const cms = mongoose.model('cms',cmsSchema);
  module.exports = cms;



