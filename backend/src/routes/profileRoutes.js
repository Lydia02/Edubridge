import { getUserProfile, updateUserProfile, changePassword,uploadProfilePicture } from '../controllers/profileController.js';

async function profileRoutes(fastify, options) {
    fastify.get('/profile', { preValidation: [fastify.authenticate] }, getUserProfile);
    fastify.put('/profile', { preValidation: [fastify.authenticate] }, updateUserProfile);
    fastify.put('/api/profile', {
        preValidation: [fastify.authenticate]
    }, updateUserProfile);
    fastify.post('/api/profile/picture', { 
        preValidation: [fastify.authenticate] 
    }, uploadProfilePicture);
}

export default profileRoutes;
