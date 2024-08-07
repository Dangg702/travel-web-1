const nodemailer = require('nodemailer');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

const sendEmailCreateBooking = async (bookingData) => {
    let clientMail = bookingData.contactInfo.email;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT,
        to: clientMail,
        subject: 'Booking Confirmation',
        text: 'Your booking has been confirmed!',
        html: `
            <h1>Booking Confirmation</h1>
            <p>Dear Customer,</p>
            <p>Your booking has been confirmed. Please find the details below:</p>
            <p><strong>Booking ID:</strong> ${bookingData._id} </p>
            <p><strong>Tour ID:</strong> ${bookingData.tourId._id} </p>
            <p><strong>Tour Name:</strong> ${bookingData.tourId.name}</p>
            <p><strong>Number of people:</strong> ${bookingData.numOfPeople}</p>
            <p><strong>Date go:</strong> ${bookingData.tourId.dateGo}</p>
            <p><strong>Date back:</strong> ${bookingData.tourId.dateBack}</p>
            <p><strong>Time:</strong> 05:00 AM</p>
            <p>Thank you for choosing our service.</p>
            <p>Best regards,</p>
            <p>Viet Travel</p>
        `,
    });
};

const sendContactEmail = async (data) => {
    let senderEmail = data.email;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    // Gửi email với đối tượng vận chuyển đã được xác định
    let info = await transporter.sendMail({
        from: senderEmail,
        to: process.env.MAIL_ACCOUNT,
        subject: 'Liên hệ từ khách hàng mới',
        text: 'Xin chào,',
        html: `
      <p>Tôi là ${data.sender}. Tôi gửi email này để liên hệ với bạn về một số thông tin quan trọng.</p>
      <p>Tôi quan tâm và muốn được biết thêm về <strong>${data.message}</strong>. Xin vui lòng cung cấp thông tin chi tiết hoặc giải đáp câu hỏi của tôi.</p>
      <p>Dưới đây là thông tin liên hệ của tôi:</p>
      <p>Tên: ${data.sender}</p>
      <p>Địa chỉ email: ${data.email}</p>
      <p>Tôi mong nhận được phản hồi từ bạn sớm nhất để chúng ta có thể tiếp tục trao đổi thông tin. Xin cảm ơn vì đã dành thời gian đọc email này.</p>
      <p>Trân trọng,</p>
      <p>${data.sender}</p>
    `,
    });
};

module.exports = { sendEmailCreateBooking, sendContactEmail };
