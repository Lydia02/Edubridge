import { prisma } from '../../fastify.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fetch user profile
export const getUserProfile = async (request, reply) => {
    try {
        const userId = request.user.id; // Assuming user data from JWT
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                profilePicture: true,
            },
        });
        if (!user) {
            return reply.status(404).send({ error: 'User not found' });
        }
        reply.send(user);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch profile data' });
    }
};

// Update user profile
export const updateUserProfile = async (request, reply) => {
    try {
        const userId = request.user.id;
        const { firstName, lastName } = request.body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { firstName, lastName },
        });

        reply.send(updatedUser);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to update profile data' });
    }
};

// Upload profile picture

export const uploadProfilePicture = async (request, reply) => {
    try {
        const userId = request.user.id;
        const data = await request.file();

        // Ensure the upload directory exists
        const uploadDir = path.join(__dirname, '../uploads/profile-pictures');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Define a unique file path
        const fileName = `user-${userId}-${Date.now()}-${data.filename}`;
        const filePath = path.join(uploadDir, fileName);

        // Write the uploaded file to the server
        await fs.promises.writeFile(filePath, await data.toBuffer());

        // Save the relative file path in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profilePicture: `/uploads/profile-pictures/${fileName}` },
        });

        reply.send({
            message: 'Profile picture uploaded successfully',
            profilePicture: updatedUser.profilePicture,
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        reply.status(500).send({ error: 'Failed to upload profile picture' });
    }
};
