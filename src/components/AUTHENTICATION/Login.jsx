import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Info, Lock, Network } from "lucide-react";
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
      const user = await login_user(username, password);
      set_is_loading(false);

      set_active_user(user);
      localStorage.setItem("active_item", "Dashboard");
      set_page("dashboard");

      show_toast({
        type: "success",
        title: "Login Successful",
        message: `Welcome back, ${user.first_name}!`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
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
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-green-600"></div>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600"
              // onClick={() => set_page("register")}
            >
              <Network size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Benby Merch Portal
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Please enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handle_login} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => set_username(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder:text-slate-400"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Password
                </label>
                {/* <button
                  type="button"
                  className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot?
                </button> */}
              </div>
              <div className="relative">
                <input
                  type={show_password ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => set_password(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={toggle_password_visibility}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show_password ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                width="w-full"
                class_name="py-3.5"
                loading={is_loading}
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 text-center border-t border-slate-50 pt-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              &copy; {new Date().getFullYear()} Benby Enterprises. <br />
              Internal Access Only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
