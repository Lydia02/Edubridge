import cron from 'node-cron';
import { getEnrolledUsersWithCourses } from './userService.js';
import { sendCourseReminder } from './controllers/emailController.js';

// Schedule the reminder job to run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  try {
    const users = await getEnrolledUsersWithCourses();
    if (users.length > 0) {
      await sendCourseReminder(users);
      console.log("Course reminders sent to all enrolled users.");
    } else {
      console.log("No enrolled users with pending courses.");
    }
  } catch (error) {
    console.error("Error in scheduled course reminders:", error);
  }
});
