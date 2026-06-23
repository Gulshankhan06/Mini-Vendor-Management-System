import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    console.log("🔥 EMAIL FUNCTION CALLED");
    // 🔥 create transporter INSIDE function
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("EMAIL:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Email Verification</h2>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes</p>
        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESS");
  } catch (error: any) {
    console.error("❌ EMAIL ERROR:", error.message);
  }
};