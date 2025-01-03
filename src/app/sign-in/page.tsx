"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      // Check the user's role from publicMetadata
      const role = user.publicMetadata.role;

      if (role) {
        setIsRedirecting(true);
        router.push(`/dashboard`); // Redirect to the dashboard
      } else {
        // If the user doesn't have a role, show an error and redirect to the homepage
        toast.error("You are not registered. Please contact support.");
        setTimeout(() => {
          router.push("/");
        }, 5000); // Redirect to homepage after 3 seconds
      }
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      {/* Back to Homepage Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 bg-white text-purple-600 px-4 py-2 rounded-md shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2 sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 md:top-6 md:left-6 md:px-4 md:py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden sm:inline">Back to Homepage</span>
      </button>

      {/* Sign-In Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md"
      >
        <SignIn.Root>
          <SignIn.Step name="start" className="flex flex-col gap-4">
            {/* Logo and Title */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full shadow-lg"
              />
              <h1 className="text-2xl font-bold text-purple-600">
                Welcome Back!
              </h1>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            {/* Global Error */}
            <Clerk.GlobalError className="text-sm text-red-500 text-center" />

            {/* Username Field */}
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm text-gray-600">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* Password Field */}
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm text-gray-600">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* Sign-In Button */}
            <SignIn.Action
              submit
              className="bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
            >
              Sign In
            </SignIn.Action>

            {/* Forgot Password Link */}
            <p className="text-center text-sm text-gray-500">
              Forgot your password?{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Reset it here
              </a>
            </p>
          </SignIn.Step>
        </SignIn.Root>
      </motion.div>

      {/* Toast Container for Error Messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="bg-white text-gray-800 shadow-lg"
        progressStyle={{
          background: "linear-gradient(to right, #9333ea, #4f46e5)",
        }}
      />
    </div>
  );
};

export default LoginPage;
