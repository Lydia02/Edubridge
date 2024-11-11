import { getCourses, getCourseById, enrollCourse } from '../controllers/courseController.js';

async function courseRoutes(fastify, options) {
  fastify.get('/api/courses', getCourses); // Fetch all courses
  fastify.get('/api/courses/:id', getCourseById); // Fetch a specific course
  fastify.post('/api/courses/enroll', { preValidation: [fastify.authenticate] }, enrollCourse); // Enroll in a course
}

export default courseRoutes;
