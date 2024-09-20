import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    //Your seeding logic
  } catch (error) {
    console.log("Error while seeding", error);
  }
}

async function main() {
  try {
    await seed();
  } catch (Error) {
    console.log("Error while seeding", Error);
    throw Error;
  }
}

main()
  .catch((error) => {
    console.error("An unexpected error occurred during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
