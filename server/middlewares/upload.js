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

const upload = multer({ storage: storage });

module.exports = upload;

/*
// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images"); // Đường dẫn đến thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + "-" + uniqueSuffix;
    cb(null, fileName);
  },
});

// Tạo middleware "upload" sử dụng multer
const upload = multer({ storage: storage });

module.exports = upload;
*/