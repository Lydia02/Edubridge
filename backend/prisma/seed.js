
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Check if categories already exist
  const existingCategories = await prisma.category.findMany();
  if (existingCategories.length === 0) {
    await prisma.category.createMany({
      data: [
        { name: 'Web Development', imageUrl: 'img/web-dev.jpg' },
        { name: 'Data Science', imageUrl: 'img/data-science.jpg' },
        { name: 'Programming Languages', imageUrl: 'img/programming.jpg' },
        { name: 'Cloud Computing', imageUrl: 'img/cloud-computing.jpg' },
      ],
    });
    console.log('Categories inserted successfully.');
  } else {
    console.log('Categories already exist, skipping insertion.');
  }

  // Check if courses already exist
  const existingCourses = await prisma.course.findMany();
  if (existingCourses.length === 0) {
    await prisma.course.createMany({
      data: [
        {
          title: "HTML Course for Beginners",
          description: "Learn HTML basics, the foundation of building web pages.",
          introduction: "Welcome to the HTML Course! Here, you'll start by learning the basics of HTML, the essential language for creating webpages. We’ll guide you through tags, structure, and creating your first page.",
          imageUrl: "img/course-1.jpg",
          price: 0,
          instructor: "Zoe Bachman",
          instructorImage: "img/testimonial-2.jpg",
          duration: "2 hours",
          level: "Beginner",
          lectures: 4,
          enrolledStudents: "5.8L+",
          categoryId: 1,
          syllabusOutline: {
            "Introduction": ["Course Overview", "HTML Basics", "Web Page Structure"],
            "Mini Projects": ["Build a Simple Web Page", "Create a List of Links"],
            "Final Project": ["Design a Personal Webpage"]
          }
        },
        {
          title: "Front End Development - CSS",
          description: "Master CSS and become proficient in styling web pages.",
          introduction: "This CSS course will take you from the basics to advanced techniques, helping you create visually appealing and responsive web designs.",
          imageUrl: "img/course-2.jpg",
          price: 199,
          instructor: "John Doe",
          instructorImage: "img/instructor-1.jpg",
          duration: "4 hours",
          level: "Intermediate",
          lectures: 10,
          enrolledStudents: "3.5L+",
          categoryId: 1,
          syllabusOutline: {
            "Introduction": ["CSS Basics", "Styling Elements", "Selectors"],
            "Mini Projects": ["Style a Web Page Layout", "Create a Responsive Navigation Bar"],
            "Final Project": ["Design a Personal Portfolio"]
          }
        },
        {
          title: "Introduction to JavaScript",
          description: "Learn JavaScript fundamentals to make your web pages interactive.",
          introduction: "Dive into JavaScript to make dynamic and interactive web pages. This course will introduce key programming concepts using JavaScript.",
          imageUrl: "img/course-3.jpg",
          price: 0,
          instructor: "Jane Smith",
          instructorImage: "img/instructor-2.jpg",
          duration: "2.5 hours",
          level: "Beginner",
          lectures: 5,
          enrolledStudents: "76L+",
          categoryId: 2,
          syllabusOutline: {
            "Introduction": ["JavaScript Basics", "Variables and Functions"],
            "Mini Projects": ["Interactive Quiz", "Simple Calculator"],
            "Final Project": ["Build a To-Do List App"]
          }
        },
        {
          title: "Python Programming",
          description: "A comprehensive guide to learning Python, one of the most popular programming languages.",
          introduction: "Start coding with Python! This course covers Python fundamentals and prepares you for practical applications in data analysis and beyond.",
          imageUrl: "img/course-4.jpg",
          price: 299,
          instructor: "Michael Johnson",
          instructorImage: "img/instructor-3.jpg",
          duration: "3 hours",
          level: "Beginner",
          lectures: 8,
          enrolledStudents: "3.3L+",
          categoryId: 3,
          syllabusOutline: {
            "Introduction": ["Python Basics", "Data Types and Variables"],
            "Mini Projects": ["Simple Calculator", "Data Analysis with Lists"],
            "Final Project": ["Analyze a Data Set"]
          }
        },
        {
          title: "SQL for Data Science",
          description: "Learn SQL, the language for managing and querying data in databases.",
          introduction: "Gain SQL skills essential for data management. This course covers SQL syntax, queries, and techniques used in data analysis.",
          imageUrl: "img/course-5.jpg",
          price: 0,
          instructor: "Samantha Lee",
          instructorImage: "img/instructor-4.jpg",
          duration: "5 hours",
          level: "Intermediate",
          lectures: 12,
          enrolledStudents: "1.3L+",
          categoryId: 2,
          syllabusOutline: {
            "Introduction": ["SQL Basics", "Querying Databases"],
            "Mini Projects": ["Build a Student Database", "Analyze Sales Data"],
            "Final Project": ["Design a Database for a Small Business"]
          }
        },
        {
          title: "ChatGPT for Beginners",
          description: "Learn how to leverage the power of AI with ChatGPT to create interactive chatbots.",
          introduction: "Explore ChatGPT's potential for conversational AI applications. This course will guide you in creating and managing chatbot interactions.",
          imageUrl: "img/course-6.jpg",
          price: 0,
          instructor: "David Brown",
          instructorImage: "img/instructor-5.jpg",
          duration: "4.5 hours",
          level: "Beginner",
          lectures: 7,
          enrolledStudents: "3.5L+",
          categoryId: 3,
          syllabusOutline: {
            "Introduction": ["Getting Started with ChatGPT", "Building Conversations"],
            "Mini Projects": ["Create a Basic FAQ Bot", "Design an Interactive Quiz Bot"],
            "Final Project": ["Build a Customer Support Chatbot"]
          }
        },
        {
          title: "AWS for Beginners",
          description: "Get started with cloud computing using Amazon Web Services (AWS).",
          introduction: "Discover cloud computing with AWS. This course will guide you through the essentials of setting up and managing AWS services.",
          imageUrl: "img/course-7.jpg",
          price: 0,
          instructor: "Emily Wilson",
          instructorImage: "img/instructor-6.jpg",
          duration: "3 hours",
          level: "Beginner",
          lectures: 6,
          enrolledStudents: "1L+",
          categoryId: 4,
          syllabusOutline: {
            "Introduction": ["Cloud Basics", "Introduction to AWS"],
            "Mini Projects": ["Set Up S3 Storage", "Deploy a Website"],
            "Final Project": ["Create a Simple Cloud Infrastructure"]
          }
        },
        {
          title: "Microsoft Azure Essentials",
          description: "Learn the core concepts of Microsoft Azure and cloud computing.",
          introduction: "This course introduces Microsoft Azure's core services and concepts, preparing you for a role in cloud administration.",
          imageUrl: "img/course-8.jpg",
          price: 149,
          instructor: "Chris Evans",
          instructorImage: "img/instructor-7.jpg",
          duration: "3.5 hours",
          level: "Intermediate",
          lectures: 8,
          enrolledStudents: "4.4L+",
          categoryId: 4,
          syllabusOutline: {
            "Introduction": ["Azure Basics", "Managing Cloud Resources"],
            "Mini Projects": ["Create a Virtual Machine", "Deploy a Database"],
            "Final Project": ["Design an Azure-Based Web Application"]
          }
        },
        {
          title: "Statistics for Data Science",
          description: "Gain a solid understanding of statistics and its applications in data science.",
          introduction: "Learn essential statistics to build a foundation for data science. This course focuses on statistical concepts and their practical applications.",
          imageUrl: "img/course-9.jpg",
          price: 299,
          instructor: "Laura Martinez",
          instructorImage: "img/instructor-8.jpg",
          duration: "2.5 hours",
          level: "Intermediate",
          lectures: 10,
          enrolledStudents: "5.3L+",
          categoryId: 2,
          syllabusOutline: {
            "Introduction": ["Statistical Fundamentals", "Data Distributions"],
            "Mini Projects": ["Analyze Survey Data", "Build a Basic Regression Model"],
            "Final Project": ["Predict Outcomes Based on Data Analysis"]
          }
        },
        {
          title: "Java Programming",
          description: "Learn the basics of Java programming and build real-world applications.",
          introduction: "Start your journey in software development with Java. This course introduces you to Java's syntax and object-oriented programming principles.",
          imageUrl: "img/course-10.jpg",
          price: 0,
          instructor: "Daniel Garcia",
          instructorImage: "img/instructor-9.jpg",
          duration: "2 hours",
          level: "Beginner",
          lectures: 5,
          enrolledStudents: "5L+",
          categoryId: 3,
          syllabusOutline: {
            "Introduction": ["Java Basics", "Control Structures"],
            "Mini Projects": ["Build a Simple Calculator", "Create a Text-Based Adventure Game"],
            "Final Project": ["Develop a Simple Inventory System"]
          }
        }
      ],
    });
    console.log('Courses inserted successfully.');
  } else {
    console.log('Courses already exist, skipping insertion.');
  }
}

// Run the seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
