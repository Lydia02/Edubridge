// routes/certificateRoutes.js
import { generateCertificate } from '../controllers/certificateController.js';

async function certificateRoutes(fastify, options) {
    fastify.get('/api/certificate/:courseId', { preHandler: [fastify.authenticate] }, generateCertificate);
}

export default certificateRoutes;
