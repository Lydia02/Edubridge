// Utility Functions
function getToken() {
    return localStorage.getItem('token') || null;
}

function showNotification(message) {
    const notificationCard = document.getElementById('notification-card');
    const notificationMessage = document.getElementById('notification-message');
    if (notificationCard && notificationMessage) {
        notificationMessage.textContent = message;
        notificationCard.style.display = 'block';
    }
}

function dismissNotification() {
    const notificationCard = document.getElementById('notification-card');
    if (notificationCard) {
        notificationCard.style.display = 'none';
    }
}

https://youtu.be/fe5dSQbSVV4?si=kz0ue74EVtfseMEB

const courseVideos = {
    1: { url: "https://www.youtube.com/embed/qz0aGYrrlhU", duration: 5400 },
    2: { url: "https://www.youtube.com/embed/1Rs2ND1ryYc", duration: 10800 },
    3: { url: "https://www.youtube.com/embed/hdI2bqOjy3c", duration: 10800 },
    4: { url: "https://www.youtube.com/embed/rfscVS0vtbw", duration: 15600 },
    5: { url: "https://www.youtube.com/embed/7S_tz1z_5bA", duration: 10800 },
    6: { url: "https://www.youtube.com/embed/fe5dSQbSVV4", duration: 3900 },
    7: { url: "https://www.youtube.com/embed/MmsoIcYrXJU", duration: 10800 },
    8: { url: "https://www.youtube.com/embed/Nbnht4fvTDs", duration: 10800 },
    9: { url: "https://www.youtube.com/embed/2ePf9rue1Ao", duration: 4800 },
    10: { url: "https://www.youtube.com/embed/ZSPZob_1TOk", duration: 10800 },
    11: { url: "https://www.youtube.com/embed/evgFDDG2H9Y", duration: 10800 },
    12: { url: "https://www.youtube.com/embed/grEKMHGYyns", duration: 10800 },

};

// Load enrollments and display courses with progress

// Sample syllabus with lessons for each section
const syllabus = {
    Introduction: [
        { title: "Getting Started with Basics", completed: false },
        { title: "Overview of Key Concepts", completed: false }
    ],
    "Advanced Concepts": [
        { title: "In-depth Analysis", completed: false },
        { title: "Case Studies", completed: false }
    ],
    "Final Project": [
        { title: "Project Guidelines", completed: false },
        { title: "Submission & Feedback", completed: false }
    ]
};

// Load Syllabus Progress
function loadSyllabusProgress(courseId) {
    const storedProgress = JSON.parse(localStorage.getItem(`syllabusProgress-${courseId}`));
    if (storedProgress) {
        Object.keys(storedProgress).forEach(section => {
            storedProgress[section].forEach((lesson, index) => {
                syllabus[section][index].completed = lesson.completed;
            });
        });
    }
}

function saveSyllabusProgress(courseId) {
    localStorage.setItem(`syllabusProgress-${courseId}`, JSON.stringify(syllabus));
}

// Enrollment and Progress Functions
async function loadEnrollments() {
    const enrollmentsList = document.getElementById('enrollments-list');
    const token = getToken();

    if (!token) {
        enrollmentsList.innerHTML = "<p>Authentication required. Please log in again.</p>";
        return;
    }

    try {
        const response = await fetch('https://edubridge-n4rs.onrender.com/api/enrollments', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to load enrollments");

        const data = await response.json();
        enrollmentsList.innerHTML = data.enrollments.length ? data.enrollments.map(enrollment => renderEnrollment(enrollment)).join('') : "<p>You are not enrolled in any courses.</p>";
    } catch (error) {
        console.error("Error loading enrollments:", error);
        enrollmentsList.innerHTML = "<p>Failed to load enrollments.</p>";
    }
}

function renderEnrollment(enrollment) {
    const courseId = enrollment.courseId;
    const course = courseVideos[courseId];
    const progress = getStoredProgress(courseId);
    const isCompleted = progress >= course.duration;
    const progressText = isCompleted ? "Completed" : `${Math.round((progress / course.duration) * 100)}% Complete`;
    const buttonText = isCompleted ? "Download Certificate" : (progress > 0 ? "Continue Course" : "Start Course");

    return `
        <div class="col-lg-4 col-md-6">
            <div class="course-item shadow-sm">
                <img src="${enrollment.course.imageUrl}" alt="${enrollment.course.title}" class="img-fluid">
                <div class="p-3">
                    <h4>${enrollment.course.title}</h4>
                    <p>${enrollment.course.description}</p>
                    <div class="progress mt-2 mb-2" style="height: 15px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${isCompleted ? 100 : (progress / course.duration) * 100}%"
                             aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progressText}</div>
                    </div>

                    <div class="syllabus-section mt-3">
                        <h5>Syllabus</h5>
                        <ul>
                            ${Object.keys(syllabus).map(section => `
                                <li class="syllabus-section-title" onclick="toggleSyllabus('${courseId}', '${section}')">${section}</li>
                                <ul id="syllabus-${courseId}-${section}" class="syllabus-lessons" style="display: none;">
                                    ${syllabus[section].map((lesson, index) => `
                                        <li>
                                            <input type="checkbox" onclick="markLessonCompleted('${courseId}', '${section}', ${index})" 
                                                ${lesson.completed ? "checked" : ""}>
                                            ${lesson.title}
                                        </li>
                                    `).join('')}
                                </ul>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="d-flex justify-content-between mt-2">
                        ${isCompleted ? `<button onclick="downloadCertificate(${courseId})" class="btn btn-success">Download Certificate</button>` 
                        : `<button onclick="startCourse(${courseId})" class="btn btn-primary">${buttonText}</button>`}
                        <button onclick="unenroll(${courseId})" class="btn btn-danger">Unenroll</button>
                   </div>
                </div>
            </div>
        </div>
    `;
}

function toggleSyllabus(courseId, section) {
    const syllabusSection = document.getElementById(`syllabus-${courseId}-${section}`);
    syllabusSection.style.display = syllabusSection.style.display === 'none' ? 'block' : 'none';
}

function markLessonCompleted(courseId, section, lessonIndex) {
    syllabus[section][lessonIndex].completed = !syllabus[section][lessonIndex].completed;
    saveSyllabusProgress(courseId);
}

function getStoredProgress(courseId) {
    const progressData = JSON.parse(localStorage.getItem("videoProgress")) || {};
    return progressData[courseId] || 0;
}

function saveProgress(courseId, progress) {
    const progressData = JSON.parse(localStorage.getItem("videoProgress")) || {};
    progressData[courseId] = progress;
    localStorage.setItem("videoProgress", JSON.stringify(progressData));
}

function startCourse(courseId) {
    const videoPlayerSection = document.getElementById("video-player-section");
    if (!videoPlayerSection) {
        console.error("video-player-section element not found");
        showNotification("Video player section is missing. Please refresh the page or contact support.");
       
        return;
    }

    const course = courseVideos[courseId];
    if (!course) {
        showNotification("Video not available for this course.");
        return;
    }

    videoPlayerSection.style.display = "block";
    const videoPlayer = document.getElementById("course-video");
    videoPlayer.src = `${course.url}?enablejsapi=1`;

    const duration = course.duration;
    let progress = getStoredProgress(courseId);
    const progressBar = document.getElementById("video-progress");

    const interval = setInterval(() => {
        if (progress >= duration) {
            clearInterval(interval);
            progressBar.style.width = "100%";
            progressBar.innerHTML = "100% Complete";
            showNotification("Congratulations! You've completed the course.");
            downloadCertificate(courseId);
            return;
        }
        progress += 1;
        saveProgress(courseId, progress);
        const percentage = (progress / duration) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.innerHTML = `${Math.round(percentage)}%`;
    }, 1000);

    videoPlayer.addEventListener('pause', () => clearInterval(interval));
}

function closeVideo() {
    document.getElementById("video-player-section").style.display = "none";
    document.getElementById("course-video").src = "";
}

// Certificate and Unenroll Functions
async function unenroll(courseId) {
    const token = getToken();
    if (!token) {
        showNotification("Please log in again.");
        return;
    }

    try {
        const response = await fetch('https://edubridge-n4rs.onrender.com/api/unenroll', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        });

        const data = await response.json();
        if (response.ok && data.message === 'Unenrolled successfully') {
            localStorage.removeItem(`videoProgress`);
            localStorage.removeItem(`syllabusProgress-${courseId}`);
            showNotification('Successfully unenrolled');
            loadEnrollments();
        } else {
            throw new Error(data.message || "Failed to unenroll");
        }
    } catch (error) {
        console.error("Error during unenrollment:", error);
        showNotification('Failed to unenroll: ' + error.message);
    }
}

async function downloadCertificate(courseId) {
    const token = getToken();
    if (!token) {
        showNotification("Please log in again.");
        return;
    }

    try {
        const response = await fetch(`https://edubridge-n4rs.onrender.com/api/certificate/${courseId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Certificate_Course_${courseId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            throw new Error('Failed to generate certificate');
        }
    } catch (error) {
        console.error("Error downloading certificate:", error);
        showNotification("Unable to download certificate.");
    }
}

// Course Reviews
async function loadCourseReviews(courseId) {
    try {
        const response = await fetch(`https://edubridge-n4rs.onrender.com/api/courses/${courseId}/reviews`);
        const { reviews, avgRating } = await response.json();

        document.getElementById('average-rating').textContent = `Average Rating: ${avgRating}`;
        document.getElementById('reviews-list').innerHTML = reviews.map(review => `
            <div class="review">
                <p><strong>${review.user.firstName} ${review.user.lastName}</strong></p>
                <p>Rating: ${review.rating}/5</p>
                <p>${review.comment}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

async function submitReview(courseId) {
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value;
    const token = getToken();

    try {
        const response = await fetch(`https://edubridge-n4rs.onrender.com/api/courses/${courseId}/reviews`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ rating: parseInt(rating), comment })
        });

        if (response.ok) {
            showNotification("Review submitted!");
            loadCourseReviews(courseId);
        } else {
            showNotification("Failed to submit review.");
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadEnrollments);
document.querySelectorAll('.rating-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        document.querySelectorAll('.rating-icon').forEach(i => {
            i.classList.toggle('selected', i.getAttribute('data-rating') <= rating);
        });
    });
});