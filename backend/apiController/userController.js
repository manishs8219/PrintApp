const db = require('../models/admin')
var bcrypt = require('bcryptjs');
const helper = require('../helper/helper');
var jwt = require('jsonwebtoken');
const secretCryptoKey = "jwtSecretKey";

module.exports = {


    loginUser:async(req,res)=>{

        try {
            
            const required = {
                username:req.body.username,
                password:req.body.password
            }
    
            const nonRequired = {}
    
            const getdata = await helper.vaildObject(required,nonRequired,res)
    
    
            if(!getdata){
               
                return
            }
    
            const findUsername = await db.findOne({
                username:req.body.username
            })
    
            if(!findUsername){
                return helper.error(res,'User Not Found')
            }
    
            const match = await bcrypt.compare(getdata.password, findUsername.password);
    
            if(!match) {
                return helper.error(res, 'Incorrect email or password');
            }
            let time = helper.unixTimestamp();
            
            await db.updateOne(
                {_id:req.user._id},
                {
                    $set:{
                        loginTime: time,
                        deviceToken: getdata.deviceToken,
                        status:1
                    }
                })
    
                let token = jwt.sign(
                    {
                        data:{
                            _id:findUsername._id,
                            email:findUsername.email,
                            loginTime: time,
                        }
                    },
                    secretCryptoKey,
                )
    
                findUsername = JSON.parse(JSON.stringify(findUsername));
        
                // Assign the token to the driver object
                findUsername.token = token;
                return helper.success(res,"Login Success",auth)
        } catch (error) {
            return helper.error(res,error)
        }
    },







}