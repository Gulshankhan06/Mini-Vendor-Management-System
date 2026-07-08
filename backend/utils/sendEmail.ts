import nodemailer from "nodemailer";
import net from "net";

export const sendVerificationEmail = async (
  email: string,
  otp: string
) => {
  try {
    console.log("====================================");
    console.log("🔥 EMAIL FUNCTION CALLED");
    console.log("====================================");

    console.log("📧 SMTP_USER:", process.env.SMTP_USER);
    console.log(
      "🔑 SMTP_PASS Length:",
      process.env.SMTP_PASS?.length || 0
    );

    console.log("🌐 SMTP_HOST: smtp.gmail.com");
    console.log("📡 SMTP_PORT: 587");

    // ================= TCP TEST =================
    console.log("\n🧪 Testing TCP Connection...");

    const socket = net.createConnection({
      host: "smtp.gmail.com",
      port: 587,
      family: 4, // Force IPv4
    });

    socket.setTimeout(10000);

    socket.on("connect", () => {
      console.log("✅ TCP Connected Successfully");
      socket.end();
    });

    socket.on("timeout", () => {
      console.log("❌ TCP Timeout");
      socket.destroy();
    });

    socket.on("error", (err) => {
      console.log("❌ TCP Error:", err);
    });

    // Wait for TCP test
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("\n🚀 Creating Transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
  
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      logger: true,
      debug: true,
    });

    console.log("✅ Transporter Created");

    // ================= VERIFY =================
    console.log("\n🧪 Verifying SMTP...");

    await transporter.verify();

    console.log("✅ SMTP VERIFIED SUCCESSFULLY");

    // ================= SEND MAIL =================
    console.log("\n📤 Sending Email...");

    const info = await transporter.sendMail({
      from: `"Mini Vendor Management" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("====================================");
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("📨 Message ID:", info.messageId);
    console.log("📬 Response:", info.response);
    console.log("====================================");

    return info;
  } catch (err: any) {
    console.log("====================================");
    console.log("❌ EMAIL ERROR");
    console.log("====================================");

    console.log("Message:", err.message);
    console.log("Code:", err.code);
    console.log("Command:", err.command);
    console.log("Response:", err.response);
    console.log("Response Code:", err.responseCode);

    console.error(err);

    throw err;
  }
};