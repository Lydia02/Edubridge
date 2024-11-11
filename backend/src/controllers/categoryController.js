// categoryController.js
import { prisma } from '../../fastify.js';

// Fetch all categories
export const getCategories = async (req, reply) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true
      }
    });
    reply.send(categories);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch categories' });
  }
};
