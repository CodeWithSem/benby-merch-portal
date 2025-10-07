import React, { useState } from "react";
import Button from "../../../../elements/Button";
import Default_Modal from "../../../../elements/modals/Default_Modal";
import Vertical_Modal from "../../../../elements/modals/Vertical_Modal";
import Form_Modal from "../../../../elements/modals/Form_Modal";
import Full_Screen_Modal from "../../../../elements/modals/Full_Screen_Modal";
import Alert_Modal from "../../../../elements/modals/Alert_Modal";

const Modals = () => {
  const [open_default_modal, set_open_default_modal] = useState(false);
  const [open_vertical_modal, set_open_vertical_modal] = useState(false);
  const [open_form_modal, set_open_form_modal] = useState(false);
  const [open_full_screen_modal, set_open_full_screen_modal] = useState(false);
  const [open_alert_success_modal, set_open_alert_success_modal] =
    useState(false);
  const [open_alert_warning_modal, set_open_alert_warning_modal] =
    useState(false);
  const [open_alert_error_modal, set_open_alert_error_modal] = useState(false);
  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Modals</h1>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5">
        {/* + Default Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">Default Modal</h1>
          <div className="p-6">
            <Button
              width="w-[150px]"
              variant="primary"
              size="lg"
              on_click={() => set_open_default_modal(true)}
            >
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Default Modal */}
        {/* + Vertically Centered Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">
            Vertically Centered Modal
          </h1>
          <div className="p-6">
            <Button
              width="w-[150px]"
              variant="primary"
              size="lg"
              on_click={() => set_open_vertical_modal(true)}
            >
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
            <Button
              width="w-[150px]"
              variant="primary"
              size="lg"
              on_click={() => set_open_form_modal(true)}
            >
              Open Modal
            </Button>
          </div>
        </div>
        {/* - Form in Modal */}
        {/* + Full Screen Modal */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-md border-b p-5">Full Screen Modal</h1>
          <div className="p-6">
            <Button
              width="w-[150px]"
              variant="primary"
              size="lg"
              on_click={() => set_open_full_screen_modal(true)}
            >
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
          <Button
            variant="success"
            size="md"
            on_click={() => set_open_alert_success_modal(true)}
          >
            Success Modal
          </Button>
          <Button
            variant="warning"
            size="md"
            on_click={() => set_open_alert_warning_modal(true)}
          >
            Warning Modal
          </Button>
          <Button
            variant="danger"
            size="md"
            on_click={() => set_open_alert_error_modal(true)}
          >
            Error Modal
          </Button>
        </div>
      </div>
      {/* - Modal Based Alerts */}
      <Default_Modal
        is_open={open_default_modal}
        on_close={() => set_open_default_modal(false)}
        width="max-w-[820px]"
      />
      <Vertical_Modal
        is_open={open_vertical_modal}
        on_close={() => set_open_vertical_modal(false)}
        width="max-w-[820px]"
      />
      <Form_Modal
        is_open={open_form_modal}
        on_close={() => set_open_form_modal(false)}
        width="max-w-[820px]"
      />
      <Full_Screen_Modal
        is_open={open_full_screen_modal}
        on_close={() => set_open_full_screen_modal(false)}
      />
      <Alert_Modal
        is_open={open_alert_success_modal}
        on_close={() => set_open_alert_success_modal(false)}
        width="max-w-[620px]"
        variant="success" // success | warning | error
        title="Park In Success"
        message="The customer has successfully parked in. Please remind them that parking fees need to be collected at the lobby, and ensure the payment is processed before they leave."
      />
      <Alert_Modal
        is_open={open_alert_warning_modal}
        on_close={() => set_open_alert_warning_modal(false)}
        width="max-w-[620px]"
        variant="warning" // success | warning | error
        title="Invalid Card"
        message="The RFID card that you have tapped is invalid. Please try another card."
      />
      <Alert_Modal
        is_open={open_alert_error_modal}
        on_close={() => set_open_alert_error_modal(false)}
        width="max-w-[620px]"
        variant="error" // success | warning | error
        title="Invalid Card"
        message="The RFID card that you have tapped is invalid. Please try another card."
      />
    </React.Fragment>
  );
};

export default Modals;
