import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const prisma = new PrismaClient();

async function prompt(question: string, hidden: boolean = false): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  let email = process.argv[2];
  let password = process.argv[3];
  let name = process.argv[4];

  // If arguments not provided via CLI, interactively prompt to prevent shell variable expansion (like $0)
  if (!email || !password) {
    console.log("\n=== KD Green Admin Credential Setup ===");
    email = await prompt("Enter admin email: ");
    password = await prompt("Enter new password: ");
    name = (await prompt("Enter name (optional, press Enter for Ken): ")) || "Ken";
  }

  if (!email || !password) {
    console.error("Error: Email and password are required.");
    process.exit(1);
  }

  // Normalize email to lowercase
  email = email.toLowerCase().trim();

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingAdmin = await prisma.admin.findFirst();

  let admin;
  if (existingAdmin) {
    admin = await prisma.admin.update({
      where: { id: existingAdmin.id },
      data: {
        email,
        password: hashedPassword,
        name: name || existingAdmin.name,
      },
    });
  } else {
    admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "Ken",
      },
    });
  }

  // Verify the hash right now
  const verified = await bcrypt.compare(password, admin.password);

  console.log("\n Credentials successfully updated!");
  console.log(`Email:            ${admin.email}`);
  console.log(`Name:             ${admin.name}`);
  console.log(`Verification:     ${verified ? "Verified and ready to login" : "Failed"}\n`);
}

main()
  .catch((e) => {
    console.error("Error updating credentials:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
