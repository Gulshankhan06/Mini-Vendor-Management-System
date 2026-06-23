import twilio from "twilio";

console.log("TWILIO_SID:", process.env.TWILIO_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);


const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendOtp = async (phone: string, otp: string) => {
  try {
    const res = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: `+91${phone}`, // IMPORTANT FIX
    });

    console.log("SMS SENT SUCCESS:", res.sid);
  } catch (error) {
    console.error("SMS FAILED:", error);
  }
};