import React from "react";
import Button from "../../../elements/Button";

const Modals = () => {
  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Modals</h1>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5">
        {/* + Defualt Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">Default Modal</h1>
          <div className="p-6">
            <Button width="w-[150px]" variant="primary" size="lg">
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Defualt Modal */}
        {/* + Vertically Centered Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">
            Vertically Centered Modal
          </h1>
          <div className="p-6">
            <Button width="w-[150px]" variant="primary" size="lg">
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Vertically Centered Modal */}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 mt-5">
        {/* + Form in Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">Form in Modal</h1>
          <div className="p-6">
            <Button width="w-[150px]" variant="primary" size="lg">
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Form in Modal */}
        {/* + Full Screen Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">Full Screen Modal</h1>
          <div className="p-6">
            <Button width="w-[150px]" variant="primary" size="lg">
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Full Screen Modal */}
      </div>
      {/* + Modal Based Alerts */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-md border-b p-5">Modal Based Alerts</h1>
        <div className="p-6 flex gap-4">
          <Button variant="success" size="md">
            Success Modal
          </Button>
          <Button variant="warning" size="md">
            Warning Modal
          </Button>
          <Button variant="danger" size="md">
            Error Modal
          </Button>
        </div>
      </div>
      {/* - Modal Based Alerts */}
    </React.Fragment>
  );
};

export default Modals;
