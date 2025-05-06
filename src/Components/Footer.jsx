import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-inner">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                My App
              </span>
            </h2>
            <p className="mt-4 text-gray-200">
              Empowering your future with innovative solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-400 pt-6 text-center">
          <p className="text-gray-200">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
