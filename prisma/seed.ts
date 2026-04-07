import { PrismaClient, Role, SubscriptionTier } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Order of deletion matters
  await prisma.notification.deleteMany({})
  await prisma.clockIn.deleteMany({})
  await prisma.fee.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.attendance.deleteMany({})
  await prisma.grade.deleteMany({})
  await prisma.lessonLog.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.class.deleteMany({})
  await prisma.subscription.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.school.deleteMany({})

  console.log('Seeding SaaS platform data...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  // 1. Create Super Admin
  await prisma.user.create({
    data: {
      email: 'superadmin@saas.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: Role.SUPER_ADMIN,
    },
  })

  // 2. Create a School
  const school = await prisma.school.create({
    data: {
      name: 'Lycée Excellence Casablanca',
      domain: 'excellence.edu.ma',
      plan: SubscriptionTier.PREMIUM,
    },
  })

  // 3. Create School Admin
  const schoolAdmin = await prisma.user.create({
    data: {
      email: 'admin@excellence.edu.ma',
      password: hashedPassword,
      name: 'Directeur Excellence',
      role: Role.SCHOOL_ADMIN,
      schoolId: school.id,
    },
  })

  // 4. Create Teachers
  const teacher1 = await prisma.user.create({
    data: {
      email: 'salma@excellence.edu.ma',
      password: hashedPassword,
      name: 'Salma Bennani',
      role: Role.TEACHER,
      schoolId: school.id,
    },
  })

  const teacher2 = await prisma.user.create({
    data: {
      email: 'ahmed@excellence.edu.ma',
      password: hashedPassword,
      name: 'Ahmed Alaoui',
      role: Role.TEACHER,
      schoolId: school.id,
    },
  })

  // 5. Create Classes
  const classA = await prisma.class.create({
    data: {
      name: 'Tronc Commun Sc. A',
      level: 'Lycée',
      room: 'Salle 201',
      teacherId: teacher1.id,
      schoolId: school.id,
    },
  })

  // 6. Create Parents & Students
  const parent = await prisma.user.create({
    data: {
      email: 'parent@email.com',
      password: hashedPassword,
      name: 'Karim Mansouri',
      role: Role.PARENT,
      schoolId: school.id,
    },
  })

  await prisma.student.create({
    data: {
      name: 'Youssef Mansouri',
      classId: classA.id,
      parentId: parent.id,
      schoolId: school.id,
    },
  })

  // 7. Create Staff
  await prisma.user.create({
    data: {
      email: 'compta@excellence.edu.ma',
      password: hashedPassword,
      name: 'Meryem Compta',
      role: Role.ACCOUNTANT,
      schoolId: school.id,
    },
  })

  console.log('SaaS Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
