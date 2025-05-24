import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">About Cloudure</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
            <p className="mb-6 text-gray-700">
              At Cloudure, we believe everyone deserves access to secure cloud storage without compromising on 
              usability or privacy. Our mission is to provide an intuitive platform that keeps your files safe 
              while making them easily accessible to you whenever you need them.
            </p>            
            
            <h2 className="text-2xl font-medium mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium mb-2">Privacy First</h3>
                <p className="text-gray-700">
                  We never compromise on privacy. Your data belongs to you, and we take that seriously.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium mb-2">Simplicity</h3>
                <p className="text-gray-700">
                  Security shouldn't be complicated. We focus on making our platform intuitive and easy to use.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium mb-2">Transparency</h3>
                <p className="text-gray-700">
                  We're open about how we handle your data and the security measures we implement.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We continually evolve our platform to stay ahead of emerging threats and technologies.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-medium mb-4">Our Team</h2>
            <p className="text-gray-700">
              We're a diverse team of security specialists, developers, and designers united by our passion 
              for creating a safer digital world. Based across three continents, we bring global perspectives 
              to the challenge of secure cloud storage.
            </p>
          </div>
        </div>
      </main>
      
   
    </div>
  );
};

export default About;