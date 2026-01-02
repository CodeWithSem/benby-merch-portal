import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Info } from "lucide-react";
import delphys_logo from "../../assets/images/delphys-sidebar-logo.png";
import auth_img from "../../assets/images/auth-image.png";
import Button from "assets/elements/Button";
import { useToast } from "../ADMINISTRATIVE/layout/Toast_Provider";
import { Use_App } from "../../context/app_context";
import { login_user } from "api/firestore_db/authentication/tbl_authentication_api";

const Login = () => {
  const { set_active_user, set_page } = Use_App();
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [show_password, set_show_password] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const { show_toast } = useToast();

  const handle_login = async (e) => {
    e.preventDefault();

    try {
      set_is_loading(true);
      const user = await login_user(username, password); // ✅ Firestore login
      set_is_loading(false);

      // Store user data in localStorage
      set_active_user(user);

      // Redirect to Dashboard by updating parent state
      if (user.category === "PROD") {
        set_page("production");
      } else {
        set_page("dashboard");
      }

      show_toast({
        type: "success",
        title: "Login Successful",
        message: `Welcome back ${user.first_name}`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });

      // You can store user data in state or localStorage here if needed
      // localStorage.setItem("user_data", JSON.stringify(user));
    } catch (err) {
      set_is_loading(false);
      show_toast({
        type: "danger",
        title: "Login Failed",
        message: err.message,
        icon: <Info size={21} className="text-red-500" />,
      });
    }
  };

  const toggle_password_visibility = () => set_show_password(!show_password);

  return (
    <React.Fragment>
      <div className="relative z-1 bg-white p-6 sm:p-0">
        <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
          {/* Left side - Form */}
          <div className="flex w-full flex-1 flex-col lg:w-1/2">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
              <div className="mb-5 sm:mb-8">
                <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-gray-800">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500">
                  Enter your username and password to sign in!
                </p>
              </div>

              <form onSubmit={handle_login}>
                <div className="space-y-5">
                  {/* Username */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => set_username(e.target.value)}
                      className="block w-full focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative rounded-md shadow-sm border text-sm border-gray-300 focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500">
                      <input
                        type={show_password ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => set_password(e.target.value)}
                        className="block w-full pr-10 px-4 py-2.5 bg-transparent border border-transparent focus:outline-none focus:ring-0 focus:border-transparent placeholder-gray-400 disabled:cursor-not-allowed disabled:bg-transparent"
                        required
                      />
                      <span
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={toggle_password_visibility}
                      >
                        {show_password ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Forgot password */}
                  <div className="flex items-center justify-end">
                    <a className="text-sky-600 hover:text-sky-700 text-sm cursor-pointer">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      width="w-full"
                      class_name="py-3"
                      loading={is_loading}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </form>

              {/* Sign up link */}
              {/* <div className="mt-5">
                <p className="text-center text-sm font-normal text-gray-700 sm:text-start">
                  Don't have an account?
                  <span
                    className="text-sky-600 hover:text-sky-700 ml-2 cursor-pointer"
                    onClick={() => set_page("sign_up")}
                  >
                    Sign Up
                  </span>
                </p>
              </div> */}
            </div>
          </div>

          {/* Right side - Branding */}
          <div className="bg-sky-800 relative hidden h-full w-full items-center lg:grid lg:w-1/2">
            <div className="z-1 flex items-center justify-center">
              <div className="flex max-w-xs flex-col items-center">
                <a className="mb-4 block">
                  <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] text-[10px] border rounded-lg flex justify-center items-center bg-white">
                      <img src={delphys_logo} alt="Logo" />
                    </div>
                    <h1 className="text-white text-4xl whitespace-nowrap">
                      Delphys 7
                    </h1>
                  </div>
                </a>
                <div className="mb-4 block">
                  <div className="flex items-center gap-3 h-[500px] w-[500px]">
                    <img src={auth_img} alt="Logo" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-300">
                  Empowering businesses to run smarter, faster, and together —
                  all your operations, one platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
