"use client";

import { useState } from "react";
import { Typography, Input, Button, Checkbox, Spinner } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/auth/authSlice";
import { LOGINUSER } from "@/services/apiServices";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define form data interface
interface FormLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState(false);

  // Toggle password visibility
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormLogin) => {
    setIsLoading(true);
    try {
      const response = await fetch(LOGINUSER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        // Store tokens based on "Remember Me" preference
          localStorage.setItem("token", result.tokens.access.token);
          localStorage.setItem("refreshToken", result.tokens.refresh.token);

        dispatch(login(result));
        toast.success("Login successful!", { duration: 3000 });

        setIsLoading(false);

        // Redirect based on user status
        if (result.isNewUser) {
          window.location.href = "/";
        } else {
          router.push("/user-space");
        }
      } else {
        const errorResult = await response.json();
        toast.error(`Error: ${errorResult.message || "Failed to log in"}`, { duration: 3000 });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred.", { duration: 3000 });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Background Image Section */}
      <div className="hidden md:block w-full md:w-4/12 bg-[url('/image/login.jpg')] bg-cover bg-no-repeat"></div>

      {/* Login Form Section */}
      <section className="flex w-full md:w-8/12 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
            Sign In Music App
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Google Sign-In Button */}
            <Button
              variant="outlined"
              size="lg"
              className="flex h-12 rounded-full items-center justify-center gap-2 normal-case"
              fullWidth
              disabled={isLoading}
              aria-label="Sign in with Google"
            >
              <img
                src="https://www.material-tailwind.com/logos/logo-google.png"
                alt="Google logo"
                className="h-6 w-6"
              />
              Sign In with Google
            </Button>

            <div className="relative flex items-center my-4">
              <hr className="w-full h-px bg-gray-300 border-0" />
              <span className="absolute px-3 text-sm text-gray-500 bg-white -translate-x-1/2 left-1/2">
                or sign in with email
              </span>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Username or Email
                </Typography>
              </label>
              <Input
                crossOrigin=""
                id="email"
                color="gray"
                size="lg"
                type="email"
                placeholder="username or email"
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
              <div className="flex justify-between items-center">
                <label htmlFor="password">
                  <Typography variant="small" className="block font-medium text-gray-900">
                    Password
                  </Typography>
                </label>
                <Link href="/auth/forgot-password">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-light underline text-xs"
                  >
                    Forgot?
                  </Typography>
                </Link>
              </div>
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
                    value: 6,
                    message: "Password must be at least 6 characters",
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <Checkbox
                crossOrigin=""
                label="Remember Me"
                aria-label="Remember Me"
              />
            </div>

            {/* Submit Button */}
            <Button
              color="gray"
              size="lg"
              className="mt-6 normal-case rounded-full flex items-center justify-center gap-2"
              type="submit"
              fullWidth
              disabled={isLoading}
              aria-label="Sign in"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-5 w-5" /> Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Sign Up Link */}
            <Link href="/auth/register">
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                {"Don't have an account? "}
                <span className="font-medium underline text-gray-900">
                  Sign Up
                </span>
              </Typography>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;