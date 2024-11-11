// src/routes/enrollmentRoutes.js
import { updateProgress, enrollUser, getEnrollments, unenrollUser } from '../controllers/enrollmentController.js';

export async function enrollmentRoutes(fastify) {
    // Route to enroll user in a course (POST request)
    fastify.post('/api/enroll', { preHandler: [fastify.authenticate] }, enrollUser);

    // Route to get user's enrollments (GET request)
    fastify.get('/api/enrollments', { preHandler: [fastify.authenticate] }, getEnrollments);

    // Route to unenroll user from a course (POST request)
    fastify.post('/api/unenroll', { preHandler: [fastify.authenticate] }, unenrollUser);

    fastify.post('/api/progress', { preHandler: [fastify.authenticate] }, updateProgress);

}

export default enrollmentRoutes;
