import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.notification.deleteMany({})
  await prisma.clockIn.deleteMany({})
  await prisma.fee.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.attendance.deleteMany({})
  await prisma.grade.deleteMany({})
  await prisma.lessonLog.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.class.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Seeding data...')

  const hashedPassword = await bcrypt.hash('password123', 10)
  const adminPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.create({
    data: {
      email: 'admin@edu.ma',
      password: adminPassword,
      name: 'Admin EDU',
      role: 'ADMIN',
    },
  })

  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher1@edu.ma',
      password: hashedPassword,
      name: 'Ahmed Alaoui',
      role: 'TEACHER',
    },
  })

  const teacher2 = await prisma.user.create({
    data: {
      email: 'teacher2@edu.ma',
      password: hashedPassword,
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
      password: hashedPassword,
      name: 'Mme Salma Bennani',
      role: 'PARENT',
    },
  })

  await prisma.student.create({
    data: {
      name: 'Youssef Bennani',
      classId: classB.id,
      parentId: parent.id,
    },
  })

  await prisma.student.create({
    data: {
      name: 'Sara Alaoui',
      classId: classA.id,
    },
  })

  await prisma.fee.create({
    data: {
        parentId: parent.id,
        month: 'Avril 2026',
        amount: 2500,
        status: 'PAID',
        paidAt: new Date()
    }
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
