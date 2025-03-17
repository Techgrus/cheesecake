import multer from "multer";

// Profile Image Storage
const profileStorage = multer.diskStorage({
  destination: "./uploads/images/profileImages",
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Product Image Storage
const productStorage = multer.diskStorage({
  destination: "./uploads/images/productImages",
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const profileUpload = multer({
  storage: profileStorage,
}).single("profileImage");

export const uploadProfileImage = (req, res, next) => {
  profileUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (req.file) {
      req.body.pictureUrl = `/uploads/images/profileImages/${req.file.filename}`;
    }
    next();
  });
};

// Product Image Upload Middleware
const productUpload = multer({
  storage: productStorage,
}).single("productImage");

export const uploadProductImage = (req, res, next) => {
  productUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    req.body.imageURL = `/uploads/images/productImages/${req.file.filename}`;

    next();
  });
};

export const updateProductImage = (req, res, next) => {
  productUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }

    if (req.file) {
      req.imageURL = `/uploads/images/productImages/${req.file.filename}`;
    }

    next();
  });
};
