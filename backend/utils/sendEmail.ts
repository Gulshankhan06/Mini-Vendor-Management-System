import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div>
          <h2>Email Verification</h2>
          <h1>${otp}</h1>
        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESS");
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};