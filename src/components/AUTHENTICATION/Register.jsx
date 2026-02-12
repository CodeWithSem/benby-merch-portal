import React, { useState } from "react";
import { UserPlus, ChevronLeft, CheckCircle2 } from "lucide-react";
import Button from "assets/elements/Button";
import { useToast } from "../ADMINISTRATIVE/layout/Toast_Provider";
import { register_user } from "api/firestore_db/authentication/tbl_authentication_api";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";

const Register = ({ set_page }) => {
  const { show_toast } = useToast();
  const [is_loading, set_is_loading] = useState(false);

  const [new_user_data, set_new_user_data] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    user_category_code: "DEV",
    user_role_code: "DEV", // Default role
  });

  const handle_text_change = (e) => {
    const { name, value } = e.target;
    set_new_user_data((prev) => ({ ...prev, [name]: value }));
  };

  const handle_register = async (e) => {
    e.preventDefault();

    const is_valid = validate_required_fields({
      data: new_user_data,
      fields: [
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "password", label: "Password" },
      ],
      show_toast,
    });

    if (!is_valid) return;

    try {
      set_is_loading(true);
      await register_user(
        new_user_data.first_name,
        new_user_data.last_name,
        new_user_data.email,
        new_user_data.username,
        new_user_data.password,
        new_user_data.user_category_code,
        new_user_data.user_role_code,
        "Self-Registered",
        show_toast,
      );

      show_toast({
        type: "success",
        title: "Registration Success",
        message: "Your account has been created. You can now sign in.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });

      set_page("login"); // Redirect back to login
    } catch (error) {
      console.error(error);
    } finally {
      set_is_loading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-2 w-full bg-emerald-600"></div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-emerald-100 text-emerald-600">
              <UserPlus size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Create Account
            </h1>
            <p className="text-sm text-slate-500 mt-2">Join the Merch Portal</p>
          </div>

          <form onSubmit={handle_register} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  value={new_user_data.first_name}
                  onChange={handle_text_change}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  value={new_user_data.last_name}
                  onChange={handle_text_change}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                value={new_user_data.email}
                onChange={handle_text_change}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={new_user_data.username}
                onChange={handle_text_change}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={new_user_data.password}
                onChange={handle_text_change}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="emerald"
                width="w-full"
                class_name="py-3 rounded-lg font-semibold shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-transform active:scale-95"
                loading={is_loading}
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center border-t pt-6">
            <button
              onClick={() => set_page("login")}
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft size={14} /> Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
