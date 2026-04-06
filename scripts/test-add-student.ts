import { PrismaClient } from '@prisma/client';

async function testAddStudent() {
  const prisma = new PrismaClient();
  try {
    // Get first class
    const firstClass = await prisma.class.findFirst();
    if (!firstClass) {
        console.error("No class found in database. Create a class first.");
        return;
    }

    console.log(`Using class: ${firstClass.name} (ID: ${firstClass.id})`);

    // Attempt to create student
    const student = await prisma.student.create({
      data: {
        name: "Test Student " + Date.now(),
        classId: firstClass.id
      }
    });

    console.log("Student created successfully:", student);

    // Clean up
    await prisma.student.delete({ where: { id: student.id } });
    console.log("Cleanup: Student deleted.");
  } catch (error) {
    console.error("Failed to add student:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testAddStudent();
