import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) return done(new Error("No email"), undefined);

        let user = await User.findOne({ email });

        if (!user) {
        
let username = email.split("@")[0].toLowerCase();

const existingUsername = await User.findOne({ username });

if (existingUsername) {
  username = `${username}${Date.now()}`;
}

user = await User.create({
  username,
  name: profile.displayName,
  email,
  isEmailVerified: true,
  provider: "google",
  role: "vendor",
});
        }

        return done(null, user);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

export default passport;