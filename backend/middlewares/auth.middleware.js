import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied, no access token." });
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Access Token." });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized request, not an admin." });
  }
  next();
};
