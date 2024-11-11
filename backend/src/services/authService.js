import bcrypt from "bcrypt";
import { prisma } from "../../fastify.js";
import crypto from "crypto";
import { transporter } from "../config/email.js";
import { BadRequestError } from "../utils/errors.js";

export async function registerUser(firstName, lastName, email, password, role) {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new BadRequestError("User already exists");

  const verificationCode = crypto.randomBytes(3).toString('hex');
  const passwordHash = await bcrypt.hash(password, 10);
  const userRole = role === "admin" ? "admin" : "user";

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: passwordHash, role: userRole, verificationCode },
  });

  // Send verification email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "EduBridge Email Verification",
      text: `Hello ${firstName}, use code ${verificationCode} to verify your email.`
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new BadRequestError("Failed to send verification email");
  }
  return user;
}

export async function loginUser(email, password) {
  console.log("Login attempt for:", email); // Debugging log
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found for email:", email); // Debugging log
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Invalid password for user:", email); // Debugging log
    throw new Error("Incorrect password");
  }

  return user;
}

const blacklist = new Set();

export function blacklistToken(token) {
  blacklist.add(token);
}

export function isTokenBlacklisted(token) {
  return blacklist.has(token);
}
