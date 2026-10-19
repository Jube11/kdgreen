import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 12);
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@kdgreen.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@kdgreen.com",
      password,
      name: "Admin",
    },
  });

  // Seed stock items
  const stockItems = [
    { name: "295/75R22.5 Steer Tire", sku: "TIRE-295-75R225", category: "Tires", quantity: 12, minQuantity: 4, unitCost: 385.00, location: "Truck A", supplier: "Michelin" },
    { name: "11R22.5 Drive Tire", sku: "TIRE-11R225", category: "Tires", quantity: 8, minQuantity: 4, unitCost: 320.00, location: "Truck A", supplier: "Bridgestone" },
    { name: "Group 31 Battery", sku: "BAT-G31", category: "Batteries", quantity: 6, minQuantity: 2, unitCost: 245.00, location: "Truck B", supplier: "Interstate" },
    { name: "Type 30/30 Brake Chamber", sku: "BRK-3030", category: "Brakes", quantity: 4, minQuantity: 2, unitCost: 89.00, location: "Truck A", supplier: "Haldex" },
    { name: "Alternator 160A", sku: "ALT-160A", category: "Electrical", quantity: 2, minQuantity: 1, unitCost: 425.00, location: "Warehouse", supplier: "Delco" },
    { name: "Starter Motor", sku: "STR-001", category: "Electrical", quantity: 3, minQuantity: 1, unitCost: 380.00, location: "Warehouse", supplier: "Delco" },
    { name: "Serpentine Belt", sku: "BLT-SRP", category: "Engine", quantity: 10, minQuantity: 3, unitCost: 45.00, location: "Truck A", supplier: "Gates" },
    { name: "Air Filter", sku: "FLT-AIR", category: "Engine", quantity: 15, minQuantity: 5, unitCost: 28.00, location: "Warehouse", supplier: "Donaldson" },
    { name: "Fuel Filter", sku: "FLT-FUEL", category: "Engine", quantity: 12, minQuantity: 4, unitCost: 35.00, location: "Warehouse", supplier: "Racor" },
    { name: "Hydraulic Jack 20T", sku: "JACK-20T", category: "Tools", quantity: 2, minQuantity: 1, unitCost: 185.00, location: "Truck A", supplier: "Hein-Warner" },
  ];

  for (const item of stockItems) {
    await prisma.stockItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    });
  }

  // Seed sample expenses
  const expenses = [
    { description: "Diesel fuel — Truck A", amount: 450.00, category: "fuel", date: new Date("2026-10-01") },
    { description: "Tire replacement — 2x steer", amount: 770.00, category: "parts", date: new Date("2026-10-02") },
    { description: "Insurance premium — October", amount: 1200.00, category: "insurance", date: new Date("2026-10-03") },
    { description: "Payroll — Tech Martinez", amount: 2800.00, category: "payroll", date: new Date("2026-10-04") },
    { description: "Hydraulic hose repair", amount: 180.00, category: "maintenance", date: new Date("2026-10-05") },
  ];

  for (const exp of expenses) {
    await prisma.expense.create({ data: exp });
  }

  // Seed sample operations
  const operations = [
    { title: "I-75 Northbound — Tire Blowout", type: "dispatch", status: "completed", location: "I-75 NB MM 256", truckInfo: "2021 Freightliner Cascadia", assignedTo: "Martinez", scheduledAt: new Date("2026-10-04T14:00:00Z"), completedAt: new Date("2026-10-04T15:30:00Z"), cost: 450.00 },
    { title: "Yard PM — Fleet Inspection", type: "inspection", status: "in_progress", location: "Tampa Logistics Yard", truckInfo: "Fleet — 5 units", assignedTo: "Johnson", scheduledAt: new Date("2026-10-05T08:00:00Z") },
    { title: "I-4 Eastbound — Jump Start", type: "dispatch", status: "scheduled", location: "I-4 EB MM 42", truckInfo: "2019 Peterbilt 579", assignedTo: "Martinez", scheduledAt: new Date("2026-10-06T06:00:00Z") },
  ];

  for (const op of operations) {
    await prisma.operation.create({ data: op });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
