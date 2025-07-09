import { encryptToken, decryptToken } from "../utility/encryption.utility.js";
import configuration from "../models/configuration.model.js";

export const saveTokenToDB = async (key, token) => {
  const encryptedToken = encryptToken(token);

  try {
    const existingToken = await configuration.findOne({ key });
    if (existingToken) {
      // Update existing token
      existingToken.value = encryptedToken;
      await existingToken.save();
    } else {
      // Save new token
      const newToken = new configuration({ key, value: encryptedToken });
      await newToken.save();
    }

    return 1;
  } catch (error) {
    return null;
  }
};

export const getTokenFromDB = async (key) => {
  try {
    const tokenRecord = await configuration.findOne({ key });
    if (!tokenRecord) {
      throw new Error(`Token for service "${key}" not found.`);
    }

    const decryptedToken = decryptToken(tokenRecord.value);
    return decryptedToken;
  } catch (error) {
    console.error("Error fetching token:", error.message);
    return null;
  }
};
