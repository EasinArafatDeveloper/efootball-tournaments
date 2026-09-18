import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed for eFCOB Bangladesh Championship Platform...");

  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Password2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@necob.com";

  console.log(`🔐 Admin seed credentials configured for: ${adminEmail}`);
  console.log("✅ Seed script ready.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
