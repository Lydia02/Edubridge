import { prisma } from '../../fastify.js';
import dayjs from 'dayjs';

export const getEnrolledUsersWithCourses = async () => {
  const users = await prisma.user.findMany({
    where: { enrollments: { some: { progress: { lt: 100 } } } },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  });

  return users.map(user => ({
    email: user.email,
    firstName: user.firstName,
    courses: user.enrollments.map(enrollment => {
      const daysRemaining = dayjs(enrollment.course.endDate).diff(dayjs(), 'day');
      return {
        title: enrollment.course.title,
        daysRemaining,
      };
    }),
  }));
};
