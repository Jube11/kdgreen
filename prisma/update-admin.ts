import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const newEmail = process.argv[2];
  const newPassword = process.argv[3];
  const newName = process.argv[4] || "Admin";

  if (!newEmail || !newPassword) {
    console.error("Usage: npx tsx prisma/update-admin.ts <newEmail> <newPassword> [newName]");
    console.error("Example: npx tsx prisma/update-admin.ts boss@kdgreen.com StrongP@ssw0rd! 'KD Boss'");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Check if any admin exists
  const existingAdmin = await prisma.admin.findFirst();

  let admin;
  if (existingAdmin) {
    admin = await prisma.admin.update({
      where: { id: existingAdmin.id },
      data: {
        email: newEmail,
        password: hashedPassword,
        name: newName,
      },
    });
    console.log(` Admin updated successfully!`);
  } else {
    admin = await prisma.admin.create({
      data: {
        email: newEmail,
        password: hashedPassword,
        name: newName,
      },
    });
    console.log(` Admin created successfully!`);
  }

  console.log(`Email:    ${admin.email}`);
  console.log(`Name:     ${admin.name}`);
  console.log(`Password: (updated to your new password)`);
}

main()
  .catch((e) => {
    console.error("Failed to update admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
