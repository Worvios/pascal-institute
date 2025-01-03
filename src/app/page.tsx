"use client"; // Ensure this is a client component

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer to detect when the hero section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play the video when the hero section is in view
            videoRef.current?.play();
          } else {
            // Pause the video when the hero section is out of view
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    // Cleanup the observer on unmount
    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);

  // Throttle scroll events using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Show/hide "Back to Top" button
        if (scrollY > 100) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }

        // Hide header when scrolling down, show when scrolling up
        if (scrollY > lastScrollY.current && scrollY > 50) {
          setIsHeaderVisible(false);
        } else if (scrollY < lastScrollY.current) {
          setIsHeaderVisible(true);
        }

        // Check if the page is at the top
        setIsAtTop(scrollY === 0);

        // Update last scroll position
        lastScrollY.current = scrollY;

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
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Smooth scroll to top with fallback
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0); // Fallback for browsers that don't support smooth scrolling
    }
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
      {/* Header Section */}
      <AnimatePresence>
        {isHeaderVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.5,
            }}
            className={`fixed top-0 left-0 w-full z-50 ${
              isAtTop
                ? "bg-gradient-to-b from-pascalYellowLight to-pascalBlueLight"
                : "bg-gradient-to-b from-pascalYellow to-pascalYellowLight backdrop-blur-lg"
            } shadow-lg border-b border-pascalYellowLight`}
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
                <span className="text-xl font-dancing-script text-[#3b82f6] bg-white/50 px-2 py-1 rounded-lg">
                  Pascal School
                </span>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="#about"
                  className={`text-gray-700 font-dancing-script hover:text-[#3b82f6] transition-colors ${
                    activeSection === "about" ? "text-[#3b82f6] font-bold" : ""
                  }`}
                  onClick={(e) => smoothScroll(e, "about")}
                >
                  About
                </Link>
                <Link
                  href="#programs"
                  className={`text-gray-700 font-dancing-script hover:text-[#3b82f6] transition-colors ${
                    activeSection === "programs" ? "text-[#3b82f6] " : ""
                  }`}
                  onClick={(e) => smoothScroll(e, "programs")}
                >
                  Programs
                </Link>
                <div className="relative font-dancing-script">
                  <button
                    className="text-gray-700 font-dancing-script hover:text-[#3b82f6] transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    More
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute bg-white/20 backdrop-blur-md shadow-md rounded-md mt-2">
                      <Link
                        href="#why-choose-us"
                        className="block px-4 py-2 text-gray-700 font-dancing-script hover:bg-gray-100/20"
                        onClick={(e) => {
                          smoothScroll(e, "why-choose-us");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Why Choose Us
                      </Link>
                      <Link
                        href="#testimonials"
                        className="block px-4 py-2 font-dancing-script text-gray-700 hover:bg-gray-100/20"
                        onClick={(e) => {
                          smoothScroll(e, "testimonials");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Testimonials
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  href="/sign-in"
                  className="bg-[#3b82f6] font-dancing-script px-4 py-2 rounded-md text-white hover:bg-[#2563eb] transition-colors"
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
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-white/20 backdrop-blur-md shadow-md"
                >
                  <Link
                    href="#about"
                    className="block px-4 py-2 text-gray-700 font-dancing-script hover:bg-gray-100/20"
                    onClick={(e) => {
                      smoothScroll(e, "about");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    About
                  </Link>
                  <Link
                    href="#programs"
                    className="block px-4 py-2 font-dancing-script text-gray-700 hover:bg-gray-100/20"
                    onClick={(e) => {
                      smoothScroll(e, "programs");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Programs
                  </Link>
                  <Link
                    href="#why-choose-us"
                    className="block px-4 py-2 font-dancing-script text-gray-700 hover:bg-gray-100/20"
                    onClick={(e) => {
                      smoothScroll(e, "why-choose-us");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Why Choose Us
                  </Link>
                  <Link
                    href="#testimonials"
                    className="block px-4 py-2 font-dancing-script text-gray-700 hover:bg-gray-100/20"
                    onClick={(e) => {
                      smoothScroll(e, "testimonials");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/sign-in"
                    className="block px-4 py-2 font-dancing-script text-gray-700 hover:bg-gray-100/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login/Signup
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        id="hero"
        className="h-screen flex flex-col justify-center items-center text-center text-white relative"
        style={{ backgroundColor: "#A5A3FF" }}
      >
        <video
          ref={videoRef}
          muted
          loop
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="/school-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Pascal Info</h1>
          <p className="text-xl mb-8">C’est plus qu’une simple formation</p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="bg-[#3b82f6] px-6 py-3 rounded-md text-white hover:bg-[#2563eb] transition-colors cursor-pointer"
            >
              Register Now
            </Link>
            <Link
              href="/sign-in"
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
        style={{ backgroundColor: "#d1fae5" }}
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
      <motion.section
        id="why-choose-us"
        className="h-screen flex flex-col justify-center items-center"
        style={{ backgroundColor: "#B8E3FF" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#FDF1A8" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Experienced Faculty</h3>
            <p>
              Our teachers are highly qualified and dedicated to student
              success.
            </p>
          </motion.div>
          <motion.div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#DDD9FF" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Modern Infrastructure</h3>
            <p>State-of-the-art facilities to support learning and growth.</p>
          </motion.div>
          <motion.div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "#F9C6D3" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Holistic Education</h3>
            <p>We focus on academic, physical, and emotional development.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        className="h-screen flex flex-col justify-center items-center"
        style={{ backgroundColor: "#FAE27C" }}
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          What Parents Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#F5A3A3" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="italic">
              &quot;Pascal School has transformed my child’s future. The
              teachers are amazing!&quot;
            </p>
            <p className="mt-4 font-bold">
              — John Doe, Parent of Class 10 Student
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#E8C547" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="italic">
              &quot;The facilities and extracurricular activities are
              top-notch.&quot;
            </p>
            <p className="mt-4 font-bold">
              — Jane Smith, Parent of Class 8 Student
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* School Staff */}
      <motion.section
        id="staff"
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: "#7CCFFA" }}
        initial={{ x: -300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#FBCFE8" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/staff1.png"
                alt="Principal"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Principal</h3>
            <p>Dr. Sarah Johnson</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#93C5FD" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/staff2.png"
                alt="Vice Principal"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Vice Principal</h3>
            <p>Mr. David Smith</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#FDBA74" }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/staff3.png"
                alt="Head of Academics"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Head of Academics</h3>
            <p>Ms. Emily Brown</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Us */}
      <section
        id="contact"
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: "#e5e7eb" }}
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
        style={{ backgroundColor: "#4b5563", color: "#fff" }}
      >
        <p>© 2024 Pascal School. All rights reserved.</p>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors z-50 shadow-lg flex items-center justify-center"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
