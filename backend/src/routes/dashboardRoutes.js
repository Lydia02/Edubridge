import { getDashboardData } from '../controllers/dashboardController.js';

async function dashboardRoutes(fastify, options) {
    fastify.get('/dashboard', { preValidation: [fastify.authenticate] }, getDashboardData);
}

export default dashboardRoutes;
