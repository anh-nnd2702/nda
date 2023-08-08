const nodemailer = require('nodemailer');
const domain = require("../configs/domain.js")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: 'ndajob03@gmail.com',
        pass: 'mvausfxinanmlafk',
    },
    tls: {
        rejectUnauthorized: true
    }
});

exports.candidateEmailSender = async ({ emailTo, candName, jobs }) => {
    try {
        const clientDomain = domain.clientDomain;
        const jobWageGenerator = (minWage, maxWage) =>{
            let wage =""
            if (minWage > 0 && maxWage > 0) {
                if (minWage === maxWage) {
                    wage = `${minWage} triệu`;
                }
                else {
                    wage = `Từ ${minWage} đến ${maxWage} triệu`;
                }
            }
            else if (minWage > 0) {
                wage = `Từ ${minWage} triệu`;
            }
            else if (maxWage > 0) {
                wage = `Đến ${maxWage} triệu`
            }
            else {
                wage = `Thỏa thuận`;
            }
            return wage
        }

        const jobList = jobs.map(job => `<li style="list-style-type: none;">
        <a style="font-weight: bold; font-style: italic; text-decoration: none;" href="${clientDomain}/job/${job.jobId}">${job.jobTitle}</a>
        <p style="font-style: italic;">${jobWageGenerator(job.minWage, job.maxWage)}</p>
        <p style="font-style: italic;">Địa điểm làm việc: ${job.address}</p>
        </li>`).join('');

        const htmlContent = `
            <p>Xin chào ${candName},</p>
            <span>Bạn nhận được email này khi đã cài đặt nhận email từ NDAJob. Để đặt lại cài đặt vui lòng bấm vào </span> <a href="${clientDomain}/setting">đây</a>.
            <span>Các công việc phù hợp với bạn:</span>
            <ul style="list-style: none">
                ${jobList}
            </ul>
            <span>Để được gợi ý các công việc chính xác hơn trong tương lai vui lòng truy cập <a href="${clientDomain}" style="font-weight: bold; font-style: italic; text-decoration: none;">NDAJob</a> để chỉnh sửa cài đặt tìm việc.
            </span>
            <p>Chúc bạn tìm được công việc như ý.</p>
            <p>NDAJob</p>
        `;

        // Cấu hình email
        const mailOptions = {
            from: 'NDAJob Admin',
            to: emailTo,
            subject: 'Gợi ý việc làm từ NDAJob',
            html: htmlContent,
        };
        //console.log(jobs);
        // Gửi email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
};

exports.resetCandidatePasswordEmail = async (emailTo, token) => {
    try {
        const clientDomain = domain.clientDomain;
        const htmlContent = `
            <p>Xin chào,</p>
            <p>Để đặt lại mật khẩu, vui lòng bấm vào <a href="${clientDomain}/candidate/resetPassword/${token}">đây</a>.</p>
            <p>Hãy lưu ý không gửi cho bất kỳ ai các thông tin trong email này để bảo vệ tài khoản của bạn!</p>
            <p>Yêu cầu đổi mật khẩu qua email này chỉ tồn tại trong 5 phút, vui lòng truy cập và đổi mật khẩu của bạn trong thời gian này!</p>
            <p>Chúc bạn một ngày tốt lành!</p>
            <p>NDAJob</p>
        `;

        const mailOptions = {
            from: 'NDAJob Admin',
            to: emailTo,
            subject: 'Đặt lại mật khẩu từ NDAJob',
            html: htmlContent,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
};

exports.resetCompanyPasswordEmail = async (emailTo, token) => {
    try {
        const clientDomain = domain.clientDomain;
        const htmlContent = `
            <p>Xin chào,</p>
            <p>Để đặt lại mật khẩu, vui lòng bấm vào <a href="${clientDomain}/company/resetPassword/:${token}">đây</a>.</p>
            <p>Hãy lưu ý không gửi cho bất kỳ ai các thông tin trong email này để bảo vệ tài khoản của bạn!</p>
            <p>Yêu cầu đổi mật khẩu qua email này chỉ tồn tại trong 5 phút, vui lòng truy cập và đổi mật khẩu của bạn trong thời gian này!</p>
            <p>Chúc bạn một ngày tốt lành!</p>
            <p>NDAJob</p>
        `;

        const mailOptions = {
            from: 'NDAJob Admin',
            to: emailTo,
            subject: 'Đặt lại mật khẩu từ NDAJob',
            html: htmlContent,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log("run to this");
    } catch (error) {
        throw error;
    }
};
