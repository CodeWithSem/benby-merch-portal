import { CircleMinus, CirclePlus } from "lucide-react";
import React from "react";

const Badges = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Badges</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  UI Elements
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Badges</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* + With Light Background */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">With Light Background</h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-100 px-3 py-0.5 text-sm font-medium text-sky-500">
            Primary
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
            Success
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-500">
            Warning
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-500">
            Danger
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 px-3 py-0.5 text-sm font-medium text-gray-700">
            Light
          </span>
        </div>
      </div>
      {/* - With Light Background */}
      {/* + With Solid Background */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">With Solid Background</h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-500 px-3 py-0.5 text-sm font-medium text-white">
            Primary
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-500 px-3 py-0.5 text-sm font-medium text-white">
            Success
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-300 px-3 py-0.5 text-sm font-medium text-gray-800">
            Warning
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-500 px-3 py-0.5 text-sm font-medium text-white">
            Danger
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-400 px-3 py-0.5 text-sm font-medium text-white">
            Light
          </span>
        </div>
      </div>
      {/* - With Solid Background */}
      {/* + With Light Background + Left Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">
          With Light Background + Left Icon
        </h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-100 py-0.5 pl-2 pr-2.5 text-sm font-medium text-sky-500">
            <CirclePlus size={14} />
            Primary
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 py-0.5 pl-2 pr-2.5 text-sm font-medium text-green-500">
            <CirclePlus size={14} />
            Success
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-100 py-0.5 pl-2 pr-2.5 text-sm font-medium text-yellow-500">
            <CirclePlus size={14} />
            Warning
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 py-0.5 pl-2 pr-2.5 text-sm font-medium text-red-500">
            <CircleMinus size={14} />
            Danger
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 py-0.5 pl-2 pr-2.5 text-sm font-medium text-gray-700">
            <CircleMinus size={14} />
            Light
          </span>
        </div>
      </div>
      {/* - With Light Background + Left Icon */}
      {/* + With Solid Background + Left Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">
          With Light Background + Left Icon
        </h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-500 py-0.5 pl-2 pr-2.5 text-sm font-medium text-white">
            <CirclePlus size={14} />
            Primary
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-500 py-0.5 pl-2 pr-2.5 text-sm font-medium text-white">
            <CirclePlus size={14} />
            Success
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-300 py-0.5 pl-2 pr-2.5 text-sm font-medium text-gray-800">
            <CirclePlus size={14} />
            Warning
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-500 py-0.5 pl-2 pr-2.5 text-sm font-medium text-white">
            <CircleMinus size={14} />
            Danger
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-400 py-0.5 pl-2 pr-2.5 text-sm font-medium text-white">
            <CircleMinus size={14} />
            Light
          </span>
        </div>
      </div>
      {/* - With Solid Background + Left Icon */}
      {/* + With Light Background + Right Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">
          With Light Background + Left Icon
        </h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-100 py-0.5 pl-2.5 pr-2 text-sm font-medium text-sky-500">
            Primary
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 py-0.5 pl-2.5 pr-2 text-sm font-medium text-green-500">
            Success
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-100 py-0.5 pl-2.5 pr-2 text-sm font-medium text-yellow-500">
            Warning
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 py-0.5 pl-2.5 pr-2 text-sm font-medium text-red-500">
            Danger
            <CircleMinus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 py-0.5 pl-2.5 pr-2 text-sm font-medium text-gray-700">
            Light
            <CircleMinus size={14} />
          </span>
        </div>
      </div>
      {/* - With Light Background + Right Icon */}
      {/* + With Solid Background + Right Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">
          With Solid Background + Left Icon
        </h1>
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-start p-8">
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-sky-500 py-0.5 pl-2.5 pr-2 text-sm font-medium text-white">
            Primary
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-500 py-0.5 pl-2.5 pr-2 text-sm font-medium text-white">
            Success
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-yellow-300 py-0.5 pl-2.5 pr-2 text-sm font-medium text-gray-800">
            Warning
            <CirclePlus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-500 py-0.5 pl-2.5 pr-2 text-sm font-medium text-white">
            Danger
            <CircleMinus size={14} />
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-400 py-0.5 pl-2.5 pr-2 text-sm font-medium text-white">
            Light
            <CircleMinus size={14} />
          </span>
        </div>
      </div>
      {/* - With Solid Background + Right Icon */}
    </React.Fragment>
  );
};

export default Badges;
