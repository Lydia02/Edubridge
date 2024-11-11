// routes/reviewRoutes.js
import { createReview, getCourseReviews } from '../controllers/reviewController.js';

function reviewRoutes(fastify, options, done) {
    fastify.post('/api/courses/:courseId/reviews', { preHandler: [fastify.authenticate] }, createReview);
    fastify.get('/api/courses/:courseId/reviews', getCourseReviews);
    done();
}

export default reviewRoutes;
