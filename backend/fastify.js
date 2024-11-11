import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fs from 'fs';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the `uploads/profile-pictures` directory exists
const uploadDir = path.join(__dirname, 'uploads/profile-pictures');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Register multipart and static file handling
fastify.register(fastifyMultipart);
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/', // Files will be accessible at /uploads/...
});

// Error handling middleware
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  const statusCode = error.statusCode || 500;
  reply.status(statusCode).send({
    error: {
      message: error.message || "Internal Server Error",
      statusCode,
    },
  });
});

// Disconnect Prisma on server close
fastify.addHook("onClose", async (instance, done) => {
  await prisma.$disconnect();
  done();
});

// Start server function
export const startServer = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    fastify.log.info(
      `Server running at http://localhost:${process.env.PORT || 3000}/`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);

  }
  
};

startServer();

export { fastify, prisma };
