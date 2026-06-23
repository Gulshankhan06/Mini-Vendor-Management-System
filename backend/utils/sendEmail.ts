import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    console.log("🔥 EMAIL FUNCTION CALLED");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ EMAIL SENT SUCCESS");
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    throw error;
  }
};