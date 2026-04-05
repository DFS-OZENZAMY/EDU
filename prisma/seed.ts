import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.message.deleteMany({})
  await prisma.attendance.deleteMany({})
  await prisma.grade.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.class.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Seeding data...')

  const admin = await prisma.user.create({
    data: {
      email: 'admin@edu.ma',
      password: 'password123',
      name: 'Admin EDU',
      role: 'ADMIN',
    },
  })

  const teacher1 = await prisma.user.create({
    data: {
      email: 'ahmed@edu.ma',
      password: 'password123',
      name: 'Ahmed Alaoui',
      role: 'TEACHER',
    },
  })

  const teacher2 = await prisma.user.create({
    data: {
      email: 'salma@edu.ma',
      password: 'password123',
      name: 'Salma Bennani',
      role: 'TEACHER',
    },
  })

  const classA = await prisma.class.create({
    data: {
      name: 'CP - Section A',
      level: 'Primaire',
      room: 'Salle 102',
      teacherId: teacher1.id,
    },
  })

  const classB = await prisma.class.create({
    data: {
      name: 'CP - Section B',
      level: 'Primaire',
      room: 'Salle 103',
      teacherId: teacher2.id,
    },
  })

  const parent = await prisma.user.create({
    data: {
      email: 'parent@email.com',
      password: 'password123',
      name: 'Mme Salma Bennani',
      role: 'PARENT',
    },
  })

  const student1 = await prisma.student.create({
    data: {
      name: 'Youssef Bennani',
      classId: classB.id,
      parentId: parent.id,
    },
  })

  const student2 = await prisma.student.create({
    data: {
      name: 'Sara Alaoui',
      classId: classA.id,
    },
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
