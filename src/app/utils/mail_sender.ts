import nodemailer from 'nodemailer';
import { configs } from '../configs';
type TMailContent = {
    to: string,
    subject: string,
    textBody: string,
    htmlBody: string,
    name?: string
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: configs.email.app_email!,
        pass: configs.email.app_password!,
    },
});

// ✅ Email Sender Function
const sendMail = async (payload: TMailContent) => {
    const info = await transporter.sendMail({
        from: 'info@digitalcreditai.com',
        to: payload.to,
        subject: payload.subject,
        text: payload.textBody,
        html: payload.htmlBody,
    });
    return info
};

export default sendMail;
