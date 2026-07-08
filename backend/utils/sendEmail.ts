import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    console.log("🔥 EMAIL FUNCTION CALLED");

    const transporter = nodemailer.createTransport({
     
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Port 465 ke liye true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log("Before verify");

await transporter.verify();

console.log("SMTP VERIFIED");

console.log("Before sendMail");

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("EMAIL SENT", info.messageId);
    return info;
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
};