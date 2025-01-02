"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [activeSection, setActiveSection] = useState("hero"); // State for active section
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // State for header visibility
  const [isAtTop, setIsAtTop] = useState(true); // State to check if the page is at the top
  const { scrollY } = useScroll();

  // Update header visibility based on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Hide header when scrolling down
    if (latest > previous && latest > 50) {
      setIsHeaderVisible(false);
    }
    // Show header when scrolling up
    else if (latest < previous) {
      setIsHeaderVisible(true);
    }

    // Check if the page is at the top
    setIsAtTop(latest === 0);
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide "Back to Top" button
      if (window.scrollY > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Determine the active section based on scroll position
      const sections = [
        "hero",
        "about",
        "programs",
        "why-choose-us",
        "testimonials",
        "staff",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (name && email && message) {
      toast.success("Message sent!");
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  // Smooth scroll to sections
  const smoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
      {/* Header Section */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 ${
          isAtTop ? "bg-transparent" : "bg-white/20 backdrop-blur-md"
        } shadow-md`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* School Logo and Name */}
          <div className="flex items-center space-x-3">
            <Image
              src="/Logo.png"
              alt="School Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-[#3b82f6] font-dancingScript">
              Pascal School
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#about"
              className={`text-gray-700 hover:text-[#3b82f6] transition-colors ${
                activeSection === "about" ? "text-[#3b82f6] font-bold" : ""
              }`}
              onClick={(e) => smoothScroll(e, "about")}
            >
              About
            </Link>
            <Link
              href="#programs"
              className={`text-gray-700 hover:text-[#3b82f6] transition-colors ${
                activeSection === "programs" ? "text-[#3b82f6] font-bold" : ""
              }`}
              onClick={(e) => smoothScroll(e, "programs")}
            >
              Programs
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#3b82f6] transition-colors">
                More
              </button>
              <div className="absolute hidden group-hover:block bg-white/20 backdrop-blur-md shadow-md rounded-md mt-2">
                <Link
                  href="#why-choose-us"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
                  onClick={(e) => smoothScroll(e, "why-choose-us")}
                >
                  Why Choose Us
                </Link>
                <Link
                  href="#testimonials"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
                  onClick={(e) => smoothScroll(e, "testimonials")}
                >
                  Testimonials
                </Link>
              </div>
            </div>
            <Link
              href="/login"
              className="bg-[#3b82f6] px-4 py-2 rounded-md text-white hover:bg-[#2563eb] transition-colors"
            >
              Login/Signup
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#3b82f6] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/20 backdrop-blur-md shadow-md">
            <Link
              href="#about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
              onClick={(e) => {
                smoothScroll(e, "about");
                setIsMobileMenuOpen(false);
              }}
            >
              About
            </Link>
            <Link
              href="#programs"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
              onClick={(e) => {
                smoothScroll(e, "programs");
                setIsMobileMenuOpen(false);
              }}
            >
              Programs
            </Link>
            <Link
              href="#why-choose-us"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
              onClick={(e) => {
                smoothScroll(e, "why-choose-us");
                setIsMobileMenuOpen(false);
              }}
            >
              Why Choose Us
            </Link>
            <Link
              href="#testimonials"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
              onClick={(e) => {
                smoothScroll(e, "testimonials");
                setIsMobileMenuOpen(false);
              }}
            >
              Testimonials
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login/Signup
            </Link>
          </div>
        )}
      </motion.header>
      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen flex flex-col justify-center items-center text-center text-white relative"
        style={{ backgroundColor: "#A5A3FF" }}
      >
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="/school-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Pascal Info</h1>
          <p className="text-xl mb-8">
            C&apos;est plus qu&apos;une simple formation
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="bg-[#3b82f6] px-6 py-3 rounded-md text-white hover:bg-[#2563eb] transition-colors cursor-pointer"
            >
              Register Now
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white px-6 py-3 rounded-md text-white hover:bg-white hover:text-[#3b82f6] transition-colors cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* About the School */}
      <section
        id="about"
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: "#d1fae5" }} // SoftGreen
      >
        <h2 className="text-3xl font-bold mb-4">About Our School</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Pascal School is dedicated to providing a holistic education that
          nurtures the mind, body, and soul. Established in 1990, we have a rich
          history of academic excellence and community engagement.
        </p>
        <Link
          href="/about"
          className="bg-[#A8D695] px-6 py-3 rounded-md text-white hover:bg-[#8BC34A] transition-colors cursor-pointer active:cursor-grabbing"
        >
          Learn More
        </Link>
      </section>

      {/* Why Choose Us? */}
      <section
        id="why-choose-us"
        className="h-screen flex flex-col justify-center items-center"
        style={{ backgroundColor: "#B8E3FF" }} // pascalBlueLight
      >
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#FDF1A8" }}
          >
            {" "}
            {/* pascalYellowLight */}
            <h3 className="text-xl font-bold mb-4">Experienced Faculty</h3>
            <p>
              Our teachers are highly qualified and dedicated to student
              success.
            </p>
          </div>
          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#DDD9FF" }}
          >
            {" "}
            {/* pascalPurpleLight */}
            <h3 className="text-xl font-bold mb-4">Modern Infrastructure</h3>
            <p>State-of-the-art facilities to support learning and growth.</p>
          </div>
          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#F9C6D3" }}
          >
            {" "}
            {/* pascalPink */}
            <h3 className="text-xl font-bold mb-4">Holistic Education</h3>
            <p>We focus on academic, physical, and emotional development.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="h-screen flex flex-col justify-center items-center"
        style={{ backgroundColor: "#FAE27C" }} // pascalYellow
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          What Parents Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#F5A3A3" }}
          >
            {" "}
            {/* pascalRed */}
            <p className="italic">
              &quot;Pascal School has transformed my child’s future. The
              teachers are amazing!&quot;
            </p>
            <p className="mt-4 font-bold">
              — John Doe, Parent of Class 10 Student
            </p>
          </div>
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#E8C547" }}
          >
            {" "}
            {/* pascalGold */}
            <p className="italic">
              &quot;The facilities and extracurricular activities are
              top-notch.&quot;
            </p>
            <p className="mt-4 font-bold">
              — Jane Smith, Parent of Class 8 Student
            </p>
          </div>
        </div>
      </section>

      {/* School Staff */}
      <section
        id="staff"
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: "#7CCFFA" }} // pascalBlue
      >
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#FBCFE8" }}
          >
            {" "}
            {/* LightPink */}
            <Image
              src="/staff1.png"
              alt="Principal"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">Principal</h3>
            <p>Dr. Sarah Johnson</p>
          </div>
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#93C5FD" }}
          >
            {" "}
            {/* SoftBlue */}
            <Image
              src="/staff2.png"
              alt="Vice Principal"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">Vice Principal</h3>
            <p>Mr. David Smith</p>
          </div>
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#FDBA74" }}
          >
            {" "}
            {/* AccentOrange */}
            <Image
              src="/staff3.png"
              alt="Head of Academics"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">Head of Academics</h3>
            <p>Ms. Emily Brown</p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section
        id="contact"
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: "#e5e7eb" }} // LightGray
      >
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <p className="mb-8">
          We’d love to hear from you! Reach out to us for any inquiries.
        </p>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 rounded-md border border-gray-300 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-md border border-gray-300 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-2 rounded-md border border-gray-300 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-[#4b5563] px-6 py-3 rounded-md text-white hover:bg-[#374151] transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{ backgroundColor: "#4b5563", color: "#fff" }} // DarkGray
      >
        <p>© 2024 Pascal School. All rights reserved.</p>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors z-50 border-2 border-red-500"
        >
          ↑
        </button>
      )}

      <ToastContainer />
    </div>
  );
}
