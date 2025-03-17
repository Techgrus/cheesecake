import { sendEmail } from "../utility/sendMail.utility.js";

export const contactUsEmail = async (req, res) => {
  try {
    const { name, email, reason, message } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please enter your name." });
    } else if (!email) {
      return res.status(400).json({ message: "Please enter email." });
    } else if (!reason) {
      return res
        .status(400)
        .json({ message: "Please enter reason for contacting us." });
    } else if (!message) {
      return res.status(400).json({ message: "Please enter a message." });
    }
    //Checks if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    await sendEmail(
      process.env.RCV_EMAIL,
      "Contact Us Form Submission",
      "contactUs",
      { name, email, reason, message }
    );

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again." });
  }
};

export const eventEmail = async (req, res) => {
  try {
    const { name, email, reason, message } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please enter your name." });
    } else if (!email) {
      return res.status(400).json({ message: "Please enter email." });
    } else if (!reason) {
      return res
        .status(400)
        .json({ message: "Please enter reason for contacting us." });
    } else if (!message) {
      return res.status(400).json({ message: "Please enter a message." });
    }
    //Checks if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    await sendEmail(
      process.env.RCV_EMAIL,
      "Event Inquiry Form Submission",
      "eventInquiry",
      { name, email, reason, message }
    );

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again." });
  }
};

export const wholeSaleContact = (req, res) => {
  const {
    businessName,
    businessType,
    zipCode,
    businessWebsite,
    cityState,
    businessAddress,
    contactName,
    positionTitle,
    emailAddress,
    phoneNumber,
    weeklyOrders,
    preferredFlavors,
    storageCapacity,
    offerReason,
    specificRequirements,
    howDidYouHear,
  } = req.body;

  // Validation Errors
  const errors = [];

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Required fields
  const requiredFields = {
    businessName,
    businessType,
    zipCode,
    businessWebsite,
    cityState,
    businessAddress,
    contactName,
    positionTitle,
    emailAddress,
    phoneNumber,
    weeklyOrders,
    storageCapacity,
    offerReason,
    howDidYouHear,
  };

  // Check for missing fields
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value || value.trim() === "") {
      errors.push(`${key} is required`);
    }
  }

  // Validate email format
  if (emailAddress && !isValidEmail(emailAddress)) {
    errors.push("Invalid email format");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors,
    });
  }

  const context = {
    businessName,
    businessType,
    zipCode,
    businessWebsite,
    cityState,
    businessAddress,
    contactName,
    positionTitle,
    emailAddress,
    phoneNumber,
    weeklyOrders,
    preferredFlavors,
    storageCapacity,
    offerReason,
    specificRequirements,
    howDidYouHear,
  };

  sendEmail(
    process.env.RCV_EMAIL,
    "Wholesale Contact Request",
    "wholeSaleContact",
    context
  );
  return res.status(200).json({
    success: true,
    message: "Wholesale contact request is valid",
    data: req.body,
  });
};
