import { CheckCircle, CheckCircle2, Info } from "lucide-react";
import React from "react";

const Alerts = () => {
  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Alerts</h1>
      </div>
      {/* + Success Alerts */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Success Alert</h1>
        <div className="p-6">
          <div className="w-full flex border border-green-500 bg-green-100 rounded-lg gap-3 p-4">
            <div>
              <CheckCircle2 size={21} className="text-green-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Success Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
              <a className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400 cursor-pointer">
                Learn More
              </a>
            </div>
          </div>
          <div className="w-full flex border border-green-500 bg-green-100 rounded-lg gap-3 p-4 mt-5">
            <div>
              <CheckCircle2 size={21} className="text-green-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Success Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* - Success Alerts */}
      {/* + Warning Alerts */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Warning Alert</h1>
        <div className="p-6">
          <div className="w-full flex border border-yellow-500 bg-yellow-50 rounded-lg gap-3 p-4">
            <div>
              <Info size={21} className="text-yellow-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Warning Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
              <a className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400 cursor-pointer">
                Learn More
              </a>
            </div>
          </div>
          <div className="w-full flex border border-yellow-500 bg-yellow-50 rounded-lg gap-3 p-4 mt-5">
            <div>
              <CheckCircle2 size={21} className="text-yellow-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Warning Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* - Warning Alerts */}
      {/* + Error Alerts */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Error Alert</h1>
        <div className="p-6">
          <div className="w-full flex border border-red-500 bg-red-50 rounded-lg gap-3 p-4">
            <div>
              <Info size={21} className="text-red-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Error Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
              <a className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400 cursor-pointer">
                Learn More
              </a>
            </div>
          </div>
          <div className="w-full flex border border-red-500 bg-red-50 rounded-lg gap-3 p-4 mt-5">
            <div>
              <CheckCircle2 size={21} className="text-red-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Warning Message
              </div>
              <p className="text-sm text-gray-500">
                You can insert a description for the message here.The text
                relates to the action that has been performed.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* - Error Alerts */}
    </React.Fragment>
  );
};

export default Alerts;
