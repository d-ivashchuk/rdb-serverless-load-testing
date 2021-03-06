import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Dimitri",
    email: "dimitri@stackonfire.dev",
    messages: {
      create: [
        {
          content: "Hey",
        },
        {
          content:
            "My name is Dimitri! And we are benchmarking some serverless functions today",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: u.email,
      },
    });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    } else {
      console.log(`User with email ${existingUser.email} already exists`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
