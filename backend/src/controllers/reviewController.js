// controllers/reviewController.js
import { prisma } from '../../fastify.js';

export async function createReview(request, reply) {
    const { courseId } = request.params;
    const userId = request.user.id;
    const { rating, comment } = request.body;

    const review = await prisma.review.create({
        data: {
            userId,
            courseId: parseInt(courseId),
            rating,
            comment,
        },
    });

    return reply.status(201).send({ message: 'Review added', review });
}

export async function getCourseReviews(request, reply) {
    const { courseId } = request.params;

    const reviews = await prisma.review.findMany({
        where: { courseId: parseInt(courseId) },
        include: { user: true },
    });

    // Calculate average rating
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

    reply.send({ reviews, avgRating: avgRating.toFixed(1) });
}
