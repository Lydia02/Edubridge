// src/controllers/enrollmentController.js
import { enrollInCourse, getUserEnrollments, unenrollInCourse } from '../services/enrollmentService.js';
import {transporter} from '../config/email.js';

export const sendEnrollmentConfirmation = async (email, courseTitle) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Enrollment Confirmation for ${courseTitle}`,
      text: `You have successfully enrolled in ${courseTitle}. Happy learning!`,
    };
  
    await transporter.sendMail(mailOptions);
  };


// Enroll user in a course
export async function enrollUser(req, reply) {
    const { courseId } = req.body; // Get courseId from the body
    const userId = req.user.id; // Extract userId from the JWT

    try {
        const enrollment = await enrollInCourse(userId, courseId);
        return reply.status(201).send({ message: 'Enrolled successfully', enrollment });
    } catch (error) {
        return reply.status(500).send({ message: 'Enrollment failed', error: error.message });
    }
}

// Unenroll user from a course
export async function unenrollUser(req, reply) {
    const { courseId } = req.body; // Get courseId from the body
    const userId = req.user.id; // Extract userId from the JWT

    try {
        const unenrollment = await unenrollInCourse(userId, courseId);
        return reply.status(200).send({ message: 'Unenrolled successfully', unenrollment });
    } catch (error) {
        conslole.log(error)
        return reply.status(500).send({ message: 'Unenrollment failed', error: error.message });
    }
}

// Get all enrollments for a user
export async function getEnrollments(req, reply) {
    const userId = req.user.id;

    try {
        const enrollments = await getUserEnrollments(userId);
        reply.status(200).send({ enrollments });
    } catch (error) {
        confirm.log(error)
        reply.status(500).send({ message: "Failed to fetch enrollments", error: error.message });
    }
}


export const updateProgress = async (request, reply) => {
    const { courseId, progress } = request.body;
    const userId = request.user.id;

    try {
        const updatedProgress = await prisma.progress.upsert({
            where: { userId_courseId: { userId, courseId } },
            update: { progress },
            create: { userId, courseId, progress },
        });

        reply.send(updatedProgress);
    } catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: "Failed to update progress" });
    }
};

