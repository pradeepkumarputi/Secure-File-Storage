import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">
                  Secure File Storage for Everyone
                </h1>
                <p className="text-xl mb-8">
                  Keep your files safe and accessible with our encrypted cloud
                  storage solution.
                </p>
                <div className="flex space-x-4">
                  <Link
                    to="/signup"
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-200"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/features"
                    className="text-white border border-white  px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 hover:bg-opacity-10 transition duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="src/assets/cloud.png"
                  alt="Cloud Storage"
                  className="w-full max-w-md mx-auto "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
              Why Choose Cloudure?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                
                <div className="text-cyan-500 w-16 h-16 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium mb-2">Easy Upload</h3>
                <p className="text-gray-600">
                  Simple drag-and-drop interface to upload your files from any
                  device.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                
                <div className="text-cyan-500 w-16 h-16 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium mb-2">Quick Access</h3>
                <p className="text-gray-600">
                  Access and download your files whenever you need them,
                  wherever you are.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                
                <div className="text-cyan-500 w-16 h-16 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium mb-2">
                  Bank-Level Security
                </h3>
                <p className="text-gray-600">
                  Your files are encrypted and protected with the highest
                  security standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Cloudure with their important
              files.
            </p>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-600 transition duration-200"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>


    </div>
  );
};

export default Home;
