import React, { useEffect, useState } from "react";
import profile_placeholder from "../../../../assets/images/profile-1.png";
import { Edit, Pencil } from "lucide-react";
import { onAuthStateChangedListener } from "../../../../api/firebase_auth_api";

const Edit_Profile = () => {
  const [user, setUser] = useState(null);
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser); // update user state when auth changes
    });
    return () => unsubscribe();
  }, []);

  // Use user's displayName or fallback
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Profile</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit Profile</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-medium text-gray-800 lg:mb-7 dark:text-white/90">
          User Information
        </h3>
        <div className="mb-6 rounded-lg border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
                <img src={profile_placeholder} alt="Avatar" />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                  {displayName}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Software Developer
                  </p>
                  <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Malabon, Philippines
                  </p>
                </div>
              </div>
            </div>
            <button className="shadow-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>
        <div className="mb-6 rounded-lg border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Sem
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Sianghio
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Email address
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    codewithsem19513@gmail.com
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    +63 947 393 1095
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Bio
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Software Developer
                  </p>
                </div>
              </div>
            </div>
            <button className="shadow-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>
        <div className="mb-6 rounded-lg border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Address
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Country
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Philippines
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    City/State
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Malabon, Metro-Manila
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Postal Code
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    1472
                  </p>
                </div>
              </div>
            </div>
            <button className="shadow-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Edit_Profile;
