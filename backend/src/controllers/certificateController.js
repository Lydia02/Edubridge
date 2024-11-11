// controllers/certificateController.js
import { prisma } from '../../fastify.js';
import PDFDocument from 'pdfkit';

export async function generateCertificate(request, reply) {
    const { courseId } = request.params;
    const userId = request.user.id;

    // Validate course completion
    const enrollment = await prisma.enrollment.findFirst({
        where: { courseId: parseInt(courseId), userId }
    });

    if (!enrollment || enrollment.progress < 100) {
        return reply.status(400).send({ error: "Course not completed" });
    }

    reply.header('Content-Type', 'application/pdf');
    reply.header('Content-Disposition', `attachment; filename=Certificate_Course_${courseId}.pdf`);

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(reply.raw);

    // Set custom fonts and add content
    doc.font('Helvetica-Bold').fontSize(26).fillColor('#4CAF50').text('Certificate of Completion', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Times-Roman').fontSize(20).fillColor('#000000')
        .text(`This certifies that`, { align: 'center' });

    doc.moveDown();
    doc.font('Times-BoldItalic').fontSize(24).fillColor('#333333')
        .text(`${request.user.firstName} ${request.user.lastName}`, { align: 'center' });

    doc.moveDown();
    doc.font('Times-Roman').fontSize(18)
        .text(`has successfully completed the course`, { align: 'center' });
    
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#007ACC')
        .text(enrollment.courseTitle || "Unknown Course", { align: 'center', underline: true });

    doc.moveDown(1.5);
    doc.font('Times-Italic').fontSize(16).fillColor('#000000')
        .text(`Date of Completion: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();
}
