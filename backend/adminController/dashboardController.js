const db = require('../models/users')
const helper = require('../helper/helper')

module.exports = {
    dashboardofadmin: async (req, res) => {
        try {
            const total = await db.countDocuments({ role: "0" });
            return helper.success(res, 'Count successfully', total);
        } catch (error) {
            return helper.error(res, error);
        }
    }
    
}