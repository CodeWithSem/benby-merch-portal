import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import React from "react";
import { useToast } from "../../../layout/Toast_Provider";
import Button from "../../../../elements/Button";

const Alerts = () => {
  const { show_toast } = useToast();

  const handle_show = (type, title, message) => {
    const icon =
      type === "success" ? (
        <CheckCircle2 size={21} className="text-green-500" />
      ) : type === "warning" ? (
        <AlertTriangle size={21} className="text-yellow-500" />
      ) : (
        <XCircle size={21} className="text-red-500" />
      );

    show_toast({
      type,
      title,
      message,
      icon,
      width: "300px",
      position: "top-right",
    });
  };
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Alerts</h1>
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
                <span className="text-gray-800">Alerts</span>
              </li>
            </ol>
          </nav>
        </div>
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
          <div className="mt-5">
            <Button
              on_click={() =>
                handle_show(
                  "success",
                  "Park In",
                  "The customer has successfully parked in."
                )
              }
              size="lg"
              variant="success"
            >
              Show Toast
            </Button>
          </div>
        </div>
      </div>
      {/* - Success Alerts */}
      {/* + Warning Alerts */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Warning Alert</h1>
        <div className="p-6">
          <div
            className="w-full flex border border-yellow-500 bg-yellow-50 rounded-lg gap-3 p-4"
            onClick={() =>
              handle_show(
                "warning",
                "Park In",
                "The customer has successfully parked in."
              )
            }
          >
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
            </div>
          </div>
          <div className="mt-5">
            <Button
              on_click={() =>
                handle_show(
                  "warning",
                  "Warning",
                  "This toast will be use if there is a warning."
                )
              }
              size="lg"
              variant="warning"
            >
              Show Toast
            </Button>
          </div>
        </div>
      </div>
      {/* - Warning Alerts */}
      {/* + Danger Alerts */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Danger Alert</h1>
        <div className="p-6">
          <div
            className="w-full flex border border-red-500 bg-red-50 rounded-lg gap-3 p-4"
            onClick={() =>
              handle_show(
                "danger",
                "Invalid",
                "There has been an error in your transaction."
              )
            }
          >
            <div>
              <Info size={21} className="text-red-500" />
            </div>
            <div>
              <div className="flex-1 font-semibold text-sm text-gray-800 mb-1">
                Danger Message
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
              <Info size={21} className="text-red-500" />
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
          <div className="mt-5">
            <Button
              on_click={() =>
                handle_show(
                  "danger",
                  "Invalid",
                  "There has been an error in your transaction."
                )
              }
              size="lg"
              variant="danger"
            >
              Show Toast
            </Button>
          </div>
        </div>
      </div>
      {/* - Danger Alerts */}
    </React.Fragment>
  );
};

export default Alerts;
