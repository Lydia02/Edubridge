// src/services/enrollmentService.js
import { prisma } from '../../fastify.js';

// Enroll a user in a course
export async function enrollInCourse(userId, courseId) {
    try {
        // Check if the course exists
        const courseExists = await prisma.course.findUnique({ where: { id: courseId } });
        if (!courseExists) throw new Error(`Course with ID ${courseId} does not exist.`);

        // Check if the user is already enrolled
        const alreadyEnrolled = await prisma.enrollment.findFirst({ where: { userId, courseId } });
        if (alreadyEnrolled) throw new Error("Already enrolled in this course.");

        // Create a new enrollment
        return await prisma.enrollment.create({ data: { userId, courseId } });
    } catch (error) {
        console.error("Enrollment error:", error.message || error);
        throw new Error(error.message || "Enrollment process failed.");
    }
}

// Retrieve all enrollments for a user
export async function getUserEnrollments(userId) {
    try {
        return await prisma.enrollment.findMany({
            where: { userId },
            include: { course: true, progress: true } // Include course and progress information
        });
    } catch (error) {
        console.error("Error fetching enrollments:", error.message);
        throw new Error("Could not retrieve enrollments");
    }
}

// Unenroll a user from a course
export async function unenrollInCourse(userId, courseId) {
    try {
        return await prisma.enrollment.deleteMany({
            where: { userId, courseId }
        });
    } catch (error) {
        console.error("Unenrollment error:", error.message);
        throw new Error("Unenrollment process failed.");
    }
}
