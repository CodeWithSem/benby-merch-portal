import { BoxIcon, ChevronRight } from "lucide-react";
import React from "react";
import Button from "../../../../elements/Button";

const Buttons = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Buttons</h1>
      </div>
      {/* + Default Buttons */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Default Buttons</h1>
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-5">
            <Button
              //   on_click={() => set_loading(!loading)}
              //   width="w-[120px]"
              variant="primary"
              //   loading={loading}
            >
              Primary
            </Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="white">Light</Button>
          </div>
        </div>
      </div>
      {/* - Default Buttons */}
      {/* + Buttons with Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Buttons with Icon</h1>
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-5">
            <Button variant="primary" icon={BoxIcon} icon_position="left">
              Primary
            </Button>
            <Button variant="success" icon={BoxIcon} icon_position="left">
              Success
            </Button>
            <Button variant="warning" icon={BoxIcon} icon_position="left">
              Warning
            </Button>
            <Button variant="danger" icon={BoxIcon} icon_position="right">
              Danger
            </Button>
            <Button variant="white" icon={BoxIcon} icon_position="right">
              Light
            </Button>
          </div>
        </div>
      </div>
      {/* - Buttons with Icon */}
      {/* + Loading Buttons */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Loading Buttons</h1>
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-5">
            <Button width="w-[100px]" variant="primary" loading={true}>
              Primary
            </Button>
            <Button width="w-[100px]" variant="success" loading={true}>
              Success
            </Button>
            <Button width="w-[100px]" variant="warning" loading={true}>
              Warning
            </Button>
            <Button width="w-[100px]" variant="danger" loading={true}>
              Danger
            </Button>
            <Button width="w-[100px]" variant="white" loading={true}>
              Light
            </Button>
          </div>
        </div>
      </div>
      {/* - Loading Buttons */}
    </React.Fragment>
  );
};

export default Buttons;
