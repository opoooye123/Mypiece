const VendorApplication = require(
  "../models/VendorApplication"
);
const User = require(
    "../models/User"
)

const applyForVendor = async (
  req,
  res
) => {
  try {
    const existingApplication =
      await VendorApplication.findOne({
        user: req.user._id,
      });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You already submitted an application",
      });
    }
    const existingBusiness =
  await VendorApplication.findOne({
    businessName: req.body.businessName,
  });

if (existingBusiness) {
  return res.status(400).json({
    message:
      "Business name already registered",
  });
}

    const application =
      await VendorApplication.create({
        user: req.user._id,
        ...req.body,
      });

    res.status(201).json(
      application
    );

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await VendorApplication.find({})
      .populate(
        "user",
        "name email"
      );

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveApplication =
  async (req, res) => {
    try {
      const application =
        await VendorApplication.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }

      application.status =
        "Approved";

      await application.save();

      const user =
        await User.findById(
          application.user
        );

      user.role = "vendor";
      user.isVendorApproved =
        true;

      await user.save();

      res.json(application);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const rejectApplication =
  async (req, res) => {
    try {
      const application =
        await VendorApplication.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }

      application.status =
        "Rejected";

      await application.save();

      res.json(application);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  applyForVendor,
  getApplications,
  approveApplication,
  rejectApplication
};