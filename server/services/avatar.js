const Avatar = require("../models/avatar.js")

exports.updateAvatar = async (candidateId, avatarUrl) => {
    try {
        let avatar = await Avatar.findOne({ where: { candId: candidateId } });

        if (!avatar) {
            // Nếu không tìm thấy avatar, tạo mới
            avatar = await Avatar.create({ candId: candidateId, avatarUrl });
        } else {
            // Nếu đã tồn tại, cập nhật avatarUrl
            avatar.avatarUrl = avatarUrl;
            await avatar.save();
        }
        return avatar.avatarUrl;
    } catch (error) {
        throw new Error("Error updating avatar");
    }
}

exports.getAvatar = async (candidateId) => {
    try {
        const avatar = await Avatar.findOne({
            where:{ candId: candidateId }});
        if (!avatar) {
            return null;
        }
        return avatar.avatarUrl;
    } catch (error) {
        throw new Error("Error retrieving avatar");
    }
};


