const db = require('../models/users')
var bcrypt = require('bcryptjs');
const helper = require('../helper/helper');
var jwt = require('jsonwebtoken');
const secretCryptoKey = "jwtSecretKey";
const admindb = require('../models/admin')

const saltRounds = 10;
module.exports = {

Addaccount:async(req,res)=>{
    try {

        const user_id = req.user.user_id
        const required = {
            username:req.body.username,
            password:req.body.password,
            appname:req.body.appname,
            state:req.body.state
        }

        const nonRequired = {}

        const getdata = await helper.vaildObject(required,nonRequired,res)

        if(!getdata){
            return
        }
        
        const finddata = await db.findOne({
            username:getdata.username
        })

        if(finddata){
            return helper.error(res,'This UserName is Already Exists')
        }

const hash = bcrypt.hashSync(getdata.password,saltRounds);

        const dataCreate = await db.create({
            user_id:user_id,
            username:getdata.username,
            password:hash,
            appname:getdata.appname,
            state:getdata.state
        })

        return helper.error(res,'Add Account successfully',dataCreate)
    } catch (error) {
        return helper.error(res,error)
    }
},

accountList:async(req,res)=>{
    try {
        
        const data = await db.find()

        
        return helper.success(res,'User List Get Successfully',data)
    } catch (error) {
        return helper.error(res,error)
    }
},
    
delete_user : async (req, res) => {
    try {
        const delete_data = await db.deleteOne({
            _id: req.params._id
        });
        return helper.success(res, "Driver Delete Success", delete_data);
    } catch (error) {
        return helper.error(res, error);
    }
},



accountdataget:async(req,res)=>{
    try {
        

        const dataGet = await db.findOne({
            _id:req.params._id
        })

        return helper.success(res,'User Data Get',dataGet)
    } catch (error) {
        return helper.error(res,error)
    }
},

update : async (req, res) => {
    try {
        const required = {};
        const nonRequired = {
            username: req.body.username,
            appname: req.body.appname,
  
            state: req.body.state,
            status: req.body.status,
       
        };

        const getdata = await helper.vaildObject(required, nonRequired, res);

if(!getdata){
  return
}

      
const dataGet = await db.findOneAndUpdate({
    _id:req.params._id
},
{
    $set:{
        username:req.body.username,
        appname:req.body.appname,
        state:req.body.state,
        status:req.body.status,
        
    }
})

        return helper.success(res, 'Driver Update Success', dataGet);
    } catch (error) {
        return helper.error(res, error);
    }
},
   

search: async (req, res) => {
    try {
      const data = await db.find({
        $or: [
          { username: { $regex: new RegExp(req.body.username, 'i') } },
    
        ],
      });
      return helper.success(res, 'Data Get Successfully', data);
    } catch (error) {
      return helper.error(res, error);
    }
  }


}