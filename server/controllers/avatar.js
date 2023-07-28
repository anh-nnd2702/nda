const avatarService = require("../services/avatar.js");
const path = require("path");
const fs = require('fs');

/*exports.updateAvatar = async (req, res) => {
    try {
        const candidateId = req.Id;
        const avatarUrl = req.file.path; // Đường dẫn đến tệp tin ảnh đã tải lên

        // Gọi service để cập nhật đường dẫn ảnh vào cơ sở dữ liệu
        const avatarURL = await avatarService.updateAvatar(candidateId, avatarUrl);

        if (!avatarURL) {
            const theNull = "";
            return res.json({avatar: theNull});
        }

        // Đường dẫn tới file avatar
        const filePath = path.join(__dirname, "../", avatarURL);

        const imageData = fs.readFileSync(filePath);

        // Chuyển đổi dữ liệu thành chuỗi base64
        const base64Data = imageData.toString('base64');

        return res.status(200).json({ message: "Avatar updated successfully", avatar: base64Data });
    } catch (error) {
        console.error("Error updating avatar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}*/

exports.updateAvatar = async (req, res) => {
    try {
      const candidateId = req.Id;
      const avatarUrl = req.file.path; // URL của ảnh đã tải lên từ middleware
  
      // Gọi service để cập nhật đường dẫn ảnh vào cơ sở dữ liệu
      const avatarURL = await avatarService.updateAvatar(candidateId, avatarUrl);
  
      if (!avatarURL) {
        const theNull = "";
        return res.json({ avatar: theNull });
      }
  
      return res
        .status(200)
        .json({ message: "Avatar updated successfully", avatar: avatarURL });
    } catch (error) {
      console.error("Error updating avatar:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getAvatar = async (req, res) => {
    try {
        const candidateId = req.Id;

        // Gọi service để lấy thông tin avatar
        const avatarUrl = await avatarService.getAvatar(candidateId);

        if (!avatarUrl) {
            const theNull = "";
            return res.json({avatar: theNull});
        }

        return res.json({ avatarUrl });
    } catch (error) {
        console.error("Error retrieving avatar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
