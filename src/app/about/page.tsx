"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-md"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* School Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                src="/Logo.png"
                alt="School Logo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-[#3b82f6] font-dancingScript">
              Pascal School
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#3b82f6] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#3b82f6] transition-colors font-bold"
            >
              About
            </Link>
            <Link
              href="/programs"
              className="text-gray-700 hover:text-[#3b82f6] transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#3b82f6] transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col justify-center items-center text-center bg-[#A5A3FF] text-white relative"
      >
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">About Pascal School</h1>
          <p className="text-xl mb-8">
            Discover our mission, history, and values.
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col justify-center items-center text-center bg-[#d1fae5] p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-lg">
          At Pascal School, our mission is to provide a holistic education that
          nurtures the mind, body, and soul. We aim to empower students to
          achieve their full potential in a supportive and innovative learning
          environment.
        </p>
      </motion.section>

      {/* History Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-screen flex flex-col justify-center items-center text-center bg-[#B8E3FF] p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Our History</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Established in 1990, Pascal School has a rich history of academic
          excellence and community engagement. Over the years, we have grown
          into a leading institution known for our commitment to quality
          education.
        </p>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="h-screen flex flex-col justify-center items-center text-center bg-[#FAE27C] p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
        <ul className="max-w-2xl mx-auto text-lg list-disc list-inside">
          <li>Excellence in Education</li>
          <li>Respect for Diversity</li>
          <li>Commitment to Community</li>
          <li>Innovation and Creativity</li>
        </ul>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center bg-[#4b5563] text-white">
        <p>© 2024 Pascal School. All rights reserved.</p>
      </footer>
    </div>
  );
}
