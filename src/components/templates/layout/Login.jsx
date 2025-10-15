import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Checkbox_Field from "../../elements/Checkbox_Field";
import delphys_logo from "../../../assets/images/delphys-sidebar-logo.png";
import {
  loginUser,
  onAuthStateChangedListener,
} from "../../../api/firebase_auth_api";
import { CheckCircle2, Info } from "lucide-react";
import { useToast } from "../layout/Toast_Provider";

const Login = ({ set_page }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const { show_toast } = useToast();

  // Listen for existing auth state (auto-login)
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       console.log("Logged In.");
  //       // Redirect to dashboard or main page
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password, keepLoggedIn);
      show_toast({
        type: "success",
        title: "Logged In",
        message: `Welcome ${user.displayName || user.email}`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
      // Redirect to dashboard
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Login Failed",
        message: "Error: invalid credential",
        icon: <Info size={21} className="text-red-500" />,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900">
        {/* Left side - Form */}
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="mb-5 sm:mb-8">
              <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-gray-800 dark:text-white/90">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to sign in!
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 focus:outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm border text-sm border-gray-300 focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pr-10 px-4 py-2.5 bg-transparent border border-transparent focus:outline-none focus:ring-0 focus:border-transparent placeholder-gray-400 disabled:cursor-not-allowed disabled:bg-transparent"
                      required
                    />
                    <span
                      className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                {/* Checkbox & Forgot password */}
                <div className="flex items-center justify-between">
                  <Checkbox_Field
                    label="Keep me logged In"
                    name="keep_login"
                    box_size={18}
                    icon_size={12}
                    checked={keepLoggedIn}
                    on_change={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                  <a className="text-sky-600 hover:text-sky-700 text-sm">
                    Forgot password?
                  </a>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="bg-sky-600 shadow-xs hover:bg-sky-700 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* Sign up link */}
            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Don't have an account?
                <span
                  className="text-sky-600 hover:text-sky-700 dark:text-sky-400 ml-2 cursor-pointer"
                  onClick={() => set_page("sign_up")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="bg-sky-800 relative hidden h-full w-full items-center lg:grid lg:w-1/2 dark:bg-white/5">
          <div className="z-1 flex items-center justify-center">
            <div className="flex max-w-xs flex-col items-center">
              <a className="mb-4 block">
                <div className="flex items-center gap-3">
                  <div className="w-[60px] h-[60px] text-[10px] border rounded-lg flex justify-center items-center bg-white">
                    <img src={delphys_logo} alt="Logo" />
                  </div>
                  <h1 className="text-white text-4xl whitespace-nowrap">
                    Delphys Software
                  </h1>
                </div>
              </a>
              <p className="text-center text-sm text-gray-300 dark:text-white/60">
                Empowering businesses to run smarter, faster, and together — all
                your operations, one platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
