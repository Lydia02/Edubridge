import { prisma } from '../../fastify.js';

// Fetch all courses
export const getCourses = async (req, reply) => {
  try {
    const courses = await prisma.course.findMany({ include: { category: true } });
    reply.send(courses);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch courses" });
  }
};

// Fetch course details by ID
export const getCourseById = async (req, reply) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { category: true }
    });
    if (!course) {
      return reply.status(404).send({ error: "Course not found" });
    }
    reply.send(course);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch course details" });
  }
};

// Enroll in a course
export const enrollCourse = async (req, reply) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return reply.status(404).send({ error: "Course not found" });
    }

    const existingEnrollment = await prisma.enrollment.findFirst({ where: { userId, courseId } });
    if (existingEnrollment) {
      return reply.status(400).send({ message: "Already enrolled in this course" });
    }

    const enrollment = await prisma.enrollment.create({ data: { userId, courseId } });
    reply.send({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    reply.status(500).send({ error: "Failed to enroll" });
  }
};




export async function enrollUser(req, reply) {
    const { userId, courseId } = req.body;

    try {
        // Check if the user is already enrolled in the course
        const existingEnrollment = await prisma.enrollment.findFirst({
            where: { userId, courseId }
        });

        if (existingEnrollment) {
            reply.status(400).send({ message: "You are already enrolled in this course." });
            return;
        }

        // Enroll the user in the course
        const enrollment = await prisma.enrollment.create({
            data: { userId, courseId }
        });

        reply.send({ message: "Enrollment successful", enrollment });
    } catch (error) {
        console.error("Enrollment error:", error);
        reply.status(500).send({ message: "Enrollment failed", error: error.message });
    }
}
