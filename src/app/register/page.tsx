"use client"; // Mark this as a Client Component
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaBirthdayCake,
  FaCamera,
} from "react-icons/fa";
import { FaVenus, FaMars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import Confetti from "react-confetti";

export default function Register() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();

  // Load the Lottie animation data
  useEffect(() => {
    fetch("/success-animation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    document.body.style.overflow = isFormOpen ? "auto" : "hidden";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form validation
    const isFormValid = true; // Replace with actual validation logic

    if (isFormValid) {
      setIsSubmitted(true); // Show the success animation
      toast.success(
        "🎉 Registration successful! We'll contact you within 24 hours.",
        {
          position: "bottom-center", // Move toast to bottom-center
          autoClose: 5000, // Toast lasts for 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-green-100 border border-green-500 text-green-900", // Custom toast style
          style: { fontSize: "1.125rem", fontWeight: "600" }, // Larger and bold text
          progressStyle: { backgroundColor: "#10B981" }, // Green progress bar
        }
      );
    } else {
      // Error Toast
      toast.error(
        "🤔 Oops! Something went wrong. Please check your details and try again. We believe in you!",
        {
          position: "bottom-center", // Move toast to bottom-center
          onClose: () => setIsFormOpen(true), // Keep form open to try again
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Blurred Background */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      )}

      {/* Registration Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => router.push("/")}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={24} />
            </button>

            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Register Now
            </h2>

            {/* Success Animation */}
            {isSubmitted && animationData && (
              <>
                {/* Confetti Effect */}
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                />

                {/* Success Message */}
                <div className="absolute inset-0 bg-pastel-purple rounded-lg flex flex-col items-center justify-center">
                  <Lottie
                    animationData={animationData}
                    loop={false}
                    className="w-48 h-48"
                  />
                  <div className="bg-gradient-to-r from-pastel-blue to-pastel-purple rounded-lg p-6 shadow-md text-center mt-4 animate-fade-in">
                    <p className="text-xl font-semibold text-gray-800">
                      🎉 Registration Successful!
                    </p>
                    <p className="text-gray-600 mt-2">
                      We'll contact you within 24 hours. Get ready for the
                      adventure!
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Form Inputs */}
            {!isSubmitted && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaPhone className="text-gray-500 mr-3" />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="flex items-center justify-around border rounded-lg p-3">
                  <label
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                      gender === "male"
                        ? "bg-blue-100 border border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="hidden"
                      onChange={() => setGender("male")}
                    />
                    <FaMars
                      className={`${
                        gender === "male" ? "text-blue-500" : "text-gray-500"
                      }`}
                      size={20}
                    />
                    <span>Male</span>
                  </label>
                  <label
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                      gender === "female"
                        ? "bg-pink-100 border border-pink-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="hidden"
                      onChange={() => setGender("female")}
                    />
                    <FaVenus
                      className={`${
                        gender === "female" ? "text-pink-500" : "text-gray-500"
                      }`}
                      size={20}
                    />
                    <span>Female</span>
                  </label>
                </div>

                {/* Address */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaMapMarker className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Birthday */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaBirthdayCake className="text-gray-500 mr-3" />
                  <input
                    type="date"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>

                {/* Photo Upload (Optional) */}
                <div className="flex items-center border rounded-lg p-3">
                  <FaCamera className="text-gray-500 mr-3" />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full focus:outline-none"
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="bottom-center" // Move toast to bottom-center
        autoClose={5000} // Toast lasts for 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }} // Ensure toast appears above everything
      />
    </div>
  );
}
