import React from "react";
import Button from "assets/elements/Button";
import Spinner from "assets/elements/Spinner";

const Load_Screen = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[102]`}
        >
          <div className="w-full flex flex-col justify-center items-center gap-5 mb-5">
            <Spinner size={8} />
            <div className="w-full text-center text-lg md:text-sm">
              Loading all the data. Please wait.
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Load_Screen;
