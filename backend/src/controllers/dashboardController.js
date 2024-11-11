import { prisma } from '../../fastify.js';

// Fetch data for user dashboard
export const getDashboardData = async (request, reply) => {
    try {
        const userId = request.user.id; // Assuming user data is attached to request via JWT

        // Fetch courses enrolled by the user
        const courses = await prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: true // Assuming enrollment includes course relation
            }
        });

        // Fetch recent announcements (could be global or user-specific)
        const announcements = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });

        // Progress tracking - Sample logic, adjust as per schema
        const completedCourses = await prisma.enrollment.count({
            where: {
                userId,
                status: 'completed' // Assuming enrollment has a 'status' field
            }
        });

        // Build the response data
        const dashboardData = {
            courses: courses.map(course => ({
                id: course.course.id,
                title: course.course.title,
                description: course.course.description,
                progress: course.progress // Assuming enrollment tracks progress
            })),
            announcements,
            completedCourses
        };

        reply.send(dashboardData);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to load dashboard data' });
    }
};
