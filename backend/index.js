import "dotenv/config";
import { fastify, startServer, prisma } from "./fastify.js";
import jwtPlugin from "./src/config/jwt.js";
import fastifyCors from '@fastify/cors';
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";
import certificateRoutes from "./src/routes/certificateRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js"

fastify.register(fastifyCors, {
  origin: ["http://localhost:3000", "http://127.0.0.1:5501"], // Allow all origins, or you can specify your frontend URL like 'http://127.0.0.1:5500'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers needed for authentication
  credentials: true // Allow credentials (i.e., cookies, authorization headers)

});

fastify.register(jwtPlugin);


fastify.register(authRoutes);
fastify.register(profileRoutes);
fastify.register(dashboardRoutes);
fastify.register(categoryRoutes);
fastify.register(courseRoutes);
fastify.register(enrollmentRoutes);
fastify.register(certificateRoutes)
fastify.register(reviewRoutes)

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to Edubridge" };
});

startServer();
