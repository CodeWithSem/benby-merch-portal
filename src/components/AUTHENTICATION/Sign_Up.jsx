import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Info } from "lucide-react";
import delphys_logo from "../../assets/images/delphys-sidebar-logo.png";
import auth_img from "../../assets/images/auth-image.png";
import { useToast } from "../ADMINISTRATIVE/layout/Toast_Provider";
import { register_user } from "../../api/firestore_auth_api"; // use Firestore-only API

const Sign_Up = ({ set_page }) => {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [show_password, set_show_password] = useState(false);

  const { show_toast } = useToast();

  const handle_sign_up = async (e) => {
    e.preventDefault();

    try {
      const full_name = `${first_name} ${last_name}`;
      const category = "user"; // You can adjust or get this dynamically

      const user = await register_user(
        username,
        password,
        username, // email or username (if same)
        first_name,
        last_name,
        category,
      );

      show_toast({
        type: "success",
        title: "Account Created",
        message: `Welcome ${full_name}!`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });

      // Optionally redirect to login
      set_page("login");
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Sign Up Failed",
        message: err.message,
        icon: <Info size={21} className="text-red-500" />,
      });
    }
  };

  return (
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900">
        {/* Left - Form */}
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="mb-5 sm:mb-8">
              <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-gray-800 dark:text-white/90">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create your account!
              </p>
            </div>

            <form onSubmit={handle_sign_up}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      value={first_name}
                      onChange={(e) => set_first_name(e.target.value)}
                      required
                      className="block w-full focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 focus:outline-none"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      value={last_name}
                      onChange={(e) => set_last_name(e.target.value)}
                      required
                      className="block w-full focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => set_username(e.target.value)}
                    required
                    className="block w-full focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm border text-sm border-gray-300 focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500">
                    <input
                      type={show_password ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => set_password(e.target.value)}
                      required
                      className="block w-full pr-10 px-4 py-2.5 bg-transparent border border-transparent focus:outline-none focus:ring-0 focus:border-transparent placeholder-gray-400 disabled:cursor-not-allowed disabled:bg-transparent"
                    />
                    <span
                      className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                      onClick={() => set_show_password(!show_password)}
                    >
                      {show_password ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-5">
                  <button
                    type="submit"
                    className="bg-sky-600 shadow-xs hover:bg-sky-700 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Already have an account?
                <span
                  className="text-sky-600 hover:text-sky-700 dark:text-sky-400 ml-2 cursor-pointer"
                  onClick={() => set_page("login")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right - Branding */}
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
              <div className="mb-4 block">
                <div className="flex items-center gap-3 h-[500px] w-[500px]">
                  <img src={auth_img} alt="Auth" />
                </div>
              </div>
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

export default Sign_Up;
