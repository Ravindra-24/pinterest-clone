import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 dark:bg-gray-700 dark:text:gray-50 max-sm:w-full">
      <div className="container mx-auto p-8 dark:bg-gray-700 dark:text:gray-50">
        <h1 className="text-4xl font-bold mb-4 dark:bg-gray-700 dark:text:gray-50 text-gray-900 dark:text-gray-50">
          About Us
        </h1>

        <p className="dark:bg-gray-700 dark:text:gray-50 text-gray-900 dark:text-gray-50 mb-8">
          Welcome to my Pinterest-inspired website! I'm passionate about helping
          you discover and save ideas for your creative projects. Whether you're
          planning a home makeover, DIY crafts, or looking for inspiration in
          any other area, I've got you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-700 dark:text:gray-50 text-gray-900 dark:text-gray-50">
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text:gray-50 text-gray-900 dark:text-gray-50">
            <h2 className="text-2xl font-semibold mb-4 dark:bg-gray-800 dark:text:gray-50 text-gray-900 dark:text-gray-50">
              Mission
            </h2>
            <p className="dark:text:gray-50 text-gray-900 dark:text-gray-50 ">
              My mission is to provide a platform where you can collect and
              organize your favorite ideas, designs, and inspirations from
              around the web. I aim to make the creative process easier,
              enjoyable, and more collaborative. I'm a dedicated developer and
              enthusiast who believes in the power of creativity. I've created
              this platform to help you unleash your imagination and make your
              creative visions a reality.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text:gray-50 text-gray-900 dark:text-gray-50">
            <h2 className="text-2xl font-semibold mb-4 dark:bg-gray-800 dark:text:gray-50 text-gray-900 dark:text-gray-50">
              About Me
            </h2>
            <p className="dark:bg-gray-800 dark:text:gray-50 text-gray-900 dark:text-gray-50">
              I'm a dedicated developer and enthusiast who believes in the power
              of creativity. I've created this platform to help you unleash your
              imagination and make your creative visions a reality.
            </p>
          </div>
        </div>
        <h1 className="mt-5 text-4xl font-bold mb-4 dark:bg-gray-700 dark:text:gray-50 text-gray-900 dark:text-gray-50">
          About Project
        </h1>

        <div className="bg-gray-100 p-8 dark:bg-gray-800 dark:text-gray-50 max-sm:w-full">
          <h2 className="text-3xl font-bold mb-4 ">
            Pinterest-Like Social Platform
          </h2>
          <p className="text-lg mb-4">
            Welcome to my Pinterest-Like social platform project! This
            innovative web application draws inspiration from the popular
            website Pinterest, offering users a visually engaging and
            interactive space to discover, collect, and share their favorite
            images, ideas, and inspirations.
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5">
              <li>
                Visual Discovery: Just like Pinterest, our platform emphasizes
                visual content discovery. Users can explore a wide range of
                images, graphics, and visuals uploaded by the community.
              </li>
              <li>
                Pinning and Collecting: Users can create and manage their own
                collections by "pinning" images to themed boards. This intuitive
                process allows for effortless organization and personalization
                of content.
              </li>
              <li>
                User Profiles: Each user has a personalized profile where they
                can showcase their boards, pins, and interests. This helps users
                connect and engage with like-minded individuals who share their
                passions.
              </li>
              <li>
                Follow and Engage: Building a sense of community is essential.
                Users can follow others, and the platform will curate a feed of
                content from the accounts they follow, encouraging collaboration
                and engagement.
              </li>
              <li>
                Content Sharing: Beyond pinning, users can share their favorite
                images with friends and followers. This encourages a dynamic
                exchange of ideas and inspirations.
              </li>
              <li>
                Search and Explore: Our platform boasts a robust search
                functionality, enabling users to find specific content, topics,
                or users they are interested in. This makes it easy to dive deep
                into various niches and subjects.
              </li>
              <li>
                Responsive Design: The platform is designed with responsiveness
                in mind, ensuring a seamless experience across devices,
                including desktops, tablets, and smartphones.
              </li>
              <li>
                Privacy Settings: Users have control over the visibility of
                their boards and pins, allowing them to share their creations
                with the world or keep them private for personal use.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Technologies Used:</h3>
            <p>
              To bring this Pinterest-Like social platform to life, I utilized a
              combination of front-end and back-end technologies:
            </p>
            <ul className="list-disc pl-5">
              <li>
                Front-End: HTML, CSS, JavaScript, and a front-end framework
                (e.g., React) for building the user interface and interactivity.
              </li>
              <li>
                Back-End: A server-side language (e.g., Node.js) for handling
                user accounts, content storage, and interactions.
              </li>
              <li>
                Database: A database system (e.g., MySQL, MongoDB) to store user
                profiles, pins, boards, and related data.
              </li>
              <li>
                Authentication: Implementing secure user authentication to
                safeguard user accounts and data.
              </li>
              <li>
                Cloud Storage: Utilizing cloud-based storage solutions for
                efficiently storing and serving images and multimedia content.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Why This Project Matters:
            </h3>
            <p className="mb-4">
              This Pinterest-Like social platform goes beyond being just another
              image-sharing site. It fosters creativity, collaboration, and a
              sense of community among individuals with diverse interests. It's
              a place where users can visually express themselves, discover new
              ideas, and connect with others who share their passions.
            </p>
            
          </div>
        </div>

        {/* Placeholder images */}
        <div className=" flex md:flex-row flex-row flex-wrap items-center">
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
