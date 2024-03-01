import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: 'Matthieu',
    lastName: 'Bleichner',
    email: 'matthieu258@hotmail.com',
  },
]


const taskData: Prisma.TaskCreateInput[] = [
  {
    title: 'My first Prisma task',
    description: 'Description of my first prisma task',
    state: 'ToDo',
    ownerId: null,
  },
]



async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const v of taskData) {
    const task = await prisma.task.create({
      data: v,
    })
    console.log(`Created task with id: ${task.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })