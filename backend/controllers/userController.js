const User = require("../models/User")

//Application as a vendor
const applyVendor = async(req,res) =>{
    try{

        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
      
        //change role to vendor
        user.role = "vendor";

        await user.save();

        res.json({
            message: "Vendor application successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVendoApproved: user.isVendorApproved,
            },
        })

    }catch(error){
     res.status(500).json({
        message: error.message,
     });
    }
};

module.exports = {
    applyVendor,
}