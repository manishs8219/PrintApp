const CMS = require('../models/cms')

module.exports={

    cmsGetAll : async (req, res) => {
        try {
          const result = await CMS.find();
          return res.status(200).json({ success: "Here Is  all cms", result });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
       termsAndConditionsCreate : async (req, res) => {
        try {
          const result = await CMS.create(req.body);
          return res.status(200).json({ success: "Created", result });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
       termsAndConditionsGet : async (req, res) => {
        try {
          const result = await CMS.findOne({ type: 1 });
          return res.status(200).json({ success: "Here Is T&C", result });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
       termsAndConditionsUpdate :async (req, res) => {
        try {
          const result = await CMS.findOneAndUpdate({ type: 1 }, req.body);
          if (result) {
            result.content = req.body.content || result.content;
            result.title = req.body.title || result.title;
          }
          const user = await result.save();
      
          return res.status(200).send({ succcess: "Updated t&c", user });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
       privacyPolicyGet :async (req, res) => {
        try {
          const result = await CMS.findOne({ type: 0 });
          return res.status(200).json({ success: "Here Is p&p", result });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
       privacyPolicyUpdate :async (req, res) => {
        try {
          const result = await CMS.findOneAndUpdate({ type: 0 }, req.body);
          if (result) {
            result.content = req.body.content || result.content;
            result.title = req.body.title || result.title;
          }
          const user = await result.save();
      
          return res.status(200).send({ succcess: "Updated p&p", user });
        } catch (error) {
          res.status(400).send(error.message);
        }
      },
      
}