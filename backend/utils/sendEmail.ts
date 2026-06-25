import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    console.log("🔥 EMAIL FUNCTION CALLED");
    console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_USER exists =", !!process.env.SMTP_USER);
console.log("SMTP_PASS exists =", !!process.env.SMTP_PASS);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
    });

    // SMTP connection test
    // await transporter.verify();
    console.log("✅ SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
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
    console.log("📧 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    throw error;
  }
};