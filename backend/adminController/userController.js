const db = require('../models/admin')
var bcrypt = require('bcryptjs');
const helper = require('../helper/helper');
var jwt = require('jsonwebtoken');
const secretCryptoKey = "jwtSecretKey";

module.exports = {

    signup: async (req, res) => {
        try {

            const required = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                dob: req.body.dob
            };


            const nonRequired = {
                userLocation: {
                    type: 'Point',
                    coordinates: [req.body.latitude, req.body.longitude]
                },
                deviceToken: req.body.deviceToken,
                deviceType: req.body.deviceType,
                images: req.files && req.files.images,
                role: req.body.role,

                gender: req.body.gender
            };

            const requestData = await helper.vaildObject(required, nonRequired, res);

            if (!requestData) {
                // The validObject function returned null, indicating missing required properties
                return;
            }







            if (req.files && req.files.images) {
                var images = req.files.images
                if (images) {
                    req.body.images = await helper.fileUpload(images, "images");
                }
            }


            const findEmail = await db.findOne({
                email: req.body.email,
            });
            if (findEmail) {
                return helper.error(res, 'This Email is Already Exists');
            }

            // Hash the password
            const hash = bcrypt.hashSync(requestData.password, 10);

            // Create the user
            const createUser = await db.create({
                name: requestData.name,
                email: requestData.email,
                phoneNumber: requestData.phoneNumber,
                dob: requestData.dob,
                password: hash,
                role: requestData.role,
                // userLocation: requestData.userLocation,
                deviceToken: requestData.deviceToken,
                deviceType: requestData.deviceType,
                images:req.body.images,

            });

            let time = helper.unixTimestamp();
            let userInfo = await db.findOne({ _id: createUser._id });

            await db.updateOne(
                { _id: userInfo._id },
                {
                    $set: {
                        loginTime: time,
                        deviceToken: requestData.deviceToken
                    }
                }
            );

            // Generate JWT token
            let token = jwt.sign(
                {
                    data: {
                        _id: userInfo._id,
                        email: userInfo.email,
                        loginTime: time
                    }
                },
                secretCryptoKey,
                { expiresIn: '365d' }
            );
            userInfo.token = token;

            return helper.success(res, 'User Created Successfully', userInfo);
        } catch (error) {
            console.error(error); // Use console.error for logging errors
            return helper.error(res, error.message || 'An error occurred');
        }
    },


    login: async (req, res) => {
        try {
          const required = {
            email: req.body.email,
            password: req.body.password
          };
      
          const nonRequired = {
            deviceToken: req.body.deviceToken,
            deviceType: req.body.deviceType
          };
      
          const getdata = await helper.vaildObject(required, nonRequired, res);
      
          if (!getdata) {
            // The vaildObject function returned null, indicating missing required properties
            return;
          }
      
          let time = helper.unixTimestamp();
      
          const find_email = await db.findOne({ email: getdata.email });
      
          if (!find_email) {
            return helper.error(res, 'Incorrect email or password');
          }
      
          let checkPassword = await bcrypt.compare(getdata.password, find_email.password);
      
          if (!checkPassword) {
            return helper.error(res, 'Incorrect email or password');
          }
      
          await db.updateOne(
            { _id: find_email._id },
            {
              $set: {
                loginTime: time,
                deviceToken: getdata.deviceToken,
                deviceType: getdata.deviceType // Corrected typo here
              }
            }
          );
      
          let token = jwt.sign(
            {
              data: {
                _id: find_email._id,
                email: find_email.email,
                loginTime: time
              }
            },
            secretCryptoKey,
            { expiresIn: "365d" } // Optionally, you can set an expiration time for the token
          );
      
          find_email.token = token;
     
          return helper.success(res, 'Login Successfully', { token: token, user: find_email });

        } catch (error) {
          return helper.error(res, error);
        }
      },

    getprofile: async (req, res) => {
        try {

            const _id = req.user._id;

            const findData = await db.findOne({
                _id: _id
            })
            return helper.success(res, 'Profile Data get successfully', findData)
        } catch (error) {
            console.log(error)
            return helper.error(res, error)
        }
    },

    editProfile: async (req, res) => {
        try {

            const required = {}
            const nonRequired = {
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                phoneNumber: req.body.phoneNumber,
                images: req.files && req.files.images
            }

            const getdata = await helper.vaildObject(required, nonRequired, res)

            if (req.files && req.files.images) {
                var images = req.files.images;
                images = await helper.fileUploader('images', req.files.images);
            }

            const dataUpdate = await db.create({
                name: getdata.name,
                email: getdata.email,
                dob: getdata.dob,
                phoneNumber: getdata.phoneNumber,
                images: images
            })

            return helper.success(res, 'Update data sucessfully', dataUpdate)
        } catch (error) {
            return helper.error(res, error)
        }
    },

    userLogout: async(req,res)=>{
        try {
            
            const _id = req.user._id;

            const logout = await db.findOneAndUpdate(
                {_id:_id},
                {
                    $set:{
                        loginTime:0
                    }
                }
            )

            return helper.success(res,'User Logout Successfully',logout)
        } catch (error) {
           return helper.error(res,error) 
        }
    }

}