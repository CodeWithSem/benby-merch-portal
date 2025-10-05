import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "../../elements/Modal";
import { Search } from "lucide-react";
import Input_Field from "../../elements/Input_Field";
import Input_Form_1 from "../forms/Input_Form_1";

const Layout = () => {
  // State to control sidebar's expanded/collapsed state
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);

      // if (!isNowDesktop) {
      //   setIsCollapsed(false); // Force expand on mobile
      // }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the collapse state
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    if (window.innerWidth <= 768) {
      setIsOpen((prev) => !prev);
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50">
        <div>
          {/* Pass the isCollapsed state and toggle function to Sidebar */}
          <Sidebar
            isDesktop={isDesktop}
            isCollapsed={isCollapsed}
            isOpen={isOpen}
          />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isDesktop ? (isCollapsed ? "md:ml-20" : "md:ml-64") : "ml-0"
          }`}
        >
          {/* Pass the toggle function to Header */}
          <Header isDesktop={isDesktop} toggleSidebar={toggleSidebar} />
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full h-[100px] bg-white rounded-lg border"></div>
              <div className="w-full h-[100px] bg-white rounded-lg border"></div>
              <div className="w-full h-[100px] bg-white rounded-lg border"></div>
            </div>
            <div className="w-full bg-white rounded-lg border mt-4 p-6">
              <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Input_Form_1 />
                </div>
                <div className="w-full">
                  <Input_Form_1 />
                </div>
              </div>
              <div className="w-full mt-4">
                <Input_Form_1 />
              </div>
              <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
                <div className="w-full">
                  <Input_Form_1 />
                </div>
                <div className="w-full">
                  <Input_Form_1 />
                </div>
                <div className="w-full">
                  <Input_Form_1 />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full h-[200px] bg-white rounded-lg border"></div>
              <div className="w-full h-[200px] bg-white rounded-lg border"></div>
            </div>
            <div className="w-full bg-white rounded-lg border mt-4 p-6">
              <div className="w-full border rounded-lg">
                <div className="w-full h-min-[70px] p-4">
                  <form className="relative">
                    <div className="absolute left-0 h-full w-[42px] flex justify-center items-center">
                      <Search size={16} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      // required={false}
                      pattern="[A-Za-z]{1,}"
                      // pattern="[0-9]*"
                      className="mt-1 pl-[38px] block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    {/* <span className="block text-xs font-medium text-red-500 mt-1">
                        This is an error input.
                      </span> */}
                  </form>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-l-0 px-6 py-3 text-left text-[12px] font-medium text-gray-700">
                          Name
                        </th>
                        <th className="border px-6 py-3 text-left text-[12px] font-medium text-gray-700">
                          Email
                        </th>
                        <th className="border px-6 py-3 text-left text-[12px] font-medium text-gray-700">
                          Role
                        </th>
                        <th className="border border-r-0 px-6 py-3 text-left text-[12px] font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="border border-l-0 px-6 py-4 text-[12px] text-gray-800">
                          John Doe
                        </td>
                        <td className="border px-6 py-4 text-[12px] text-gray-600">
                          john@example.com
                        </td>
                        <td className="border px-6 py-4 text-[12px] text-gray-600">
                          Admin
                        </td>
                        <td className="border border-r-0 px-6 py-4 text-left">
                          <button className="text-blue-600 hover:underline text-[12px]">
                            Edit
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="border border-l-0 px-6 py-4 text-[12px] text-gray-800">
                          Jane Smith
                        </td>
                        <td className="border px-6 py-4 text-[12px] text-gray-600">
                          jane@example.com
                        </td>
                        <td className="border px-6 py-4 text-[12px] text-gray-600">
                          User
                        </td>
                        <td className="border border-r-0 px-6 py-4 text-left">
                          <button className="text-blue-600 hover:underline text-[12px]">
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-full h-[70px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal /> */}
    </React.Fragment>
  );
};

export default Layout;
