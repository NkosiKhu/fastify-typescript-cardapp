import { execSync } from "child_process";
import dotenv from "dotenv";
import Prisma from "../src/db";

// Load test environment variables
delete process.env.DATABASE_URL;
dotenv.config({ path: ".env.test" });

// Run migrations to set up the test database schema
beforeAll(() => {
  console.log(process.env.DATABASE_URL)
  execSync("npx prisma migrate deploy");
});

// Clear the database after each test
afterEach(async () => {
  const deleteEntries = Prisma.entry.deleteMany();
  await Prisma.$transaction([deleteEntries]);
});

// Disconnect Prisma after all tests
afterAll(async () => {
  await Prisma.$disconnect();
});