import React from "react";

const About = () => {
  return (
    <div className=" min-h-screen py-8 dark:text:gray-50 max-sm:w-full">
      <div className="container mx-auto p-8  dark:text:gray-50 mt-10">
        <h1 className="text-4xl font-bold mb-4  dark:text:gray-50 text-gray-900 dark:text-gray-50">
          About Me
        </h1>

        <p className="dark:text:gray-50 text-gray-900 dark:text-gray-50 mb-8">
          Welcome to my Pinterest-inspired website! <br/>My name is Ravindra Pawar, and I developed this website as a way to learn more about MERN stack technology. MERN stack refers to the combination of MongoDB, Express.js, React, and Node.js, which are all used in the development of this project.

          Through this project, I have gained hands-on experience in building a full-stack web application, handling user accounts and content storage, and implementing secure user authentication. I have also utilized cloud-based storage solutions for efficient image and multimedia content management.

          This project has allowed me to deepen my understanding of front-end technologies such as HTML, CSS, and JavaScript, as well as the React framework for building interactive user interfaces.

          Additionally, I have worked with back-end technologies like Node.js for server-side logic, ExpressJs for Writing server-side code and database management using MongoDB.

          Thank you for visiting my website and I hope you enjoy exploring the features and functionalities I have implemented.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-700 dark:text:gray-50 text-gray-900 dark:text-gray-50">
          {/* Add content here */}
        </div>

        <h1 className="mt-5 text-4xl font-bold mb-4 dark:text:gray-50 text-gray-900 dark:text-gray-50">
          About Project
        </h1>

        <div className="bg-gray-100 p-8 dark:bg-gray-800 dark:text-gray-50 max-sm:w-full">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Technologies Used:</h3>
            <p>
              To bring this Pinterest-Like social platform to life, I utilized a combination of front-end and back-end technologies:
            </p>
            <ul className="list-disc pl-5">
              <li>
                Front-End: HTML, CSS, JavaScript, and a front-end framework (React) for building the user interface and interactivity.
              </li>
              <li>
                Back-End: A server-side language (Node.js) for handling user accounts, content storage, and interactions.
              </li>
              <li>
                Database: A database system (MongoDB) to store user profiles, pins, boards, and related data.
              </li>
              <li>
                Authentication: Implementing secure user authentication to safeguard user accounts and data.
              </li>
              <li>
                Cloud Storage: Utilizing cloud-based storage solutions for efficiently storing and serving images and multimedia content.
              </li>
            </ul>
          </div>
        </div>

        {/* Placeholder images */}
        <div className="flex md:flex-row flex-row flex-wrap items-center">
          <img
            src="https://picsum.photos/400/400"
            alt="random"
            className="w-64 h-48 rounded-lg object-cover m-4"
          />

          <img
            src="https://picsum.photos/400/500"
            alt="random"
            className="w-64 h-48 rounded-lg object-cover m-4"
          />

          <img
            src="https://picsum.photos/600/400"
            alt="random"
            className="w-64 h-48 rounded-lg object-cover m-4"
          />

          <img
            src="https://picsum.photos/300/200"
            alt="random"
            className="w-64 h-48 rounded-lg object-cover m-4"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
   
