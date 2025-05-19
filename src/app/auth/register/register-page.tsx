"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Button, Input, Typography, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RESGISTERUSER } from "@/services/apiServices";

// Define form data interface
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // Toggle password visibility
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () => setConfirmPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password fields for validation
  const password = watch("password");

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Remove confirmPassword from data sent to API
      delete data.confirmPassword;
      const response = await fetch(RESGISTERUSER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Account created successfully!", { duration: 3000 });
        setIsLoading(false);
        router.push("/auth/login");
      } else {
        const errorResult = await response.json();
        toast.error(`Error: ${errorResult.message || "Failed to create account"}`, { duration: 3000 });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred.", { duration: 3000 });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Background Image Section */}
      <div className="hidden md:block w-full md:w-4/12 bg-[url('/image/login.jpg')] bg-cover bg-no-repeat"></div>

      {/* Registration Form Section */}
      <section className="flex w-full md:w-8/12 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="name">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Username
                </Typography>
              </label>
              <Input
                crossOrigin=""
                id="name"
                color="gray"
                size="lg"
                type="text"
                placeholder="username"
                className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "hidden" }}
                {...register("name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                name="name"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.name.message}
                </Typography>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Email
                </Typography>
              </label>
              <Input
                crossOrigin=""
                id="email"
                color="gray"
                size="lg"
                type="email"
                placeholder="email"
                className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "hidden" }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                name="email"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email.message}
                </Typography>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password">
                <Typography variant="small" className="block font-medium text-gray-900">
                  Password
                </Typography>
              </label>
              <Input
                crossOrigin=""
                size="lg"
                placeholder="********"
                labelProps={{ className: "hidden" }}
                className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                type={passwordShown ? "text" : "password"}
                icon={
                  <button
                    type="button"
                    onClick={togglePasswordVisiblity}
                    aria-label={passwordShown ? "Hide password" : "Show password"}
                  >
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                    )}
                  </button>
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.password.message}
                </Typography>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword">
                <Typography variant="small" className="block font-medium text-gray-900">
                  Confirm Password
                </Typography>
              </label>
              <Input
                crossOrigin=""
                size="lg"
                placeholder="Confirm Password"
                labelProps={{ className: "hidden" }}
                className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                type={confirmPasswordShown ? "text" : "password"}
                icon={
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisiblity}
                    aria-label={confirmPasswordShown ? "Hide password" : "Show password"}
                  >
                    {confirmPasswordShown ? (
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                    )}
                  </button>
                }
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </div>

            {/* Submit Button */}
            <Button
              color="gray"
              size="lg"
              className="mt-6 normal-case rounded-full flex items-center justify-center gap-2"
              type="submit"
              fullWidth
              disabled={isLoading}
              aria-label="Create account"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-5 w-5" /> Creating Account...
                </>
              ) : (
                "Create an Account"
              )}
            </Button>

            {/* Sign In Link */}
            <Link href="/auth/login">
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                {"Have an account? "}
                <span className="font-medium underline text-gray-900">
                  Sign In
                </span>
              </Typography>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;