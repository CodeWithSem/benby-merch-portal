import React, { useEffect, useState } from "react";
import Prod_Report_Input from "./modals/Prod_Report_Input";
import Button from "assets/elements/Button";
import { api_save_prod_report_rtdb } from "api/real_time_db/production/production_plan/tbl_production_plan_api";

const Prod_Report = ({
  is_open,
  on_close,
  show_toast,
  prod_report,
  active_user,
  prod_plan_id,
  prod_index,
}) => {
  if (!is_open) return null;

  const [open_input, set_open_input] = useState(false);
  const [active_field, set_active_field] = useState(null);
  const [active_label, set_active_label] = useState("");
  const [save_loading, set_save_loading] = useState(false);

  const [values, set_values] = useState({
    std_ppm: 0,
    actual_ppm: 0,
    prod_hours: 0,
    down_time: 0,
    target_output: 0,
    actual_output: 0,
    efficiency: 0,

    rm_wasted: 0,
    optr_splice: 0,
    waste_percent: 0,

    reprocess_good: 0,
    reprocess_gen: 0,
    reprocess_waste: 0,

    balance: 0,
    reprocess_percent: 0,
    prod_rate: 0,
    quantity_complete: 0,
  });

  useEffect(() => {
    if (prod_report) {
      set_values((prev) => ({
        ...prev,
        ...prod_report,
      }));
    }
  }, [prod_report]);

  const open_input_for = (field, label) => {
    set_active_field(field);
    set_active_label(label);
    set_open_input(true);
  };

  const handle_enter_value = (value) => {
    set_values((prev) => ({
      ...prev,
      [active_field]: value,
    }));
  };

  const close_input = () => {
    set_open_input(false);
    set_active_field(null);
    set_active_label("");
  };

  const handle_save = async () => {
    try {
      set_save_loading(true);
      const result = await api_save_prod_report_rtdb(
        prod_plan_id,
        prod_index,
        values,
        active_user,
        show_toast
      );

      if (!result?.success) return;
    } catch (error) {
      console.log(error);
    } finally {
      set_save_loading(false);
    }
  };

  const Item = ({ label, field }) => (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
      <div className="text-sm sm:text-base sm:text-right sm:w-[220px] w-full text-gray-600 font-medium">
        {label}
      </div>
      <div
        className="h-[56px] w-full max-w-[480px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-lg sm:text-xl tracking-wide font-semibold cursor-pointer hover:bg-gray-50"
        onClick={() => open_input_for(field, label)}
      >
        {values[field]}
      </div>
    </div>
  );

  const Group = ({ title, children }) => (
    <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-4">
      <div className="text-sm uppercase tracking-wide text-gray-500 font-semibold border-b pb-2">
        {title}
      </div>
      {children}
    </div>
  );

  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[97] bg-gray-100 flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-8 lg:px-10 py-8 w-full h-full overflow-y-auto">
          <div className="flex-1 flex flex-col gap-6">
            <Group title="Production Performance">
              <Item label="STD PPM" field="std_ppm" />
              <Item label="Actual PPM" field="actual_ppm" />
              <Item label="Production Hour/s" field="prod_hours" />
              <Item label="Down Time" field="down_time" />
              <Item label="Target Output" field="target_output" />
              <Item label="Actual Output" field="actual_output" />
              <Item label="Efficiency (%)" field="efficiency" />
            </Group>

            <Group title="Machine (Optr.) in kg">
              <Item label="RM Wasted" field="rm_wasted" />
              <Item label="Optr. Splice" field="optr_splice" />
              <Item label="Waste (%)" field="waste_percent" />
            </Group>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <Group title="Reprocess (Q.C.) in kg">
              <Item label="GOOD" field="reprocess_good" />
              <Item label="GEN" field="reprocess_gen" />
              <Item label="WASTE" field="reprocess_waste" />
            </Group>

            <Group title="Production Summary">
              <Item label="Balance" field="balance" />
              <Item label="Reprocess (%)" field="reprocess_percent" />
              <Item label="Prod Rate (Pcs / Min)" field="prod_rate" />
            </Group>
            <Group title="Output">
              <Item label="Total Quantity (Case)" field="quantity_complete" />
            </Group>

            <div className="flex gap-4 mt-[5px]">
              <Button
                variant="primary"
                size="lg"
                width="w-full"
                class_name="h-[90px] text-xl"
                on_click={handle_save}
                loading={save_loading}
              >
                Save
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-full"
                class_name="h-[90px] text-xl"
                on_click={on_close}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Prod_Report_Input
        is_open={open_input}
        label={active_label}
        initial_value={active_field ? values[active_field] : 0}
        on_close={close_input}
        on_enter={handle_enter_value}
      />
    </React.Fragment>
  );
};

export default Prod_Report;
