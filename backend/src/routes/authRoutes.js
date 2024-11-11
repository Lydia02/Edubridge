import { register, login, logout, verify } from "../controllers/authController.js";

export async function authRoutes(fastify, options) {
  fastify.post("/signup", {
    schema: {
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: (request, reply) => register(request, reply, "user"), // Pass "user" role
  });

  fastify.post("/admin/register", {
    schema: {
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: (request, reply) => register(request, reply, "admin"),
  });

  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: login,
  });

  fastify.post("/logout", {
    preValidation: [fastify.authenticate],
    handler: logout,
  });

  fastify.post("/verify", {
    schema: {
      body: {
        type: "object",
        required: ["email", "code"],
        properties: {
          email: { type: "string" },
          code: { type: "string" },
        },
      },
    },
    handler: verify,
  });
}

export default authRoutes;
