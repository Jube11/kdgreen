import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter Admin Email (e.g. admin@kdgreen.com): ", async (emailInput) => {
  rl.question("Enter Admin Password: ", async (passwordInput) => {
    rl.close();

    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email || !password) {
      console.error("\n❌ Email and password cannot be empty.");
      process.exit(1);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const existing = await prisma.admin.findFirst();

      let admin;
      if (existing) {
        admin = await prisma.admin.update({
          where: { id: existing.id },
          data: {
            email,
            password: hashedPassword,
          },
        });
      } else {
        admin = await prisma.admin.create({
          data: {
            email,
            password: hashedPassword,
            name: "Ken",
          },
        });
      }

      const check = await bcrypt.compare(password, admin.password);
      console.log("\n=================================");
      console.log("✅ Credentials updated successfully!");
      console.log(`Email in Database: ${admin.email}`);
      console.log(`Password verification: ${check ? "SUCCESSFUL" : "FAILED"}`);
      console.log("=================================\n");
    } catch (err) {
      console.error("Database error:", err);
    } finally {
      await prisma.$disconnect();
    }
  });
});
