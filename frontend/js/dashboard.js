document.addEventListener('DOMContentLoaded', loadUserData);

async function loadUserData() {
    const usernameElement = document.getElementById('username');
    const coursesContainer = document.getElementById('courses');

    // Ensure required elements exist
    if (!usernameElement || !coursesContainer) {
        console.error("Error: Required DOM elements not found.");
        return;
    }

    // Load user profile for personalized welcome message
    try {
        const profileResponse = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!profileResponse.ok) {
            throw new Error(`Error ${profileResponse.status}: ${profileResponse.statusText}`);
        }

        const profileData = await profileResponse.json();

        // Update the username display only once with the user's first name
        usernameElement.textContent = profileData.firstName ? ` ${profileData.firstName}!` : "Welcome, User";
    } catch (error) {
        console.error("Error loading user profile:", error);
        usernameElement.textContent = "Welcome, User"; // Fallback in case of an error
    }

    // Load enrollments data for display in the dashboard
    try {
        const enrollmentsResponse = await fetch('http://localhost:3000/api/enrollments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!enrollmentsResponse.ok) {
            throw new Error(`Error ${enrollmentsResponse.status}: ${enrollmentsResponse.statusText}`);
        }

        const enrollmentsData = await enrollmentsResponse.json();

        // Clear the container to prevent duplicates
        coursesContainer.innerHTML = '';

        // Check if the user has enrollments
        if (!enrollmentsData.enrollments || enrollmentsData.enrollments.length === 0) {
            coursesContainer.innerHTML = `
                <p>You are not enrolled in any courses yet.</p>
                <p><a href="dashboardcourses.html" class="btn btn-primary mt-3">Click here to see available courses</a></p>
            `;
        } else {
            // Populate enrollments
            enrollmentsData.enrollments.forEach(enrollment => {
                coursesContainer.innerHTML += `
                    <div class="col-lg-4 col-md-6">
                        <div class="course-item shadow">
                            <img class="img-fluid" src="${enrollment.course.imageUrl}" alt="Course Image">
                            <h5>${enrollment.course.title}</h5>
                            <p>${enrollment.course.description}</p>
                            <button onclick="startCourse('${enrollment.course.youtubeLink}')" class="btn btn-primary">Start Course</button>
                            <button onclick="unenroll(${enrollment.courseId})" class="btn btn-danger">Unenroll</button>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error loading enrollments:", error);
        coursesContainer.innerHTML = `<p>Error loading enrollments: ${error.message}</p>`;
    }
}

// Notification functions
function showNotification(message) {
    const notificationCard = document.getElementById('notification-card');
    const notificationMessage = document.getElementById('notification-message');

    if (notificationCard && notificationMessage) {
        notificationMessage.textContent = message;
        notificationCard.style.display = 'flex';
    }
}

function dismissNotification() {
    const notificationCard = document.getElementById('notification-card');
    if (notificationCard) {
        notificationCard.style.display = 'none';
    }
}

// Start course function
function startCourse(courseId) {
     window.location.href = `enrollments.html?courseId=${courseId}`;
}

// Unenroll function
async function unenroll(courseId) {
    try {
        const response = await fetch('http://localhost:3000/api/unenroll', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        });

        const data = await response.json();
        if (data.message === 'Unenrolled successfully') {
            showNotification('Successfully unenrolled');
            setTimeout(() => window.location.reload(), 2000);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        showNotification('Failed to unenroll: ' + error.message);
    }
}
