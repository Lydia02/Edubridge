import {transporter } from '../config/email.js';

export const sendCourseReminder = async (users) => {
  try {
    for (const user of users) {
      for (const course of user.courses) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: `Reminder: ${course.title} - ${course.daysRemaining} Days Left`,
          text: `Hello ${user.firstName},\n\nThis is a reminder that you have ${course.daysRemaining} days left to complete ${course.title}. Keep up the good work!\n\nBest, \nEduBridge Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${user.email} for course ${course.title}`);
      }
    }
  } catch (error) {
    console.error("Error sending course reminders:", error);
  }
};
