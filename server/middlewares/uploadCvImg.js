const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dbnxld9bg",
    api_key: "727789656541511",
    api_secret: "VApDxGNW1jsAObqT2HE74T9lpzY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'datn-nda', // Thư mục trên Cloudinary để lưu trữ file
    allowedFormats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

const uploadImg = (req, res, next) => {
    const upload = multer({ storage: storage }).single('cvImage');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error uploading image' });
      } else if (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      const imageUrl = req.file.path;

    // Gán URL vào req.body hoặc req.file để sử dụng trong controller
    req.body.cvImgUrl = imageUrl;
      next();
    });
  };
  
  module.exports = uploadImg;
  