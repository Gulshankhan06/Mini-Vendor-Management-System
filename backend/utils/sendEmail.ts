import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    console.log("🔥 EMAIL FUNCTION CALLED");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_PASS ? "PASS FOUND" : "PASS MISSING");

    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
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

    console.log("✅ EMAIL SENT SUCCESS");
    console.log("📧 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    throw error;
  }
};