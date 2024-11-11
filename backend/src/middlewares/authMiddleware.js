import jwt from 'jsonwebtoken';

export async function authenticate(req, reply) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log("No token provided");
            return reply.status(401).send({ message: 'Authentication failed: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Authenticated user:", decoded);
        req.user = decoded;
    } catch (error) {
        console.error("Authentication failed", error); // Log the error stack
        return reply.status(401).send({ message: 'Authentication failed', error: error.message });
    }
}
