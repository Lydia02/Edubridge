// Hardcoded course data
const courses = [
    {
        id: 1,
        title: "HTML Course for Beginners",
        description: "Start at the beginning by learning HTML basics — an important foundation for building and editing web pages.",
        imageUrl: "img/course-1.jpg",
        price: 0,
        instructor: "Zoe Bachman",
        instructorImage: "img/testimonial-2.jpg",
        duration: 2,
        level: "Beginner",
        lectures: 4,
        enrolledStudents: "5.8L+",
    },
    {
        id: 2,
        title: "Front End Development - CSS",
        description: "Master CSS and become proficient in styling web pages.",
        imageUrl: "img/course-2.jpg",
        price: 199,
        instructor: "John Doe",
        instructorImage: "img/instructor-1.jpg",
        duration: 4,
        level: "Intermediate",
        lectures: 10,
        enrolledStudents: "3.5L+",
    },
    {
        id: 3,
        title: "Introduction to JavaScript",
        description: "Learn JavaScript fundamentals to make your web pages interactive.",
        imageUrl: "img/course-3.jpg",
        price: 0,
        instructor: "Jane Smith",
        instructorImage: "img/instructor-2.jpg",
        duration: 2.5,
        level: "Beginner",
        lectures: 5,
        enrolledStudents: "76L+",
    },
    {
        id: 4,
        title: "Python Programming",
        description: "A comprehensive guide to learning Python, one of the most popular programming languages.",
        imageUrl: "img/course-4.jpg",
        price: 299,
        instructor: "Michael Johnson",
        instructorImage: "img/instructor-3.jpg",
        duration: 3,
        level: "Beginner",
        lectures: 8,
        enrolledStudents: "3.3L+",
    },
    {
        id: 5,
        title: "SQL for Data Science",
        description: "Learn SQL, the language for managing and querying data in databases.",
        imageUrl: "img/course-5.jpg",
        price: 0,
        instructor: "Samantha Lee",
        instructorImage: "img/instructor-4.jpg",
        duration: 5,
        level: "Intermediate",
        lectures: 12,
        enrolledStudents: "1.3L+",
    },
    {
        id: 6,
        title: "ChatGPT for Beginners",
        description: "Learn how to leverage the power of AI with ChatGPT to create interactive chatbots.",
        imageUrl: "img/course-6.jpg",
        price: 0,
        instructor: "David Brown",
        instructorImage: "img/instructor-5.jpg",
        duration: 4.5,
        level: "Beginner",
        lectures: 7,
        enrolledStudents: "3.5L+",
    },
    {
        id: 7,
        title: "AWS for Beginners",
        description: "Get started with cloud computing using Amazon Web Services (AWS).",
        imageUrl: "img/course-7.jpg",
        price: 0,
        instructor: "Emily Wilson",
        instructorImage: "img/instructor-6.jpg",
        duration: 3,
        level: "Beginner",
        lectures: 6,
        enrolledStudents: "1L+",
    },
    {
        id: 8,
        title: "Microsoft Azure Essentials",
        description: "Learn the core concepts of Microsoft Azure and cloud computing.",
        imageUrl: "img/course-8.jpg",
        price: 149,
        instructor: "Chris Evans",
        instructorImage: "img/instructor-7.jpg",
        duration: 3.5,
        level: "Intermediate",
        lectures: 8,
        enrolledStudents: "4.4L+",
    },
    {
        id: 9,
        title: "Statistics for Data Science",
        description: "Gain a solid understanding of statistics and its applications in data science.",
        imageUrl: "img/course-9.jpg",
        price: 299,
        instructor: "Laura Martinez",
        instructorImage: "img/instructor-8.jpg",
        duration: 2.5,
        level: "Intermediate",
        lectures: 10,
        enrolledStudents: "5.3L+",
    },
    {
        id: 10,
        title: "Java Programming",
        description: "Learn the basics of Java programming and build real-world applications.",
        imageUrl: "img/course-10.jpg",
        price: 0,
        instructor: "Daniel Garcia",
        instructorImage: "img/instructor-9.jpg",
        duration: 2,
        level: "Beginner",
        lectures: 5,
        enrolledStudents: "5L+",
    }
];



// Load and display all courses
function loadCourses() {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ""; // Clear container

    courses.forEach(course => {
        const courseElement = `
            <div class="col-lg-3 col-md-6">
                <div class="course-item shadow">
                    <div class="position-relative overflow-hidden text-light image">
                        <img class="img-fluid" src="${course.imageUrl}" alt="${course.title}">
                        <div style="position:absolute; top:15px; left:16px; background-color:${course.price === 0 ? '#fb873f' : '#0ed44c'};" class="px-2 py-1 fw-bold text-uppercase">
                            ${course.price === 0 ? 'FREE' : '₹' + course.price}
                        </div>
                    </div>
                    <div class="p-2 pb-0">
                        <h5 class="mb-1"><a href="single.html?id=${course.id}" class="text-dark">${course.title}</a></h5>
                        <p class="mb-1">${course.description}</p>
                    </div>
                    <a href="single.html?id=${course.id}" class="btn btn-primary">Read More</a>
                </div>
            </div>`;
        coursesContainer.insertAdjacentHTML('beforeend', courseElement);
    });
}

// Load courses on page load
document.addEventListener('DOMContentLoaded', loadCourses);
